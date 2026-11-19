import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, ExternalLink, RotateCcw } from 'lucide-react';
import {
  QUIZ_OPTIONS,
  QuizOption,
  QuizOptionId,
  SURPRISE_WEBSITE_URL,
} from '../config/surpriseConfig';

export type StepNumber = 1 | 2 | 3 | 4;

interface SurpriseCardProps {
  currentStep: StepNumber;
  onStepChange: (step: StepNumber) => void;
}

export function SurpriseCard({
  currentStep,
  onStepChange,
}: SurpriseCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [feedback, setFeedback] = useState<{
    text: string;
    tone: 'wrong' | 'correct';
    optionId: QuizOptionId;
  } | null>(null);
  const [shakeCount, setShakeCount] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const advanceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current !== null) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  const handleOptionClick = (option: QuizOption) => {
    if (isAdvancing) return;

    if (!option.isCorrect) {
      setFeedback({
        text: option.feedback,
        tone: 'wrong',
        optionId: option.id,
      });
      setShakeCount((prev) => prev + 1);
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate(180);
      }
      return;
    }

    setFeedback({
      text: option.feedback,
      tone: 'correct',
      optionId: option.id,
    });
    setIsAdvancing(true);

    advanceTimerRef.current = window.setTimeout(() => {
      setIsAdvancing(false);
      onStepChange(4);
    }, 1300);
  };

  const handleOpenSurprise = () => {
    window.location.href = SURPRISE_WEBSITE_URL;
  };

  const handleReplay = () => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    setFeedback(null);
    setIsAdvancing(false);
    onStepChange(1);
  };

  const transitionProps = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <div
      key={shakeCount}
      className={`relative w-full rounded-[28px] border border-white/25 bg-[#1b0b14]/55 p-7 sm:p-9 text-center shadow-[0_24px_64px_rgba(0,0,0,0.48)] backdrop-blur-xl ${
        shakeCount > 0 ? 'animate-card-shake' : ''
      }`}
    >
      {/* Top quiet unboxed step progress */}
      <div className="mb-6 flex items-center justify-between text-xs font-medium tracking-wide text-rose-100/75">
        <span className="tabular-nums">Step 0{currentStep} · Of 04</span>
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-medium text-rose-100/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 rounded-md px-2 whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Start over
          </button>
        ) : (
          <span className="text-rose-200/65">Private Note</span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.section
            key="page1"
            aria-labelledby="heading-page1"
            className="flex flex-col items-center"
            {...transitionProps}
          >
            <div className="mb-4 text-4xl leading-none select-none" aria-hidden="true">
              🖤
            </div>
            <h1
              id="heading-page1"
              className="mb-4 font-display text-3xl sm:text-[34px] font-semibold leading-tight text-white [text-wrap:balance] drop-shadow-sm"
            >
              Are u excited? 🥹
            </h1>
            <p className="mb-8 max-w-[34ch] text-[15px] sm:text-base leading-relaxed text-rose-50/90">
              Heyyy baby! 🌷
              <br />
              I have something special waiting for you.
              <br />
              But first, tell me... Are u excited? 🫣
            </p>
            <button
              type="button"
              onClick={() => onStepChange(2)}
              className="group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-gradient-to-r from-[#ff84b6] to-[#f4387d] px-6 py-3.5 text-base font-bold tracking-wide text-white shadow-[0_10px_28px_rgba(244,56,125,0.38)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b0b14] whitespace-nowrap"
            >
              <span>YESSS 💗</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </motion.section>
        )}

        {currentStep === 2 && (
          <motion.section
            key="page2"
            aria-labelledby="heading-page2"
            className="flex flex-col items-center"
            {...transitionProps}
          >
            <div className="mb-4 text-4xl leading-none select-none" aria-hidden="true">
              🌸
            </div>
            <h1
              id="heading-page2"
              className="mb-4 font-display text-3xl sm:text-[34px] font-semibold leading-tight text-white [text-wrap:balance] drop-shadow-sm"
            >
              So let&apos;s start ✨
            </h1>
            <p className="mb-8 max-w-[34ch] text-[15px] sm:text-base leading-relaxed text-rose-50/90">
              Okayyy baby! 🥹
              <br />
              Let&apos;s see how well you know me.
              <br />
              But before that... I hope you&apos;re ready! 💗
            </p>
            <button
              type="button"
              onClick={() => onStepChange(3)}
              className="group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-gradient-to-r from-[#ff84b6] to-[#f4387d] px-6 py-3.5 text-base font-bold tracking-wide text-white shadow-[0_10px_28px_rgba(244,56,125,0.38)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b0b14] whitespace-nowrap"
            >
              <span>SO EXCITED? 🫣</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </motion.section>
        )}

        {currentStep === 3 && (
          <motion.section
            key="page3"
            aria-labelledby="heading-page3"
            className="flex flex-col items-center"
            {...transitionProps}
          >
            <div className="mb-3 text-4xl leading-none select-none" aria-hidden="true">
              💌
            </div>
            <h1
              id="heading-page3"
              className="mb-2 font-display text-3xl sm:text-[32px] font-semibold leading-tight text-white [text-wrap:balance] drop-shadow-sm"
            >
              One question for you!
            </h1>
            <p className="mb-6 text-[15px] sm:text-base leading-relaxed text-rose-50/90">
              What is my favourite thing? 🥹
            </p>

            <div className="flex w-full flex-col gap-3" role="group" aria-label="Quiz answer choices">
              {QUIZ_OPTIONS.map((option) => {
                const isSelected = feedback?.optionId === option.id;
                const isCorrectMatch = isSelected && feedback?.tone === 'correct';
                const isWrongMatch = isSelected && feedback?.tone === 'wrong';

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={isAdvancing}
                    onClick={() => handleOptionClick(option)}
                    className={`flex min-h-[50px] w-full items-center justify-between rounded-full border px-5 py-3 text-left text-[15px] font-semibold transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b0b14] ${
                      isCorrectMatch
                        ? 'border-emerald-300/80 bg-emerald-500/25 text-white shadow-[0_6px_22px_rgba(16,185,129,0.28)]'
                        : isWrongMatch
                        ? 'border-rose-300/75 bg-rose-500/25 text-rose-50'
                        : 'border-white/25 bg-white/[0.12] text-white hover:border-white/45 hover:bg-white/[0.20]'
                    } ${isAdvancing && !isCorrectMatch ? 'opacity-65' : ''}`}
                  >
                    <span>{option.label}</span>
                    {isCorrectMatch && (
                      <Check className="h-4 w-4 shrink-0 text-emerald-200" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>

            <div
              role="status"
              aria-live="polite"
              className="mt-5 flex min-h-[44px] items-center justify-center px-2 text-sm font-semibold"
            >
              {feedback ? (
                <span
                  className={
                    feedback.tone === 'correct' ? 'text-emerald-200' : 'text-rose-200'
                  }
                >
                  {feedback.text}
                </span>
              ) : (
                <span className="text-xs font-normal text-rose-100/60">
                  Pick the one that feels true
                </span>
              )}
            </div>
          </motion.section>
        )}

        {currentStep === 4 && (
          <motion.section
            key="page4"
            aria-labelledby="heading-page4"
            className="flex flex-col items-center"
            {...transitionProps}
          >
            <div className="mb-4 text-4xl leading-none select-none" aria-hidden="true">
              🌷
            </div>
            <h1
              id="heading-page4"
              className="mb-4 font-display text-3xl sm:text-[34px] font-semibold leading-tight text-white [text-wrap:balance] drop-shadow-sm"
            >
              So baby get ready for your surprise 🫣🌷
            </h1>
            <p className="mb-8 max-w-[34ch] text-[15px] sm:text-base leading-relaxed text-rose-50/90">
              You made it here, baby! 🥹
              <br />
              And now something special is waiting just for you. ❤️
            </p>
            <button
              type="button"
              onClick={handleOpenSurprise}
              className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-gradient-to-r from-[#ff84b6] to-[#f4387d] px-6 py-3.5 text-base font-bold tracking-wide text-white shadow-[0_12px_32px_rgba(244,56,125,0.42)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b0b14] whitespace-nowrap"
            >
              <span>SURPRISE 🎁</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Quiet unboxed footer */}
      <footer className="mt-7 flex items-center justify-center border-t border-white/15 pt-4 text-xs text-rose-100/70">
        <span>Made with lots of love ❤️</span>
      </footer>
    </div>
  );
}
