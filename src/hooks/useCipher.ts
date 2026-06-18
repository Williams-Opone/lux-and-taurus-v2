import { useState, useEffect } from 'react';

export const useCipher = (targetText: string, trigger: boolean) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '01XYZ$_//##@[]⚡';

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (index < iteration) return targetText[index];
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iteration >= targetText.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 25);

    return () => clearInterval(interval);
  }, [targetText, trigger]);

  return displayText;
};