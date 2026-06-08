"use client";

const TITLE_STYLE =
  "text-[clamp(3.5rem,14vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.03em]";

export default function BahandiSplitTitle() {
  return (
    <div className="bahandi-title relative inline-block select-none" aria-label="BAHANDI">
      {/* Base — sharp white, always visible */}
      <h1 className={`bahandi-title__base relative z-10 ${TITLE_STYLE} text-white`}>
        BAHANDI
      </h1>

      {/* Primary neon lag artifact — horizontal scan band */}
      <span
        aria-hidden="true"
        className={`bahandi-title__lag bahandi-title__lag--primary pointer-events-none absolute inset-0 flex items-center justify-center ${TITLE_STYLE} text-[#00ff00]`}
      >
        BAHANDI
      </span>

      {/* Secondary thinner scan line */}
      <span
        aria-hidden="true"
        className={`bahandi-title__lag bahandi-title__lag--secondary pointer-events-none absolute inset-0 flex items-center justify-center ${TITLE_STYLE} text-[#00ff00]`}
      >
        BAHANDI
      </span>
    </div>
  );
}
