import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-content px-5 pt-8 sm:px-8">
      <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-line bg-surface px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-accent">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] text-ink sm:text-5xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-canvas transition-transform hover:-translate-y-0.5"
          >
            BROWSE WORKOUTS
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>

        <div className="relative mx-auto h-56 w-full max-w-sm sm:h-72 md:h-80">
          <Image
            src="https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740"
            alt="Illustrated character mid-lift"
            fill
            sizes="(max-width: 768px) 90vw, 380px"
            className="rounded-xl object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
