import * as React from "react";
import { SCThemeProvider } from '@/components/theme-provider';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import swift from 'react-syntax-highlighter/dist/cjs/languages/prism/swift';

import darkSyntaxTheme from '@/data/syntax-dark';
import lightSyntaxTheme from '@/data/syntax-light';

import remarkAlerts from './RemarkAlerts'; // Ensure this is a valid remark plugin

import MarkdownWrap from './Markdown.Styles';
//import remarkGithub from './RemarkGitHub';
import remarkGithub from 'remark-github';

import { Pluggable, Processor } from 'unified';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('swift', swift);


import { ReactNode } from 'react';

interface MarkdownProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    components?: Record<string, unknown>;
    remarkPlugins?: unknown[];
    rehypePlugins?: Pluggable[];
}

const Markdown = ({
    children,
    className,
    style,
    components = {},
    remarkPlugins = [],
    rehypePlugins = [],
  }: MarkdownProps) => {
    const { theme } = useTheme();
    const syntaxTheme = React.useMemo(
      () => (theme === 'dark' ? darkSyntaxTheme : lightSyntaxTheme),
      [theme]
    );
  
    const CodeSandboxTransformer = {
      name: 'CodeSandbox',
    shouldTransform(url: string): boolean {
      const { host, pathname } = new URL(url);
  
      return (
        ['codesandbox.io', 'www.codesandbox.io'].includes(host) &&
        pathname.includes('/s/')
      );
    },

    getHTML(url: string): string {
      const iframeUrl: string = url.replace('/s/', '/embed/');
  
        return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`;
      },
    };
  
    const MarkdownComponents = {
      code({ node, inline, className, children, ...props }: { node?: any; inline?: boolean; className?: string; children?: React.ReactNode; [key: string]: any }) {
        const hasLang = /language-(\w+)/.exec(className || '');
        const hasMeta = node?.data?.meta;
  
        interface NodeData {
          meta?: string;
        }

        interface Node {
          data?: NodeData;
        }

        const applyHighlights = (lineNumber: number): { data?: string } => {
          if (hasMeta) {
            const RE = /{([\d,-]+)}/;
            const metadata = (node as Node).data?.meta?.replace(/\s/g, '');
            const strlineNumbers = metadata && RE.test(metadata) ? RE.exec(metadata)?.[1] : '0';
            const highlightLines = rangeParser(strlineNumbers || '');
            const highlight = highlightLines;
            const data = highlight.includes(lineNumber) ? 'highlight' : undefined;
            return { data };
          } else {
            return {};
          }
        };
  
        return hasLang ? (
          <SyntaxHighlighter
            style={syntaxTheme as any}
            language={hasLang[1]}
            PreTag="div"
            className="codeblock"
            wrapLines={hasMeta}
            useInlineStyles
            lineProps={applyHighlights}
          >
            {props.children}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props} />
        );
      },
    };
  
    function remarkEmbedder(this: Processor<undefined, undefined, undefined, undefined, undefined>, ...parameters: any[]): void | Transformer<any, any> | undefined {
        throw new Error("Function not implemented.");
    }

    //return (
    //  <div>
    //  <MarkdownWrap className={className} style={style}>
    //    <ReactMarkdown
    //      components={{ ...MarkdownComponents, ...components }}
    //      remarkPlugins={[
    //        remarkGfm,
    //        remarkAlerts as Pluggable,
    //        [
    //          remarkGithub,
    //          { defaultOrg: 'ScribbleLabApp', defaultRepo: 'ScribbleLab' },
    //        ],
    //        [remarkEmbedder, { transformers: [CodeSandboxTransformer] }],
    //        ...(remarkPlugins as Pluggable[]),
    //      ]}
    //      rehypePlugins={[rehypeRaw, ...rehypePlugins]}
    //    >
    //      {typeof children === 'string' ? children : ''}
    //    </ReactMarkdown>
    //  </MarkdownWrap>
    //  </div>
    //);
    return (
        <div>
          <MarkdownWrap className={className} style={style}>
            <ReactMarkdown
              components={{ ...MarkdownComponents, ...components }}
              remarkPlugins={[
                remarkGfm,
                remarkAlerts as Pluggable,
                [
                  remarkGithub,
                  { defaultOrg: 'ScribbleLabApp', defaultRepo: 'ScribbleLab' },
                ],
                ...(remarkPlugins as Pluggable[]),
              ]}
              rehypePlugins={[rehypeRaw, ...rehypePlugins]}
            >
              {typeof children === 'string' ? children : ''}
            </ReactMarkdown>
          </MarkdownWrap>
        </div>
      );
  };
  
  export default Markdown;

function rangeParser(rangeString: string): number[] {
    const ranges = rangeString.split(',').map(range => range.split('-').map(Number));
    const result: number[] = [];
    ranges.forEach(([start, end]) => {
        if (end === undefined) {
            result.push(start);
        } else {
            for (let i = start; i <= end; i++) {
                result.push(i);
            }
        }
    });
    return result;
}

