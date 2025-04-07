import Head from 'next/head';
import Section  from '@/components/common/layout/SCSection';
import Markdown from '@/components/common/Markdown';
import ArticleHeader from './ArticleHeader';
import ShareSheet from './ShareSheet';
import AboutAuthor from './AboutAuthor';
import config from '@/data/config.json';

type BlogPostProps = {
  frontmatter: {
    title: string;
    headline: string;
    description: string;
    subhead: string;
    image: string;
    draft?: boolean;
    authorTwitter: string;
    date: string;
  };
  markdownBody: string;
  author?: {
    name: string;
    bio: string;
    twitter: string;
    image: string;
  };
};

const BlogPost: React.FC<BlogPostProps> = ({ frontmatter, markdownBody, author }) => {
  const title = `${frontmatter.title ?? frontmatter.headline} | ${config.title} Blog`;
  const description = frontmatter.description ?? frontmatter.subhead;

  return (
    <Section className="px-4 py-8 md:px-6">
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={frontmatter.image ?? `${config.host}/social-preview.jpg`}
        />
        {!!frontmatter.draft && (
          <meta name="robots" content="noindex,nofollow" />
        )}
        <meta name="twitter:creator" content={frontmatter.authorTwitter ?? config.twitter} />
      </Head>
      <article className="overflow-hidden py-16">
        <div className="max-w-3xl mx-auto">
          <ArticleHeader
            frontmatter={frontmatter}
            author={author ? { name: author.name, avatar_url: author.image } : undefined}
          />
          <Markdown className="pagebody">{markdownBody}</Markdown>
          <ShareSheet />
          {author && (
            <AboutAuthor
              author={{
                name: author.name,
                bio: author.bio,
                twitter: author.twitter,
                avatar_url: author.image,
                blog: '',
                location: '',
                login: '',
                twitter_username: author.twitter,
              }}
            />
          )}
        </div>
      </article>
    </Section>
  );
};

export default BlogPost;