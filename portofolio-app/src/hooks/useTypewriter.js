import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i === text.length) clearInterval(typing);
    }, speed);

    return () => clearInterval(typing);
  }, [text, speed]);

  return displayedText;
};