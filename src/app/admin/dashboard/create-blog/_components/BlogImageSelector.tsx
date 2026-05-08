import Image from "next/image";
import { blogimages } from "@/constants/assets";

interface ImageSelectorProps {
  onSelect: (image: string, index: number) => void;
  selectedIndex: number;
  key: string;
}

export default function BlogImageSelector({ onSelect, selectedIndex }: ImageSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Featured Image</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {blogimages.map((image, index) => (
          <div
            key={index}
            onClick={() => onSelect(image, index)}
            className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedIndex === index ? 'ring-4 ring-emerald-500 shadow-lg' : 'ring-2 ring-gray-200 hover:ring-emerald-400'
            }`}
          >
            <Image unoptimized src={image} alt={`Blog selection ${index + 1}`} fill className="object-cover" />
            {selectedIndex === index && (
              <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500">Click on an image to select as featured image</p>
    </div>
  );
}