import React, { useRef, useEffect } from 'react';

interface BackgroundVideoProps {
  src: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src,
  className = '',
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      if (autoPlay) {
        video.play().catch(err => {
          console.log('Auto-play was prevented:', err);
        });
      }
    };

    const handleError = () => {
      console.log('Video failed to load');
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default BackgroundVideo;
