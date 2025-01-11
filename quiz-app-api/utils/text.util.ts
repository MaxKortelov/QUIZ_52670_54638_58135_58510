import { PorterStemmerRu } from 'natural';

export function toFlexiblePattern(question: string): string {
  const cleanQuestion = question
    .toLowerCase()
    .replace(/[\.,!?;:()\[\]{}"']/g, '')
    .trim();
  const words = cleanQuestion.split(/\s+/); // Разделение на слова
  return words.map(word => `(${word})`).join('.*'); // Допускаем любые символы между словами
}

export function toNaturalPattern(question: string): string {
  const words = question.toLowerCase().replace(/[\.,!?;:()\[\]{}"']/g, '').split(/\s+/);
  return words.map(word => PorterStemmerRu.stem(word)).join(" ");
}