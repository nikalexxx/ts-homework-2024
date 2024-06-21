import { segmentCodes } from './model';
export function isKnownChar(char) {
  return char in segmentCodes;
}
export function charToDisplay(char, options) {
  if (options?.convertToUpperCase) {
    char = char.toUpperCase();
  }
  if (!isKnownChar(char)) {
    if (options?.unknownChar === 'exception') {
      throw new Error(`Cannot convert character ${char} to 14-segment display`);
    }
    return options?.unknownChar ?? [];
  }
  return segmentCodes[char];
}
export function stringToDisplay(input, options) {
  return [...input].map(c => charToDisplay(c, options));
}
export function stringToDisplayArea(input, options) {
  return input.split('\n').map(line => stringToDisplay(line, options));
}
