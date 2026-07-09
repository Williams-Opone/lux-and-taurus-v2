import { useLayoutEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  ScaleFrame — renders children at a fixed design width and scales   */
/*  the whole block down proportionally to fit narrower screens.       */
/*                                                                     */
/*  Used ONLY for the geometry-critical pipeline sections (Portfolio,  */
/*  Method, FAQ) whose fixed-pixel circuit layout must stay identical  */
/*  on every device. Flow-friendly sections reflow natively instead.   */
/*                                                                     */
/*  `minScale` sets a readability floor: the frame never shrinks       */
/*  below it — on very narrow phones the content crops symmetrically   */
/*  at the edges instead of becoming microscopic.                      */
/*                                                                     */
/*  Height is synced to (inner height × scale) via ResizeObserver so   */
/*  document flow stays correct even when content height changes       */
/*  (e.g. FAQ accordions expanding).                                   */
/* ------------------------------------------------------------------ */

export const ScaleFrame = ({
  designWidth,
  minScale = 0,
  children,
  className = '',
}: {
  designWidth: number;
  minScale?: number;
  children: React.ReactNode;
  className?: string;
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [cropping, setCropping] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const fit = outer.clientWidth / designWidth;
      const s = Math.max(minScale, Math.min(1, fit));
      setScale(s);
      setHeight(inner.offsetHeight * s);
      /* only clip when the minScale floor forces actual cropping —
         otherwise let glows/shadows bleed past the frame naturally */
      setCropping(fit < minScale);
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
  }, [designWidth, minScale]);

  return (
    <div
      ref={outerRef}
      className={className}
      style={{
        height,
        maxWidth: designWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        overflow: cropping ? 'hidden' : 'visible',
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: designWidth,
          flexShrink: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
