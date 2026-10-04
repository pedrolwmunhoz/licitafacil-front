import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  /** Atraso em ms para efeito em cascata quando vários entram juntos */
  delayMs?: number;
};

/** Escala atrasos em cascata (mais rápido que os delayMs passados nos filhos). */
const REVEAL_DELAY_SCALE = 0.4;
const REVEAL_DURATION_MS = 380;

/**
 * Entrada suave ao rolar: opacidade + leve movimento vertical.
 * Respeita prefers-reduced-motion.
 */
export function RevealOnScroll({ children, className, delayMs = 0 }: RevealOnScrollProps) {
  const scaledDelayMs = Math.round(delayMs * REVEAL_DELAY_SCALE);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { threshold: 0.02, rootMargin: "0px 0px 12% 0px" },
    );

    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "motion-reduce:opacity-100 motion-reduce:translate-y-0",
        "transition-[opacity,transform] ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className,
      )}
      style={{
        transitionDuration: `${REVEAL_DURATION_MS}ms`,
        ...(visible ? { transitionDelay: `${scaledDelayMs}ms` } : null),
      }}
    >
      {children}
    </div>
  );
}
