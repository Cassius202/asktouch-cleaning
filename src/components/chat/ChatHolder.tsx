'use client'

import { useState, useRef, useEffect, SetStateAction, Dispatch } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Phone, Trash2, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6"; // FontAwesome WhatsApp Icon
import useSessionStorage from "@/hooks/useSessionStorage";
import MarkdownText from "./MarkDown";
import { assets } from "@/constants/assets";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { updateBookingData } from "./updateBookingData";
import {usePathname} from 'next/navigation'

const botImage = assets.chatbotImage;
const whatsappBg = assets.whatsappBg; // Background pattern image

type Message = { role: 'user' | 'ai'; content: string; isError?: boolean };

// ── TextArea ───────────────────────────────────────────
export const TextArea = ({ messages, loading, setIsOpen }: { messages: Message[]; loading: boolean; setIsOpen: Dispatch<SetStateAction<boolean>>; }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          alt='whatsapp-bg' 
          src={whatsappBg} 
          fill 
          className="object-cover"
          style={{ objectPosition: 'top' }}
        />
        <div className="absolute inset-0 bg-emerald-50/10" />
      </div>

      {/* Chat Content */}
      <div 
        ref={scrollRef} 
        className="relative z-10 h-full overflow-y-auto p-4 space-y-4 scrollbar-hide"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3 py-8">
            <div className="w-12 h-12 rounded-full border border-emerald-200 flex items-center justify-center bg-white shadow-sm">
              <User className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-zinc-900 font-semibold text-lg">I&apos;m Portia.</p>
              <p className="text-emerald-700 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
                Ask Touch Concierge
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-2.5", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            {msg.role === 'ai' && (
              <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-1 border border-white shadow-sm">
                <Image src={botImage} alt="Portia" fill className="object-cover" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] px-4 py-2 text-[13.5px] leading-relaxed shadow-sm",
                msg.role === 'user'
                  ? 'bg-[#dcf8c6] text-zinc-800 rounded-lg rounded-tr-none'
                  : msg.isError
                    ? 'bg-red-50 text-red-600 border border-red-100 rounded-lg'
                    : 'bg-white text-zinc-800 rounded-lg rounded-tl-none'
              )}
            >
              <MarkdownText text={msg.content} setIsOpen={setIsOpen} />
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start gap-2.5">
            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-1 border border-white">
              <Image src={botImage} alt="Portia" fill className="object-cover" />
            </div>
            <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none flex gap-1 items-center shadow-sm">
              <div className="size-1 bg-emerald-400 rounded-full animate-bounce" />
              <div className="size-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]" />
              <div className="size-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── ChatHolder ─────────────────────────────────────────
const ChatHolder = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useSessionStorage<Message[]>("chats", []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const handleReset = () => { if(confirm("Clear chat history?")) setMessages([]); }


const handleSend = async () => {
  // 1. Validation: Don't send if empty, loading, or offline
  if (!input.trim() || loading || !isOnline) return;

  // 2. Add the User's message to the UI immediately
  const userMsg: Message = { role: 'user', content: input };
  const newMessages = [...messages, userMsg];
  setMessages(newMessages);
  setInput("");
  setLoading(true);

  try {
    const cleanedHistory = messages
      .filter((m) => m.content && !m.isError)
      .slice(-10) // Only last 10 messages
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ 
          text: m.content.replace(/```json[\s\S]*?```/g, "").trim() 
        }],
      }));

    // 4. Call the API
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: input,
        history: cleanedHistory,
        metadata: leadData, // We send the current name/gender facts back to the AI
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.text) throw new Error(data.error || "AI_DOWN");

    // 5. PARSE THE RESPONSE
    
    const fullAIContent = data.text;
    
    // Regex to find the ```json { ... } ``` block
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = fullAIContent.match(jsonRegex);
    
    let cleanText = fullAIContent;
    let extractedJson = null;

    if (data.jsonData) {
      updateBookingData(data.jsonData);
    }

    if (match) {
      try {
        // Extract and Parse the JSON part
        extractedJson = JSON.parse(match[1]);
        
        // Remove the JSON block from the text so the user never sees it
        cleanText = fullAIContent.replace(jsonRegex, "").trim();
      } catch (parseError) {
        console.error("Could not parse AI JSON:", parseError);
      }
    }

    // 6. UPDATE STATES
    if (extractedJson) {
      // This is how the AI "remembers" the name for the next message
      setLeadData(extractedJson);
      
      // OPTIONAL: If the AI says the lead is ready, you could trigger a popup here
      if (extractedJson.is_lead_ready) {
        console.log("User is ready to book!");
      }
    }

    // Add the clean, friendly text to the chat UI
    setMessages([...newMessages, { role: 'ai', content: cleanText }]);

  } catch (err: any) {
    console.error("Chat Error:", err);
    setMessages([
      ...newMessages,
      { 
        role: 'ai', 
        content: "**I am busy now at the station, I'll have someone call you now. What is your number?**", 
        isError: true 
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  const isBookingPage = pathname === '/book-now' || pathname === '/book'

  if (isBookingPage) return null

  return (
    <div className="fixed bottom-6 right-6 max-sm:right-4 z-[200] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="mb-4 w-[calc(100vw-32px)] sm:w-[380px] h-[580px] bg-white border border-zinc-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header - Emerald Green */}
            <div className="bg-emerald-600 px-4 py-3 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
                  <Image src={botImage} alt="Portia" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-snug">Portia</p>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 font-medium">
                    <span className={cn("w-2 h-2 rounded-full", isOnline ? "bg-emerald-300 animate-pulse" : "bg-red-400")} />
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={handleReset} className="text-white/70 hover:text-white transition-colors p-2">
                  <Trash2 size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-2">
                  <X size={20} />
                </button>
              </div>
            </div>

            <TextArea messages={messages} loading={loading} setIsOpen={setIsOpen} />

            {/* Input Bar */}
            <div className="px-3 py-3 border-t border-zinc-200 bg-[#f0f0f0]">
              <div className="flex gap-2 items-center">
                <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center shadow-sm border border-zinc-200">
                    <input
                    type="text"
                    value={input}
                    disabled={!isOnline || loading}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message"
                    className="w-full bg-transparent text-sm outline-none text-zinc-900 placeholder:text-zinc-500"
                    />
                </div>
                <button
                  onClick={handleSend}
                  disabled={loading || !isOnline || !input.trim()}
                  className="bg-emerald-600 text-white p-3 rounded-full transition-all active:scale-90 shadow-md disabled:bg-zinc-400"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} className="translate-x-0.5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        {/* Call Button - Emerald for brand consistency */}
        <AnimatePresence>
          {isOpen && (
            <motion.a
              href="tel:09034027582"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition-colors"
            >
              <Phone size={22} />
            </motion.a>
          )}
        </AnimatePresence>

        {/* Trigger Button - WhatsApp Green (#25D366) */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.92 }}
          className={cn(
            "relative p-4 rounded-full shadow-lg transition-colors",
            isOpen ? "bg-zinc-800 text-white" : "bg-[#25D366] text-white"
          )}
        >
          <AnimatePresence mode="wait">
            {isOpen ? <X key="x" size={24} /> : <FaWhatsapp key="whatsapp" size={28} className="hue-rotate-50" />}
          </AnimatePresence>
          
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isOpen ? "Close" : "Chat with Portia"}
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default ChatHolder;