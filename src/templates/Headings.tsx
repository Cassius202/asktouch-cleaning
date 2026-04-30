import { MotionH1, MotionP } from "@/motion/MotionDiv";

export function Title({ text, mode = 'light' }: { text: string; mode?: 'light' | 'dark' }) {
  const textColor = mode === 'light' ? 'text-gray-900' : 'text-white';
  
  return (
    <MotionH1 
      className={`
        text-4xl lg:text-5xl 
        font-bold max-sm:mx-auto
        text-center 
        ${textColor}
        tracking-tight
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </MotionH1>
  );
}

export function SubTitle({ text, mode = 'light' }: { text: string; mode?: 'light' | 'dark' }) {
  const textColor = mode === 'light' ? 'text-gray-600' : 'text-gray-300';
  
  return (
    <MotionP 
      className={`
        text-lg md:text-xl 
        text-center 
        max-w-2xl 
        mx-auto 
        ${textColor}
        leading-relaxed
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {text}
    </MotionP>
  );
}