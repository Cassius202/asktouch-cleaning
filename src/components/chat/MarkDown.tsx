import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react'; 

interface MarkdownTextProps {
  text: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ROUTE_CONFIG: Record<string, { label: string; className: string }> = {
  '/book': {
    label: 'Book a Service',
    className: 'inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm active:scale-95 my-1',
  },
  '/services': {
    label: 'View Services',
    className: 'inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm active:scale-95 my-1',
  },
  '/reviews': {
    label: 'Read Reviews',
    className: 'inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm active:scale-95 my-1',
  },
  '/contact': {
    label: 'Contact Us',
    className: 'inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm active:scale-95 my-1',
  },
};

const parseLine = (line: string, setIsOpen: Dispatch<SetStateAction<boolean>>): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  
  /**
   * Updated Regex:
   * 1. \*\*(.*?)\*\* -> Matches **bold**
   * 2. \[([^\]]+)\]\(([^)]+)\) -> Matches [Label](URL)
   * 3. \[(\/.*?)\] -> Matches Shorthand [/url]
   */
  const regex = /\*\*(.*?)\*\*|\[([^\]]+)\]\(([^)]+)\)|\[(\/.*?)\]/g;
  
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }

    const [fullMatch, boldContent, linkLabel, linkUrl, shorthandUrl] = match;

    // Handle Bold
    if (boldContent !== undefined) {
      parts.push(
        <strong key={`bold-${match.index}`} className="font-semibold text-zinc-900">
          {boldContent}
        </strong>
      );
    } 
    // Handle Shorthand Buttons like [/book]
    else if (shorthandUrl) {
      const config = ROUTE_CONFIG[shorthandUrl];
      if (config) {
        parts.push(
          <Link
            key={`short-${match.index}`}
            href={shorthandUrl}
            onClick={() => setIsOpen(false)}
            className={config.className}
          >
            {config.label}
            <ArrowRight className="w-3 h-3" />
          </Link>
        );
      } else {
        parts.push(fullMatch); // Fallback if route not in config
      }
    }
    // Handle Standard Markdown Links
    else if (linkLabel && linkUrl) {
      const isInternal = linkUrl.startsWith('/');
      const isWhatsApp = linkUrl.startsWith('https://wa.me/');
      const routeConfig = ROUTE_CONFIG[linkUrl];

      if (isWhatsApp) {
        parts.push(
          <a
            key={`wa-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-xl hover:bg-[#20b859] transition-all shadow-sm active:scale-95 my-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {linkLabel}
          </a>
        );
      } else if (isInternal) {
        parts.push(
          <Link
            onClick={() => setIsOpen(false)}
            key={`link-${match.index}`}
            href={linkUrl}
            className={routeConfig ? routeConfig.className : 'text-emerald-600 underline underline-offset-2 hover:opacity-70 font-medium'}
          >
            {routeConfig ? routeConfig.label : linkLabel}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={`ext-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 underline underline-offset-2 hover:opacity-70 font-medium"
          >
            {linkLabel}
          </a>
        );
      }
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts;
};

const MarkdownText = ({ text, setIsOpen }: MarkdownTextProps) => {
  if (!text) return null;

  // Clean up special characters
  const normalized = text
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u00A0/g, ' ')
    .replace(/\u2011/g, '-')
    .replace(/\u2013|\u2014/g, '-');

  const lines = normalized.split('\n');

  return (
    <div className="leading-relaxed">
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {parseLine(line, setIsOpen)}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MarkdownText;