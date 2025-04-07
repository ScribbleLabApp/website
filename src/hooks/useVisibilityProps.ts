"use client";

import { useState, useEffect } from 'react';

const useVisibilityProps = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const sectionElement = document.querySelector(`#${props.id}`);
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, [props.id]);

  return isVisible;
};

export default useVisibilityProps;