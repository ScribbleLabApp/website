"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const headings = document.querySelectorAll("h1, h2, h3");
      const headingElements = Array.from(headings);

      const observer = new IntersectionObserver(
        (entries) => {
          const visibleHeadings = entries.filter((entry) => entry.isIntersecting);
          if (visibleHeadings.length > 0) {
            setActiveId(visibleHeadings[0].target.id);
          }
        },
        { rootMargin: "0px 0px -80% 0px" }
      );

      headingElements.forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }
  }, []);

  const [headings, setHeadings] = useState<Array<{ id: string, text: string, level: string }>>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const headings = Array.from(document.querySelectorAll("h1, h2, h3")).map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName.toLowerCase(),
      }));
      setHeadings(headings);
    }
  }, []);

  return (
    <nav className="sticky top-16 max-h-screen overflow-y-auto p-4 w-72">
      <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">Table of Contents</h3>
      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            className={`pl-${level === "h1" ? 4 : level === "h2" ? 6 : 8} ${
              activeId === id ? "text-orange-500 font-semibold" : "text-neutral-500"
            }`}
          >
            <a href={`#${id}`}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}