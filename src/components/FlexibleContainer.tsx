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

    window.addEventListener("keyboardHeightChange", handleKeyboardHeightChange);

    return () => {
      window.removeEventListener("keyboardHeightChange", handleKeyboardHeightChange);
    };
  }, []);

  return (
    <div style={{ transform: `translateY(${inputTranslateY}px)` }} className={className}>
      {children}
    </div>
  );
}
