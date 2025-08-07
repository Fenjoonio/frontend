import { PropsWithChildren, useEffect, useState } from "react";

type FlexibleContainerProps = PropsWithChildren<{
  className?: string;
}>;

export default function FlexibleContainer({ children, className }: FlexibleContainerProps) {
  const [inputTranslateY, setInputTranslateY] = useState(0);

  useEffect(() => {
    const handleKeyboardHeightChange = (event: any) => {
      const { height } = event.detail;
      setInputTranslateY(height > 0 ? -height : 0);
    };

    window.addEventListener("resize", handleKeyboardHeightChange);

    return () => {
      window.removeEventListener("resize", handleKeyboardHeightChange);
    };
  }, []);

  return (
    <div style={{ transform: `translateY(${inputTranslateY}px)` }} className={className}>
      {children}
    </div>
  );
}
