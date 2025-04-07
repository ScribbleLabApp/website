import { GetStaticProps, NextPage } from 'next';
import SCSection from '@/components/common/layout/SCSection';
import { SCContentUnavailability } from '@/components/internal/sccontentunavailability';
import Image from 'next/image';

const tileLayout = [1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];

const getTileImpositionLayout = (idx: number): string => `${tileLayout[idx] ?? 3}up`;

interface Post {
    url: string;
    image: string;
    category: string;
    title: string;
    date?: string;
    slug: string;
  }

interface BlogPageProps {
    posts: Post[];
}

function formatDate(str: string): string {
    const date = new Date(str);
    return date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
}

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
    if (!posts || posts.length === 0) {
      return (
        <SCContentUnavailability
          title="No Posts Found"
          message="Sorry, we couldn't find any recent posts."
        />
      );
    }
  
    return (
      <>
        <SCSection contained gutterY="true" variant="secondary">
          <h2 className="text-2xl font-bold mb-8">Latest News</h2>
          <ul className="flex flex-wrap justify-between space-y-9">
            {posts.map((post, idx) => {
              const tileImpositionLayout = getTileImpositionLayout(idx);
  
              return (
                <li
                  key={post.date + post.slug}
                  className={`relative list-none item item-${tileImpositionLayout}`}
                >
                  <Tile post={post} impositionLayout={tileImpositionLayout} />
                </li>
              );
            })}
          </ul>
        </SCSection>
        {posts.length > 11 && (
          <SCSection contained gutterBottom="true">
            <div className="flex justify-center">
              <a href="/blog/archive/">
                <button className="rounded-full inline-block transition-colors border-2 border-primary p-3 px-6 font-semibold text-primary bg-transparent cursor-pointer hover:bg-primary hover:text-fill">
                  View Archive
                </button>
              </a>
            </div>
          </SCSection>
        )}
      </>
    );
  };

const Tile = ({ post, impositionLayout }: { post: Post; impositionLayout: string }) => {
  return (
    <a href={post.url} className={`bg-background-tertiary text-label-primary rounded-lg overflow-hidden z-0 relative flex cursor-pointer tile-${impositionLayout}`}>
      <div className="relative z-0 flex-grow-0 flex-shrink-0 overflow-hidden">
        <Image width="643" height="362" src={post.image} alt="Post Image" className="transition-transform duration-400 ease-out w-full h-full object-cover hover:scale-105" />
      </div>
      <div className="flex flex-col flex-shrink-0 flex-grow-1 px-8 py-8 justify-between">
        <div>
          <div className="text-label-tertiary text-xs leading-[1.33] font-bold tracking-[-0.01em] uppercase mb-2">{post.category}</div>
          <div className="text-label-primary line-clamp-6 leading-tight tracking-[0.004em] font-display text-4xl md:text-2xl font-semibold">{post.title}</div>
        </div>
        {post.date && <div className="text-label-tertiary text-sm leading-5 font-semibold tracking-[-0.016em] mt-3">{formatDate(post.date)}</div>}
      </div>
    </a>
  );
};

export default BlogPage;