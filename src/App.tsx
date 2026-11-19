import { useState } from 'react';
import {
  BACKDROP_IMAGE_PATH,
  CHAPTERS,
  KEEPSAKE_IMAGE_PATH,
} from './config/surpriseConfig';
import { ResilientImage } from './components/ResilientImage';
import { StepNumber, SurpriseCard } from './components/SurpriseCard';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [highestStep, setHighestStep] = useState<StepNumber>(1);

  const handleStepChange = (step: StepNumber) => {
    setCurrentStep(step);
    setHighestStep((prev) => (step > prev ? step : prev));
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden px-4 py-8 sm:px-8 lg:px-12">
      {/* Full-bleed atmospheric floral backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <ResilientImage
          src={BACKDROP_IMAGE_PATH}
          alt="Moody twilight bouquet of blush peonies and crimson roses with warm bokeh"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#13070d]/70 via-[#190a13]/52 to-[#10050b]/85"
        />
      </div>

      {/* Desktop 2-column editorial layout; mobile centered thumb-friendly card */}
      <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_440px] lg:items-stretch lg:gap-14">
        {/* Left editorial story & keepsake column (visible on desktop to anchor full viewport) */}
        <aside className="hidden lg:flex flex-col justify-between py-2 pr-4">
          <div>
            <p className="mb-3 text-xs font-medium tracking-wide text-rose-100/75">
              Something Special · Just For You
            </p>
            <h2 className="mb-4 max-w-[18ch] font-display text-4xl font-semibold leading-[1.15] text-white [text-wrap:balance]">
              Every little chapter leads to you.
            </h2>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-rose-100/80">
              Take your time moving through each note. Answer honestly, follow your heart, and unlock what is waiting at the end.
            </p>
          </div>

          {/* Keepsake tulip preview */}
          <div className="my-7 overflow-hidden rounded-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="relative aspect-[16/10] w-full">
              <ResilientImage
                src={KEEPSAKE_IMAGE_PATH}
                alt="Pastel pink and ivory tulips tied with a silk blush ribbon"
                fallbackTitle="A quiet keepsake"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#13070d]/75 via-transparent to-transparent"
              />
              <p className="absolute bottom-3.5 left-4 right-4 text-xs font-medium text-rose-50/90">
                {currentStep === 4
                  ? 'Ready whenever you are'
                  : 'Waiting at the end of step four'}
              </p>
            </div>
          </div>

          {/* Unboxed chapter list */}
          <nav aria-label="Story progress" className="border-t border-white/15 pt-5">
            <ol className="grid grid-cols-2 gap-x-6 gap-y-3">
              {CHAPTERS.map((chapter) => {
                const isActive = currentStep === chapter.step;
                const isVisited = chapter.step <= highestStep;

                return (
                  <li key={chapter.step}>
                    <button
                      type="button"
                      disabled={!isVisited}
                      onClick={() => {
                        if (isVisited) {
                          setCurrentStep(chapter.step as StepNumber);
                        }
                      }}
                      className={`group flex w-full items-baseline gap-2.5 text-left transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 rounded px-1 py-1 ${
                        isActive
                          ? 'text-white'
                          : isVisited
                          ? 'text-rose-100/80 hover:text-white'
                          : 'cursor-default text-rose-100/40'
                      }`}
                    >
                      <span className="font-mono text-xs tabular-nums text-rose-300/90">
                        0{chapter.step}.
                      </span>
                      <span className="truncate text-sm font-medium">
                        {chapter.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        {/* Focal interactive frosted glass card */}
        <div className="mx-auto flex w-full max-w-[440px] items-center justify-center">
          <SurpriseCard
            currentStep={currentStep}
            onStepChange={handleStepChange}
          />
        </div>
      </div>
    </main>
  );
}
