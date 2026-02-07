// src/components/RouteTransitionVideo.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useVisited } from '../contexts/VisitedContext';

const RouteTransitionVideo: React.FC = () => {
  const location = useLocation();
  const { visitedPages } = useVisited();
  const [show, setShow] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const firstLoad = useRef(true);
  const initialPath = useRef(location.pathname);
  
  // Helper function to get the base path (first segment) of a path
  const getBasePath = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    return segments.length > 0 ? `/${segments[0]}` : '/';
  };

  // Helper function to check if path is admin route
  const isAdminRoute = (path: string) => {
    return path.startsWith('/admin');
  };

  useEffect(() => {
    if (firstLoad.current) {
      // Don't play intro on admin routes
      if (!isAdminRoute(location.pathname)) {
        const videoSrcToSet = '/intro.mp4';
        React.startTransition(() => {
          setVideoSrc(videoSrcToSet);
          setShow(true);
        });
      }
      firstLoad.current = false;
      initialPath.current = location.pathname;
      return;
    }
    
    // Skip transitions for admin routes
    if (isAdminRoute(location.pathname)) {
      initialPath.current = location.pathname;
      return;
    }
    
    const currentBasePath = getBasePath(location.pathname);
    const previousBasePath = getBasePath(initialPath.current);
    
    // Only show transition if:
    // 1. We're navigating to a different base path (e.g., from /about to /services)
    // 2. The target base path hasn't been visited yet
    if (currentBasePath !== previousBasePath && !visitedPages.includes(currentBasePath)) {
      React.startTransition(() => {
        setVideoSrc('/transition.mp4');
        setShow(true);
      });
    }
    
    // Always update initialPath to current path
    initialPath.current = location.pathname;
  }, [location.pathname, visitedPages]);

  // Allow manual triggering (e.g., before navigation to ensure visible)
  useEffect(() => {
    const handler = () => {
      const currentPath = window.location.pathname;
      
      // Skip transitions for admin routes
      if (isAdminRoute(currentPath)) {
        return;
      }
      
      const basePath = getBasePath(currentPath);
      
      // Only show transition if the base path hasn't been visited
      if (!visitedPages.includes(basePath)) {
        React.startTransition(() => {
          setVideoSrc('/transition.mp4');
          setShow(true);
        });
      }
    };
    
    window.addEventListener('force-route-transition', handler as EventListener);
    return () => window.removeEventListener('force-route-transition', handler as EventListener);
  }, [visitedPages]);

  useEffect(() => {
    if (!show || !videoRef.current) return;
    const v = videoRef.current;
    const onEnded = () => setShow(false);
    const onError = () => setShow(false);
    v.currentTime = 0;
    v.muted = true;
    v.play().catch(() => setShow(false));
    v.addEventListener('ended', onEnded);
    v.addEventListener('error', onError);
    return () => {
      v.removeEventListener('ended', onEnded);
      v.removeEventListener('error', onError);
    };
  }, [show, videoSrc]);

  if (!show || !videoSrc) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      zIndex: 9999
    }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          background: '#000'
        }}
      >
        <source src={videoSrc === '/transition.mp4' ? '/navigation.mp4' : videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default RouteTransitionVideo;
