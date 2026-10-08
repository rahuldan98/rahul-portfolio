import { useEffect, useState } from 'react';

// Types out each word, pauses, deletes it, then moves to the next.
export default function useTyping(words, speed = 80, pause = 1400) {
  const [text, setText] = useState('');
  useEffect(() => {
    let w = 0, c = 0, deleting = false, timer;
    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      setText(word.slice(0, c));
      let delay = deleting ? 40 : speed;
      if (!deleting && c === word.length) { deleting = true; delay = pause; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [words, speed, pause]);
  return text;
}
