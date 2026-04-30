// components/CalendlyButton.tsx
'use client';

import { PopupModal } from 'react-calendly';
import { useState } from 'react';
import { Video } from 'lucide-react';

interface CalendlyButtonProps {
  url: string;
}

const CalendlyButton = ({ url }: CalendlyButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className='group block cursor-pointer sm:col-span-2 lg:col-span-3'
        onClick={() => setIsOpen(true)}
      >
        <span className="whitespace-nowrap text-sm text-rose-600 dark:text-rose-400 mb-1.5 px-2">
          Video Call
        </span>
        <div className="flex items-center justify-center h-12 px-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg group-hover:border-rose-500 dark:group-hover:border-rose-400 transition-colors">
          <div className="size-5 mr-3 flex items-center justify-center">
            <Video size={18} className="text-rose-600 dark:text-rose-400" />
          </div>
          <span className="text-sm font-medium">Book a Free Video Consultation</span>
        </div>
      </div>

      <PopupModal
        url={url}
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        rootElement={document.getElementById('root') as HTMLElement}
      />
    </>
  );
};

export default CalendlyButton;