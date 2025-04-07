import matter from 'gray-matter';
import { glob } from 'glob';
import { fetchGitHubUser } from '@/utils/fetchData';

interface Frontmatter {
    title: string;
    date: string;
    author?: string;
    draft?: boolean;
    [key: string]: any;
}

interface Post {
    title: string;
    date: string;
    slug: string;
    url: string;
    path: string;
    author: any | null;
    draft?: boolean;
    [key: string]: any;
}

const getDate = (str: string): string => new Date(str).toISOString();

const getAllPosts = async () => {
  const paths = glob.sync('data/blog/**/*.md');

  let posts = await Promise.all(
    paths.map(async (path) => {
      const url = path.slice(4, -3);
      const content = await import(`../${path}`);
      const data = matter(content.default);
      const frontmatter = data.data;
      const author = frontmatter.author
        ? await fetchGitHubUser(frontmatter.author)
        : null;
      const pathComponents = path.split('/');
      const slug = pathComponents[pathComponents.length - 1];

      return {
        ...frontmatter,
        date: getDate(frontmatter.date),
        slug,
        url,
        path,
        author,
      } as Post;
    })
  );

  posts = posts
    .filter(({ draft }) => !draft)
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));

  return posts;
};

export default getAllPosts;