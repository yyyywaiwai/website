import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

type RevealState = 'idle' | 'pending' | 'shown';

// 「JS が隠すのはオプトイン」方式: IntersectionObserver が使える環境でだけ
// pending (非表示) に武装し、非対応環境・reduced-motion・印刷では常に可視。
export function useReveal<T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  className: string;
} {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>('idle');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // 初回ペイント前に隠し状態へ武装する必要があるため、layout effect 内での
    // 同期 setState が正しい (paint 後だとコンテンツが一瞬見えてから消える)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState('pending');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    );
    observer.observe(el);

    const showNow = () => setState('shown');
    window.addEventListener('beforeprint', showNow);
    return () => {
      observer.disconnect();
      window.removeEventListener('beforeprint', showNow);
    };
  }, []);

  return { ref, className: state === 'pending' ? 'reveal is-pending' : 'reveal' };
}
