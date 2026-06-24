'use client';

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  webmSrc?: string;
  mp4Src: string;
  poster?: string;
  className?: string;
  priority?: boolean;
}

/**
 * VideoPlayer - Lazy loading video with IntersectionObserver
 * Matches reference: autoplay, playsinline, loop, muted
 * Reference lines 522-534 (about video), 551-563 (scroll videos)
 */
export default function VideoPlayer({
  webmSrc,
  mp4Src,
  poster,
  className = '',
  priority = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (priority) {
      video.play().catch(() => {});
      return;
    }

    // Lazy load with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [priority]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      loop
      muted
      poster={poster}
      preload={priority ? 'auto' : 'none'}
      className={`hide-controls ${className}`}
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={mp4Src} type="video/mp4" />
      {poster && <img src={poster} alt="Video poster" />}
    </video>
  );
}
