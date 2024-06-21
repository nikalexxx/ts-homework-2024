import { clampToLength, emptyDisplays, randomItem } from './utils';
import { stringToDisplay } from './view';
const DEFAULT_VIEW_OPTIONS = { convertToUpperCase: true };
export function marquee(input, displayAmount = input.length, options = DEFAULT_VIEW_OPTIONS) {
  const frames = [];
  for (let i = displayAmount - 1; i >= Math.min(0, displayAmount - input.length); i -= 1) {
    const leftPad = Math.max(0, i);
    const inputStart = Math.max(0, -i);
    const visibleLength = displayAmount - leftPad;
    const visiblePart = input.slice(inputStart, inputStart + visibleLength);
    const rightPad = Math.max(0, displayAmount - leftPad - visiblePart.length);
    frames.push([...emptyDisplays(leftPad), ...stringToDisplay(visiblePart, options), ...emptyDisplays(rightPad)]);
  }
  return frames;
}
export function blink(input, counts = 10, options = DEFAULT_VIEW_OPTIONS) {
  const frames = [];
  const empty = emptyDisplays(input.length);
  const text = stringToDisplay(input, options);
  for (let i = 0; i < counts; i++) {
    frames.push(i % 2 ? text : empty);
  }
  return frames;
}
export function typing(input, options = DEFAULT_VIEW_OPTIONS) {
  const frames = [];
  const text = stringToDisplay(input, options);
  for (let i = 0; i < input.length; i++) {
    frames.push(clampToLength(text.slice(0, i + 1), input.length));
  }
  return frames;
}
export function mix(input, options = DEFAULT_VIEW_OPTIONS) {
  const frames = [];
  const text = stringToDisplay(input, options);
  const indexes = new Set(Array.from({ length: input.length }, (_, i) => i));
  const indexList = new Array(input.length).map(() => false);
  for (let i = 0; i < input.length; i++) {
    const index = randomItem(indexes);
    indexList[index] = true;
    frames.push(text.map((state, k) => (indexList[k] ? state : [])));
    indexes.delete(index);
  }
  return frames;
}
