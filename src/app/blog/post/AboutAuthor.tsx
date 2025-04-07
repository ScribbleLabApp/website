import Image from 'next/image';
import { FaGlobe, FaGithub, FaTwitter } from 'react-icons/fa';

type Author = {
  name: string;
  avatar_url: string;
  blog: string;
  location: string;
  bio: string;
  login: string;
  twitter_username: string;
  twitter: string;
};

interface AboutAuthorProps {
  author: Author | null;
}

const AboutAuthor = ({ author }: AboutAuthorProps) => {
  if (!author) return null;

  if (!author.blog.startsWith('http')) {
    author.blog = `https://${author.blog}`;
  }

  return (
    <div className="about-author component max-w-4xl mx-auto py-12">
      <div className="border-t border-separator pt-12">
        <h2 className="text-3xl font-semibold mb-8">About the Author</h2>
        <div className="flex gap-6 mt-8">
          <Image
            className="w-32 h-32 rounded-full"
            width="128"
            height="128"
            src={author.avatar_url}
            alt={`${author.name} user image`}
          />
          <div className="flex flex-col">
            <p className="text-xl font-bold mb-1">{author.name}</p>
            <p className="text-sm text-gray-600 mb-1">{author.location}</p>
            <p className="text-sm text-gray-700 mb-3">{author.bio}</p>
            <div className="flex space-x-4 mt-3">
              <a
                className="text-primary hover:text-fill"
                href={author.blog}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe size={20} />
              </a>
              <a
                className="text-primary hover:text-fill"
                href={`https://github.com/${author.login}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={20} />
              </a>
              <a
                className="text-primary hover:text-fill"
                href={`https://twitter.com/${author.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;