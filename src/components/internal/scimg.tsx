"use client";

import React from "react";

/**
 * Base URL for Cloudinary image resources.
 * @constant
 * @type {string}
 */
const _cBaseURL: string = "https://res.cloudinary.com/dtslvnhlo/image/upload";

/**
 * SCimg component - A React functional component for rendering images from Cloudinary.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the image in Cloudinary.
 * @param {string} props.alt - The alt text for the image, used for accessibility.
 * @param {string} [props.className] - Optional additional CSS class names to apply to the image.
 *
 * @returns {JSX.Element | null} The rendered image element or null if required props are missing.
 *
 * @example
 * // Usage example
 * <SCimg id="sample-image" alt="Sample Image" className="custom-class" />
 */
const SCimg = ({
  id,
  alt,
  className = "",
}: {
  id: string;
  alt: string;
  className?: string;
}) => {
  if (!id || !alt) {
    console.error(
      'The "id" and "alt" props are required for the <SCimg> component.',
    );
    return null;
  }

  const imageUrl = `${_cBaseURL}/q_auto,f_auto/${id}`;

  return (
    <>
      <link rel="prefetch" href={imageUrl} as="image" />
      <img
        src={imageUrl}
        alt={alt}
        className={`default-image-styles ${className}`}
        loading="lazy"
      />
    </>
  );
};

export default SCimg;
