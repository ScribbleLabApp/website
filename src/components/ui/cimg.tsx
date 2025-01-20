"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const _cBaseURL: string = 'https://res.cloudinary.com/dtslvnhlo/image/upload';

interface CImageProps {
    id: string;
    alt: string;
    className?: string;
}

const CImage: React.FC<CImageProps> = ({ id, alt, className }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const c_imageUrl = `${_cBaseURL}/q_auto,f_auto/${id}`;

    useEffect(() => {
        // Simulating fetching the image URL, replace this with your actual logic
        const fetchImage = async () => {
            try {
                // Simulate an API call or computation
                const url = c_imageUrl;
                setImageUrl(url);
            } catch (error) {
                console.error("Error fetching image:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [id]);

    return (
        <div className="relative">
            {loading || !imageUrl ? (
                <Skeleton className={className} />
            ) : (
                <img
                    src={imageUrl}
                    alt={alt}
                    className={className}
                    onLoad={() => setLoading(false)}
                />
            )}
        </div>
    );
};

export { CImage };