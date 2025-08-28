'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';
import ToolInterface from '../components/ToolInterface';
import QuickTools from '../components/QuickTools';
import { textUtils } from '../utils/textUtils';

export default function HomePage() {
  const [inputText, setInputText] = useState('');
  const [currentTool, setCurrentTool] = useState(null);

  const tools = [
    { id: 'maiusculas', name: 'Converter para MAIÚSCULAS', transform: textUtils.toUpperCase, description: 'Converte todo o texto para letras maiúsculas' },
    { id: 'minusculas', name: 'Converter para minúsculas', transform: textUtils.toLowerCase, description: 'Converte todo o texto para letras minúsculas' },
    { id: 'capitalizar', name: 'Capitalizar Texto', transform: textUtils.capitalize, description: 'Capitaliza a primeira letra de cada palavra' },
    { id: 'remover-acentos', name: 'Remover Acentos', transform: textUtils.removeAccents, description: 'Remove todos os acentos e caracteres especiais' },
    { id: 'contador', name: 'Contador de Caracteres', isCounter: true, description: 'Conta caracteres, palavras, parágrafos e frases' },
    { id: 'slug', name: 'Gerador de Slug', transform: textUtils.generateSlug, description: 'Gera slugs otimizados para URLs e SEO' },
    { id: 'camel-snake', name: 'Converter Cases', isMultiCase: true, description: 'camelCase, snake_case, kebab-case' },
    { id: 'limpar', name: 'Limpar Formatação', transform: textUtils.cleanFormatting, description: 'Remove formatação desnecessária' }
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Header />
      <AdBanner position="top" />

      <main className="container mx-auto py-8 md:py-12 p-3">
        <QuickTools tools={tools} inputText={inputText} setInputText={setInputText} setCurrentTool={setCurrentTool} />

        {currentTool && <ToolInterface tool={currentTool} inputText={inputText} setInputText={setInputText} />}
      </main>

      <AdBanner position="bottom" />
      <Footer />
    </div>
  );
}
