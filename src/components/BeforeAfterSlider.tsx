import React, { useEffect, useRef, useState } from 'react';
import { FALLBACK_ASSETS } from '../data';

interface BeforeAfterSliderProps {
  imageUrl: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  isSplitImage?: boolean;
  dirtyOverlayClass?: string;
  aspectRatio?: string;
  title: string;
}

export default function BeforeAfterSlider({
  imageUrl,
  beforeImageUrl,
  afterImageUrl,
  isSplitImage = true,
  dirtyOverlayClass = '',
  aspectRatio = 'aspect-video',
  title,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(600);
  const [beforeSrc, setBeforeSrc] = useState(beforeImageUrl || imageUrl);
  const [afterSrc, setAfterSrc] = useState(afterImageUrl || imageUrl);

  useEffect(() => {
    setBeforeSrc(beforeImageUrl || imageUrl);
    setAfterSrc(afterImageUrl || imageUrl);
  }, [imageUrl, beforeImageUrl, afterImageUrl]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageError = (kind: 'before' | 'after') => {
    const sourcePath = kind === 'before' ? beforeImageUrl || imageUrl : afterImageUrl || imageUrl;
    if (FALLBACK_ASSETS[sourcePath]) {
      if (kind === 'before') {
        setBeforeSrc(FALLBACK_ASSETS[sourcePath]);
      } else {
        setAfterSrc(FALLBACK_ASSETS[sourcePath]);
      }
    }
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>
  ) => {
    if ('touches' in event) {
      if (event.touches.length === 0) return;
      handleMove(event.touches[0].clientX);
    } else {
      if (event.buttons !== 1) return;
      handleMove(event.clientX);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleMove(event.clientX);
  };

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onMouseDown={handleMouseDown}
        className={`relative ${aspectRatio} w-full overflow-hidden rounded-lg shadow-md border border-gray-200 select-none cursor-ew-resize`}
      >
        <div className="absolute inset-0">
          <img
            src={afterSrc}
            alt={`${title} clean`}
            onError={() => handleImageError('after')}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              objectPosition: 'center',
            }}
          />
        </div>

        <div className="absolute top-3 right-3 bg-green-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-1 rounded shadow-sm z-10 pointer-events-none">
          Cleaned
        </div>

        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none border-r border-white/50 z-10"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute top-0 left-0 h-full" style={{ width: containerWidth }}>
            <img
              src={beforeSrc}
              alt={`${title} dirty`}
              onError={() => handleImageError('before')}
              className={`absolute inset-0 h-full object-cover pointer-events-none ${dirtyOverlayClass}`}
              style={{
                width: isSplitImage ? '200%' : '100%',
                maxWidth: 'none',
                objectPosition: isSplitImage ? 'left' : 'center',
              }}
            />
          </div>
        </div>

        <div
          className="absolute inset-y-0 w-1 bg-white shadow-2xl pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-200 font-bold text-xs select-none">
            ↔
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[11px] text-gray-500 font-medium px-1">
        <span>◀ Slide to reveal original grime level</span>
        <span>Drag right to clean! ▶</span>
      </div>
    </div>
  );
}
