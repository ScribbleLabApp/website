'use client';

import { ThemeSelector } from './theme-selector';
import { LanguageSelector } from './language-selector';
import Link from 'next/link';
import {
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaTiktok,
  FaLinkedin,
  FaDiscord,
} from 'react-icons/fa';

export function Footer() {
  const quickLinks = [
    {
      category: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Press & Media', href: '/press' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
    {
      category: 'Resources',
      links: [
        { name: 'Documentation', href: '/documentation' },
        { name: 'API Reference', href: '/api-reference' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Accessibility', href: '/accessibility' },
      ],
    },
    {
      category: 'Community',
      links: [
        { name: 'Discord', href: 'https://discord.gg/Y5mUJbNC8h' },
        { name: 'Forums', href: '/forums' },
        { name: 'Open Source', href: '/opensource' },
      ],
    },
    {
      category: 'Products',
      links: [
        { name: 'ScribbleLab', href: '/products/scribblelab' },
        { name: 'ScribbleLab Pro', href: '/products/scribblelab-pro' },
        { name: 'ScribbleLab for Teams', href: '/products/teams' },
        { name: 'Compare Plans', href: '/products/compare-plans' },
        {
          name: 'Get Started with ScribbleLab',
          href: '/products/get-started',
        },
      ],
    },
    {
      category: 'Support',
      links: [
        { name: 'Help Center', href: '/help-center' },
        { name: 'Troubleshooting', href: '/troubleshooting' },
        { name: 'Report a Bug', href: '/report-bug' },
        { name: 'Feature Requests', href: '/feature-requests' },
      ],
    },
    {
      category: 'Legal',
      links: [
        { name: 'Terms of Use', href: '/legal/terms' },
        { name: 'Privacy Policy', href: '/legal/privacy' },
        { name: 'Cookie Policy', href: '/legal/cookies' },
        { name: 'Licensing', href: '/legal/licensing' },
        { name: 'Security', href: '/legal/security' },
      ],
    },
    {
      category: 'Showcase',
      links: [
        {
          name: 'Customer Stories',
          href: '/showcase/customer-stories',
        },
        { name: 'Case Studies', href: '/showcase/case-studies' },
        { name: 'Featured Projects', href: '/showcase/projects' },
        { name: 'Design Gallery', href: '/showcase/design-gallery' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-neutral-900 text-foreground mt-12 w-full">
      <div className="container mx-auto px-4 py-8">
        {/* Quick Links Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickLinks.map((category) => (
            <div key={category.category}>
              <h3 className="text-lg font-semibold mb-2">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Language Selector and Social Media Links Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mt-8">
          <LanguageSelector />
          <div className="flex gap-4 text-lg">
            <Link href="https://github.com/ScribbleLabApp/" aria-label="GitHub">
              <FaGithub />
            </Link>
            <Link href="https://www.instagram.com/scribblelabappofficial/" aria-label="Instagram">
              <FaInstagram className='bg-gradient-to-r hover:from-purple-500 hover:via-red-500 hover:to-yellow-500 transition-colors duration-300'/>
            </Link>
            <Link href="https://www.youtube.com/@scribblelabappofficial" aria-label="YouTube">
              <FaYoutube className='hover:text-red-500' />
            </Link>
            <Link href="https://x.com/scribblelabapp" aria-label="Twitter">
              <FaTwitter className='hover:text-blue-400' />
            </Link>
            <Link href="https://www.tiktok.com/@scribblelabappofficial" aria-label="TikTok">
              <FaTiktok />
            </Link>
            <Link href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedin className='hover:text-blue-400'/>
            </Link>
            <Link href="https://discord.gg/Y5mUJbNC8h" aria-label="Discord">
              <FaDiscord className='hover:text-violet-700' />
            </Link>
          </div>
        </div>

        <hr className="my-3 border-t border-muted-foreground" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright and Theme Selector */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-muted-foreground">
            <span>© 2024 ScribbleLab LLC. All rights reserved.</span>
          </div>
          <ThemeSelector />
        </div>
      </div>
    </footer>
  );
}
