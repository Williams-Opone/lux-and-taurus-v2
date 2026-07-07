import { useLayoutEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  ScaleFrame — renders children at a fixed design width and scales   */
/*  the whole block down proportionally to fit narrower screens.       */
/*                                                                     */
/*  Why: the pipeline sections (Portfolio / Method / FAQ) are built    */
/*  on exact pixel geometry. Reflowing them on mobile breaks the       */
/*  circuit; scaling preserves the EXACT desktop structure on every    */
/*  device — spines, elbows, arrows, and current pulses included.     */
/*                                                                     */
/*  Implementation: transform:scale on a fixed-width inner div, with   */
/*  the outer div's height synced to (inner height × scale) via        */
/*  ResizeObserver — so document flow stays correct even when the      */
/*  content height changes (e.g. FAQ accordions expanding).            */
/* ------------------------------------------------------------------ */

export const ScaleFrame = ({
  designWidth,
  children,
  className = '',
}: {
  designWidth: number;
  children: React.ReactNode;
  className?: string;
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const measure = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const s = Math.min(1, outer.clientWidth / designWidth);
      setScale(s);
      setHeight(inner.offsetHeight * s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current) ro.observe(outerRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [designWidth]);

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ height, maxWidth: designWidth, marginLeft: 'auto', marginRight: 'auto' }}
    >
      <div
        ref={innerRef}
        style={{
          width: designWidth,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
};
