'use client';

import { useEffect, useMemo, useState } from 'react';
import { FiCopy, FiDownload, FiShare2 } from 'react-icons/fi';
import { textUtils } from '../utils/textUtils';

export default function ToolInterface({ tool, inputText, setInputText }) {
  const [outputText, setOutputText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (tool?.transform) {
      setOutputText(inputText ? tool.transform(inputText) : '');
    } else {
      setOutputText('');
    }
  }, [inputText, tool]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const downloadText = (text, filename = 'texto') => {
    const a = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    a.href = URL.createObjectURL(file);
    a.download = `${filename}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const stats = useMemo(() => (tool?.isCounter ? textUtils.countStats(inputText) : null), [tool, inputText]);

  const multiCase = useMemo(() => {
    if (!tool?.isMultiCase || !inputText) return null;
    return {
      camel: textUtils.toCamelCase(inputText),
      snake: textUtils.toSnakeCase(inputText),
      kebab: textUtils.toKebabCase(inputText),
    };
  }, [tool, inputText]);

  const hasActionsBar = Boolean(tool?.transform || stats || multiCase);

  const getPayload = () => {
    if (stats) return JSON.stringify(stats, null, 2);
    if (multiCase)
      return [
        `camelCase: ${multiCase.camel}`,
        `snake_case: ${multiCase.snake}`,
        `kebab-case: ${multiCase.kebab}`,
      ].join('\n');
    return outputText;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Entrada */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Cole seu texto aqui:</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite ou cole seu texto aqui..."
              className="w-full h-48 md:h-64 p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            {inputText && <p className="text-sm text-gray-400 mt-2">{inputText.length} caracteres</p>}
          </div>

          {/* Saída */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Resultado:</label>

            {tool?.isCounter && stats ? (
              <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 h-48 md:h-64 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <StatBox label="Caracteres" value={stats.characters} accent="text-blue-400" />
                  <StatBox label="Sem espaços" value={stats.charactersNoSpaces} accent="text-green-400" />
                  <StatBox label="Palavras" value={stats.words} accent="text-purple-400" />
                  <StatBox label="Parágrafos" value={stats.paragraphs} accent="text-yellow-400" />
                </div>
              </div>
            ) : tool?.isMultiCase && multiCase ? (
              <div className="space-y-3">
                <CaseBlock title="camelCase" value={multiCase.camel} />
                <CaseBlock title="snake_case" value={multiCase.snake} />
                <CaseBlock title="kebab-case" value={multiCase.kebab} />
              </div>
            ) : (
              <textarea
                value={outputText}
                readOnly
                className="w-full h-48 md:h-64 p-4 bg-gray-700 border border-gray-600 rounded-xl text-white resize-none"
                placeholder="Resultado aparecerá aqui..."
              />
            )}

            {/* Botões de ação embaixo */}
            {hasActionsBar && (
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => copyToClipboard(getPayload())}
                  className={`p-2 rounded-lg transition-all ${
                    copySuccess ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  title="Copiar"
                >
                  <FiCopy size={16} />
                </button>
                <button
                  onClick={() => downloadText(getPayload(), tool?.id || 'texto')}
                  className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
                  title="Baixar"
                >
                  <FiDownload size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------- Subcomponentes ------- */

function StatBox({ label, value, accent = 'text-blue-400' }) {
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className={`text-2xl font-bold ${accent}`}>{value}</div>
      <div className="text-sm text-gray-300">{label}</div>
    </div>
  );
}

function CaseBlock({ title, value }) {
  return (
    <div className="bg-gray-700 border border-gray-600 rounded-xl p-4">
      <div className="text-sm text-gray-300 mb-2">{title}:</div>
      <div className="bg-gray-800 rounded p-2 font-mono text-sm break-all">{value}</div>
    </div>
  );
}
