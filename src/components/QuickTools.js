'use client';

export default function QuickTools({ tools, inputText, setInputText, setCurrentTool }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {tools.map(tool => (
        <button
          key={tool.id}
          onClick={() => setCurrentTool(tool)}
          className="bg-gray-800 p-3 rounded-lg hover:bg-indigo-600 transition text-white text-sm text-center"
        >
          {tool.name}
        </button>
      ))}
    </div>
  );
}
