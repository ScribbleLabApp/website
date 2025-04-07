import { ReactNode } from 'react';

interface RemarkGithubProps {
  content: string;
  defaultOrg: string;
  defaultRepo: string;
}

const isInsideLink = (node: any, ancestors: any[]) => {
  return ancestors.some((ancestor: any) => ancestor.type === 'link');
};

const RemarkGithub: React.FC<RemarkGithubProps> = ({ content, defaultOrg, defaultRepo }) => {
  const issueRegex = /#(\d+)/g;
  const fullUrlRegex = /https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/(issues|pull)\/(\d+)/g;
  const compareUrlRegex = /https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/compare\/([\w.-]+)\.\.\.([\w.-]+)/g;
  const usernameRegex = /@([\w-]+)/g;

  const processContent = (content: string) => {
    let processedContent = content;
    let children: ReactNode[] = [];
    let lastIndex = 0;

    const addText = (text: string, start: number, end: number) => {
      if (start < end) {
        children.push(<span key={lastIndex}>{text.slice(start, end)}</span>);
        lastIndex = end;
      }
    };

    let match;
    while ((match = issueRegex.exec(processedContent)) !== null) {
      const [fullMatch, issueNumber] = match;
      addText(processedContent, lastIndex, match.index);
      children.push(
        <a
          key={lastIndex}
          href={`https://github.com/${defaultOrg}/${defaultRepo}/issues/${issueNumber}`}
          className="text-blue-500 hover:underline"
        >
          #{issueNumber}
        </a>
      );
      lastIndex = match.index + fullMatch.length;
    }

    while ((match = fullUrlRegex.exec(processedContent)) !== null) {
      const [fullMatch, org, repo, type, number] = match;
      addText(processedContent, lastIndex, match.index);
      const linkText = `${org === defaultOrg ? '' : `${org}/`}${org === defaultOrg && repo === defaultRepo ? '' : repo}#${number}`;
      children.push(
        <a
          key={lastIndex}
          href={`https://github.com/${org}/${repo}/${type}/${number}`}
          className="text-blue-500 hover:underline"
        >
          {linkText}
        </a>
      );
      lastIndex = match.index + fullMatch.length;
    }

    while ((match = compareUrlRegex.exec(processedContent)) !== null) {
      const [fullMatch, org, repo, tag1, tag2] = match;
      addText(processedContent, lastIndex, match.index);
      children.push(
        <a
          key={lastIndex}
          href={`https://github.com/${org}/${repo}/compare/${tag1}...${tag2}`}
          className="text-blue-500 hover:underline"
        >
          {tag1}...{tag2}
        </a>
      );
      lastIndex = match.index + fullMatch.length;
    }

    while ((match = usernameRegex.exec(processedContent)) !== null) {
      const [fullMatch, usernameOrOrg] = match;
      addText(processedContent, lastIndex, match.index);
      children.push(
        <a
          key={lastIndex}
          href={`https://github.com/${usernameOrOrg}`}
          className="text-blue-500 hover:underline"
        >
          {fullMatch}
        </a>
      );
      lastIndex = match.index + fullMatch.length;
    }

    addText(processedContent, lastIndex, processedContent.length);

    return children;
  };

  return (
    <div className="markdown-wrap mx-auto max-w-screen-xl px-4">
      <div className="prose max-w-screen-sm mx-auto">
        <div>{processContent(content)}</div>
      </div>
    </div>
  );
};

export default RemarkGithub;