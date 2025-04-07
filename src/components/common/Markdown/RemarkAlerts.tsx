import React from 'react';
import { visit } from 'unist-util-visit';

interface Alert {
  id: string;
  label: string;
  code: string;
}

const alertTypes: Alert[] = [
  { id: 'note', label: 'Note', code: '[!NOTE]' },
  { id: 'tip', label: 'Tip', code: '[!TIP]' },
  { id: 'important', label: 'Important', code: '[!IMPORTANT]' },
  { id: 'warning', label: 'Warning', code: '[!WARNING]' },
  { id: 'caution', label: 'Caution', code: '[!CAUTION]' },
];

interface MarkdownWrapProps {
  content: string;
}

const MarkdownWrap: React.FC<MarkdownWrapProps> = ({ content }) => {
  const processContent = (content: string) => {
    let processedContent = content;

    alertTypes.forEach((alertType) => {
      const regex = new RegExp(`^${alertType.code}(.+)`, 'gm');
      processedContent = processedContent.replace(regex, (match, p1) => {
        return `
          <div class="alert ${alertType.id} border-2 border-gray-300 rounded p-4 my-4">
            <div class="alert-label text-lg font-semibold mb-2">${alertType.label}</div>
            <p>${p1.trim()}</p>
          </div>
        `;
      });
    });

    return processedContent;
  };

  return (
    <div className="markdown-wrap mx-auto max-w-screen-xl px-4">
      <div className="prose max-w-screen-sm mx-auto">
        {/* Render the processed content */}
        <div dangerouslySetInnerHTML={{ __html: processContent(content) }} />
      </div>
    </div>
  );
};

export default MarkdownWrap;