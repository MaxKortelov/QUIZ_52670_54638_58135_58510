import { PorterStemmerRu } from 'natural';

export function clearText(text: string): string {
  return text.toLowerCase()
    .replace(/[\.,!?;:()\[\]{}"']/g, '')
    .trim();
}

export function toFlexiblePattern(question: string): string {
  const cleanQuestion = clearText(question);
  const words = cleanQuestion.split(/\s+/); // Разделение на слова
  return words.map(word => `(${word})`).join('.*'); // Допускаем любые символы между словами
}

export function toNaturalPattern(question: string): string {
  const words = clearText(question).split(/\s+/);
  return words.map(word => PorterStemmerRu.stem(word)).join(" ");
}