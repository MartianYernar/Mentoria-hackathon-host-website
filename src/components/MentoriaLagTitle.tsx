"use client";

const LINE1_STYLE =
  "text-[clamp(2.75rem,11vw,5.5rem)] font-black uppercase leading-[0.9] tracking-[-0.03em]";
const LINE2_STYLE =
  "text-[clamp(1.75rem,6vw,3rem)] font-black uppercase leading-[0.95] tracking-[0.08em]";

function LagLine({
  text,
  className,
  ariaHidden,
}: {
  text: string;
  className: string;
  ariaHidden?: boolean;
}) {
  return (
    <div className={`mentoria-title relative inline-block ${className}`}>
      <span
        className={`mentoria-title__base relative z-10 block ${className} text-white`}
        aria-hidden={ariaHidden}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className={`mentoria-title__lag mentoria-title__lag--primary pointer-events-none absolute inset-0 flex items-center justify-center ${className} text-[#00ff00]`}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className={`mentoria-title__lag mentoria-title__lag--secondary pointer-events-none absolute inset-0 flex items-center justify-center ${className} text-[#00ff00]`}
      >
        {text}
      </span>
    </div>
  );
}

export default function MentoriaLagTitle() {
  return (
    <h1 className="flex flex-col items-center gap-1" aria-label="Mentoria Hackathon">
      <LagLine text="MENTORIA" className={LINE1_STYLE} />
      <LagLine text="HACKATHON" className={LINE2_STYLE} ariaHidden />
    </h1>
  );
}
