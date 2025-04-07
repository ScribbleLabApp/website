import React from 'react';

const MarkdownWrap: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => {
  return (
    <div className={"markdown-wrap mx-auto max-w-screen-xl px-4 ${className}"} style={style}>
      <div className="prose max-w-screen-sm mx-auto">
        {/* For the first child */}
        <div className="first:mt-0">{children}</div>

        {/* Centering text */}
        <div className="text-center">{children}</div>

        {/* For images */}
        <img className="block mt-11 mb-11" />
        <img className="block mt-11 mb-11 object-cover aspect-[16/9]" />

        {/* Code and pre */}
        <pre className="mt-7 mb-7 text-sm bg-gray-100 p-4 rounded-md overflow-auto">
          <code className="font-mono">{children}</code>
        </pre>

        {/* Tables */}
        <table className="min-w-full mt-11 mb-11">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Column 1</th>
              <th className="px-4 py-2 border-b text-left">Column 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-b">Data 1</td>
              <td className="px-4 py-2 border-b">Data 2</td>
            </tr>
          </tbody>
        </table>

        {/* Blockquotes */}
        <blockquote className="border-l-4 border-gray-300 pl-4 mt-11 mb-11 text-lg italic text-gray-700">
          <p>This is a blockquote example.</p>
        </blockquote>

        {/* Images with aspect ratios */}
        <img className="object-cover aspect-[1/1]" />
        <img className="object-cover aspect-[3/2]" />
      </div>
    </div>
  );
};

export default MarkdownWrap;