import Image from "next/image";
import ShareSheet from "./ShareSheet";
import config from '@/data/config.json';

type Author = {
  name: string;
  avatar_url: string;
};

type Frontmatter = {
  category?: string;
  date: string;
  headline?: string;
  title: string;
  subhead: string;
};

interface ArticleHeaderProps {
  frontmatter: Frontmatter;
  author?: Author | null;
}

function formatDate(fullDate: string): string {
  const date = new Date(fullDate);
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const ArticleHeader = ({ frontmatter, author }: ArticleHeaderProps) => {
  return (
    <div className="article-header max-w-4xl mx-auto py-12">
      {/* Category Section */}
      <div className="category mb-5">
        <div className="flex flex-col">
          <div className="category-eyebrow text-sm font-bold uppercase leading-5 tracking-tight">
            <span className="category-eyebrow__category">
              {config.categories[frontmatter.category as keyof typeof config.categories ?? "updates"]?.title ?? config.categories.updates.title}
            </span>
            <span className="category-eyebrow__date mt-1 text-base font-semibold opacity-75">
              {formatDate(frontmatter.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Article Title */}
      <div className="pagetitle mb-0">
        <h1 className="hero-headline text-4xl font-extrabold leading-tight tracking-tight md:text-3xl sm:text-2xl">
          {frontmatter.headline ?? frontmatter.title}
        </h1>
      </div>

      {/* Article Subhead */}
      <div className="article-subhead mt-5 mb-0 text-xl font-medium leading-tight md:text-lg">
        {frontmatter.subhead}
      </div>

      {/* Author Section */}
      {author && (
        <div className="author mt-5">
          <div className="flex items-center gap-2">
            <Image
              width="24"
              height="24"
              className="rounded-full"
              src={author.avatar_url}
              alt={`${author.name} user image`}
            />
            <span className="text-sm font-semibold">{author.name}</span>
          </div>
        </div>
      )}

      {/* ShareSheet Component */}
      <ShareSheet />
    </div>
  );
};

export default ArticleHeader;