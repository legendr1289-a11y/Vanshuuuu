export type QuizOptionId = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  id: QuizOptionId;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export const SURPRISE_WEBSITE_URL = 'https://vanshuji-km8y.netlify.app';

export const BACKDROP_IMAGE_PATH =
  '/src/assets/images/romantic_peony_backdrop_1795032096860.jpg';

export const KEEPSAKE_IMAGE_PATH =
  '/src/assets/images/keepsake_tulip_bouquet_1795032098092.jpg';

export const QUIZ_OPTIONS: QuizOption[] = [
  {
    id: 'A',
    label: 'A — Your eyes 👀',
    isCorrect: false,
    feedback: "Nooo baby! That's not my answer 😭💗",
  },
  {
    id: 'B',
    label: 'B — Your hairs 💗',
    isCorrect: false,
    feedback: 'Wronggg cutie! Try again 🥹',
  },
  {
    id: 'C',
    label: 'C — Your lips 💋',
    isCorrect: false,
    feedback: 'Hehe! Not this one baby 😭🫣',
  },
  {
    id: 'D',
    label: 'D — Your soul ❤️',
    isCorrect: true,
    feedback: 'YAYYYYY! You got it right baby! 🥹❤️',
  },
];

export interface ChapterMeta {
  step: number;
  title: string;
  caption: string;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    step: 1,
    title: 'First Spark',
    caption: 'Are u excited?',
  },
  {
    step: 2,
    title: 'Warm-Up',
    caption: 'Ready to begin',
  },
  {
    step: 3,
    title: 'One Question',
    caption: 'How well you know me',
  },
  {
    step: 4,
    title: 'The Surprise',
    caption: 'Waiting just for you',
  },
];
