"use client";

import { useEffect, useState, useRef } from "react";

interface TrailDot {
  x: number;
  y: number;
  opacity: number;
}

interface SpringPosition {
  x: number;
  y: number;
}

export const CircularCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const lastMousePosition = useRef<{ x: number; y: number } | null>(null);

  // Handle mounting and mobile detection
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
        const hasHover = window.matchMedia('(hover: hover)').matches;
        setIsMobile(!hasFinePointer || !hasHover);
      }
    };

    // Check if mouse is already on the page
    if (typeof window !== 'undefined') {
      const handleInitialMousePosition = (e: MouseEvent) => {
        setIsVisible(true);
        setPosition({ x: e.clientX, y: e.clientY });
        // Remove the listener after first detection
        document.removeEventListener('mousemove', handleInitialMousePosition);
      };
      document.addEventListener('mousemove', handleInitialMousePosition);
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Function to handle cursor animation and trail
  const animateCursor = (time: number) => {
    if (previousTimeRef.current !== null) {
      // Add new dot to the trail only if cursor is visible
      if (isVisible && position.x !== 0 && position.y !== 0) {
        const newTrail = [...trail];
        
        // Add new dot
        newTrail.unshift({
          x: position.x,
          y: position.y,
          opacity: 1,
        });
        
        // Limit trail length and fade dots
        const updatedTrail = newTrail.slice(0, 8).map((dot, index) => ({
          ...dot,
          opacity: Math.max(0.2, 1 - index * 0.15), // Higher minimum opacity, slower fade
        }));
        
        setTrail(updatedTrail);
      }
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateCursor);
  };

  useEffect(() => {
    if (!isMobile && isMounted) {
      // Start animation loop
      requestRef.current = requestAnimationFrame(animateCursor);
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [position, isVisible, trail, isHoveringButton, isMobile, isMounted]);

  // Clear the trail when cursor leaves the screen
  useEffect(() => {
    if (!isVisible) {
      setTrail([]);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isMobile && isMounted) {
      // Show cursor when mouse moves and set its position
      const handleMouseMove = (e: MouseEvent) => {
        // Check for magnetic effect on buttons and links
        const target = e.target as HTMLElement;
        const isButton = 
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') || 
          target.closest('a') ||
          target.classList.contains('btn') ||
          target.getAttribute('role') === 'button';
        
        if (isButton) {
          const buttonElement = isButton === true ? target : (target.closest('button') || target.closest('a'));
          if (buttonElement) {
            const buttonRect = buttonElement.getBoundingClientRect();
            setIsHoveringButton(true);
            
            // Get button center coordinates
            const buttonCenterX = buttonRect.left + buttonRect.width / 2;
            const buttonCenterY = buttonRect.top + buttonRect.height / 2;
            
            // Calculate distance to button center for magnetic effect
            const distX = buttonCenterX - e.clientX;
            const distY = buttonCenterY - e.clientY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            // Calculate magnetic pull strength based on distance
            const maxDistance = Math.max(buttonRect.width, buttonRect.height) / 1.5;
            const pullStrength = Math.min(1.0, (maxDistance - Math.min(distance, maxDistance)) / maxDistance);
            
            // Apply magnetic effect with variable strength
            const magnetX = e.clientX + distX * pullStrength;
            const magnetY = e.clientY + distY * pullStrength;
            
            setButtonPosition({ x: buttonCenterX, y: buttonCenterY });
            setPosition({ x: magnetX, y: magnetY });
          }
        } else {
          setIsHoveringButton(false);
          setPosition({ x: e.clientX, y: e.clientY });
        }
      };

      // Handle mouse down to show clicking state
      const handleMouseDown = () => {
        setIsClicking(true);
      };

      // Handle mouse up to remove clicking state
      const handleMouseUp = () => {
        setIsClicking(false);
      };

      // Hide cursor when mouse leaves the window
      const handleMouseLeave = () => {
        setIsVisible(false);
        setTrail([]);
      };

      // Show cursor when mouse enters the window and set initial position
      const handleMouseEnter = (e: MouseEvent) => {
        setIsVisible(true);
        setPosition({ x: e.clientX, y: e.clientY });
      };

      // Add event listeners
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);

      // Clean up event listeners
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mouseleave", handleMouseLeave);
        document.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, [isVisible, isMobile, isMounted]);

  // Don't render anything during SSR or on mobile
  if (!isMounted || isMobile) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <div
        className={`cursor-circle ${isClicking ? "scale-75" : ""} ${isHoveringButton ? "hovering" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
          transform: isHoveringButton 
            ? undefined
            : `translate(-50%, -50%) scale(${isClicking ? 0.75 : 1})`,
          transition: "none",
        }}
      />
      
      {/* Trail dots */}
      {isVisible && trail.map((dot, index) => (
        <div
          key={index}
          className="cursor-circle"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            opacity: dot.opacity * 0.6,
            transform: `translate(-50%, -50%) scale(${0.85 - index * 0.1})`,
            transition: "none",
            filter: index > 0 ? `blur(${index * 0.5}px)` : 'none',
          }}
        />
      ))}
    </>
  );
}; 