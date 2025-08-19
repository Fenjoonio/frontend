import { useEffect, useState } from "react";

export default function useKeyboardHeight(defaultHeight = 0) {
  const [keyboardHeight, setKeyboardHeight] = useState(defaultHeight);

  useEffect(() => {
    const handleKeyboardHeightChange = (event: any) => {
      const { height } = event.detail;
      setKeyboardHeight(height > 0 ? -height : 0);
    };

    window.addEventListener("keyboardHeightChange", handleKeyboardHeightChange);

    return () => {
      window.removeEventListener("keyboardHeightChange", handleKeyboardHeightChange);
    };
  }, []);

  return keyboardHeight;
}
