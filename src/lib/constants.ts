export const roles = ['user', 'admin'] as const;
export type Role = (typeof roles)[number];

export const themes = ['light', 'dark', 'system'] as const;
export type Theme = (typeof themes)[number];

export type UserPreferences = {
  theme: Theme;
  simpleBooks: boolean;
  texturedBooks: boolean;
};
export const defaultUserPreferences: UserPreferences = {
  theme: 'dark',
  simpleBooks: false,
  texturedBooks: false,
};

export const publishers = [
  'ccbuchner',
  'cornelsen',
  'klett',
  'westermann',
] as const;
export type Publisher = (typeof publishers)[number];

export const publishersMap: {
  value: Publisher;
  label: string;
  icon: string;
  fallback: string;
}[] = [
  {
    value: 'ccbuchner',
    label: 'C.C.Buchner',
    icon: 'ccbuchner.svg',
    fallback: 'CC',
  },
  {
    value: 'cornelsen',
    label: 'Cornelsen',
    icon: 'cornelsen.svg',
    fallback: 'CO',
  },
  {
    value: 'klett',
    label: 'Klett',
    icon: 'klett.svg',
    fallback: 'KL',
  },
  {
    value: 'westermann',
    label: 'Westermann',
    icon: 'westermann.svg',
    fallback: 'WE',
  },
] as const;

export type PublisherAccount = {
  username: string;
  password: string;
  publisher: Publisher;
};

export type Book = {
  bookUrl: string;
  subject: string;
  grade: Grade | string;
  publisher: Publisher;
  coverUrl: string;
  color: Color;
};

export const grades = [5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
export type Grade = (typeof grades)[number];

export const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'mint',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'purple',
  'pink',
  'brown',
] as const;
export type Color = (typeof colors)[number];
export const colorsMap: {
  value: Color;
  label: string;
  darkHex: string;
  lightHex: string;
}[] = [
  {
    value: 'red',
    label: 'Rot',
    darkHex: '#FF4245',
    lightHex: '#FF383C',
  },
  {
    value: 'orange',
    label: 'Orange',
    darkHex: '#FF9230',
    lightHex: '#FF8D28',
  },
  {
    value: 'yellow',
    label: 'Gelb',
    darkHex: '#FFD600',
    lightHex: '#FFCC00',
  },
  {
    value: 'green',
    label: 'Grün',
    darkHex: '#30D158',
    lightHex: '#34C759',
  },
  {
    value: 'mint',
    label: 'Mint',
    darkHex: '#00DAC3',
    lightHex: '#00C8B3',
  },
  {
    value: 'teal',
    label: 'Aquamarin',
    darkHex: '#00D2E0',
    lightHex: '#00C3D0',
  },
  {
    value: 'cyan',
    label: 'Cyan',
    darkHex: '#3CD3FE',
    lightHex: '#00C0E8',
  },
  {
    value: 'blue',
    label: 'Blau',
    darkHex: '#0091FF',
    lightHex: '#0088FF',
  },
  {
    value: 'indigo',
    label: 'Indigo',
    darkHex: '#6B5DFF',
    lightHex: '#6155F5',
  },
  {
    value: 'purple',
    label: 'Lila',
    darkHex: '#DB34F2',
    lightHex: '#CB30E0',
  },
  {
    value: 'pink',
    label: 'Rosa',
    darkHex: '#FF375F',
    lightHex: '#FF2D55',
  },
  {
    value: 'brown',
    label: 'Braun',
    darkHex: '#B78A66',
    lightHex: '#AC7F5E',
  },
];

export const bookUrlRegex = {
  ccbuchner:
    /^https:\/\/www\.click-and-study\.de\/Player\/id\/([^/?#]+)(?:$|\?(?!\/)|\/page\/\d+(?:\?.*)?$)/,
  cornelsen: /^https:\/\/ebook\.cornelsen\.de\/(\d+)(?:\/|$)/,
  klett: /^https:\/\/bridge\.klett\.de\/([^/?#]+)(?:[/?#]|$)/,
  westermann:
    /^https:\/\/bibox2\.westermann\.de\/book\/([^/?#]+)(?:(?:\/page(?:\/\d+)?)?)\/?(?:\?.*)?$/,
};
