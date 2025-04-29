'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href="#" // Será substituído pelo link configurado pelo administrador
      className="whatsapp-float"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contato via WhatsApp"
    >
      <div className="flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-7 h-7"
        >
          <path 
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" 
          />
          <path 
            d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm.029 18.88a7.947 7.947 0 0 1-3.76-.954l-4.17 1.093 1.112-4.063a7.9 7.9 0 0 1-1.039-3.936c0-4.374 3.557-7.93 7.928-7.93 4.374 0 7.93 3.557 7.93 7.93 0 4.374-3.557 7.93-7.93 7.93z" 
            fillRule="evenodd" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
      {isHovered && (
        <span className="absolute right-16 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md text-sm whitespace-nowrap">
          Fale conosco
        </span>
      )}
    </Link>
  );
}
