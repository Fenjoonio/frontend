import React, { useState, useRef, useEffect } from "react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
        isPulling.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || refreshing) return;

      const distance = e.touches[0].clientY - startY.current;
      if (distance > 0 && distance < 80) {
        setPullDistance(distance);
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance > 60) {
        setRefreshing(true);
        setPullDistance(50);
        await onRefresh();
      }
      setPullDistance(0);
      setRefreshing(false);
      isPulling.current = false;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onRefresh, refreshing, pullDistance]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center text-gray-500 transition-transform duration-300"
        style={{ transform: `translateY(${pullDistance}px)`, height: "10px" }}
      >
        {refreshing ? (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
          </div>
        ) : pullDistance > 30 ? (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default PullToRefresh;
