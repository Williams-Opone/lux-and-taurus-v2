import { useLayoutEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  ScaleFrame v6 — zoom-based, DESKTOP-ONLY duty.                     */
/*                                                                     */
/*  The pipeline sections now render native mobile layouts below lg,  */
/*  so this frame's only job is fitting the fixed-width blueprints     */
/*  into desktop containers (≥1024px), where scale ≈ 0.95–1.           */
/*  CSS zoom scales layout natively — no JS height sync to collapse.   */
/* ------------------------------------------------------------------ */

const supportsZoom =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function'
    ? CSS.supports('zoom', '0.5')
    : true;

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
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const measure = () => {
      const outer = outerRef.current;
      if (!outer) return;
      const w = outer.clientWidth;
      if (w <= 0) return;
      setScale(Math.max(minScale, Math.min(1, w / designWidth)));
    };
    measure();
    window.addEventListener('resize', measure);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      if (outerRef.current) ro.observe(outerRef.current);
    }
    return () => {
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, [designWidth, minScale]);

  if (!supportsZoom) {
    return (
      <div className={className} style={{ overflowX: 'auto' }}>
        <div style={{ width: designWidth, margin: '0 auto' }}>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={outerRef}
      className={className}
      style={{
        maxWidth: designWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: designWidth, flexShrink: 0, zoom: scale }}>
        {children}
      </div>
    </div>
  );
};
