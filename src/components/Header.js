'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiType } from 'react-icons/fi';
import { FaFlask } from "react-icons/fa";


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-white hover:text-blue-400 transition-colors">
            <FaFlask className="text-xl text-blue-500" />
            <span className="text-2xl font-bold">TextoLab</span>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Início
            </Link>
            <Link href="/sobre" className="text-gray-300 hover:text-white transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-300 hover:text-white transition-colors">
              Contato
            </Link>
          </nav>

          {/* Botão Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Início
          </Link>
          <Link
            href="/sobre"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Contato
          </Link>
        </div>
      )}
    </header>
  );
}
