"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface FirebaseImageProps {
  path: string;
  alt: string;
  className?: string;
}

const FirebaseImage: React.FC<FirebaseImageProps> = ({ path, alt, className }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("firebase/storage").then(({ getStorage, ref, getDownloadURL }) => {
        const storage = getStorage();
        const storageRef = ref(storage, path);

        getDownloadURL(storageRef)
          .then((url) => {
            setImageUrl(url);
          })
          .catch((error) => {
            console.error("Error fetching image URL:", error);
          });
      });
    }
  }, [path]);

  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt}
          className={className}
          loading="lazy"
        />
      ) : (
        <Skeleton className={`w-full h-full ${className}`} />
      )}
    </div>
  );
};

export default FirebaseImage;