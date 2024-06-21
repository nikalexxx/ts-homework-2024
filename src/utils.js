export function clampToLength(state, length) {
  return state.concat(emptyDisplays(Math.max(0, length - state.length))).slice(0, length);
}
export function emptyDisplays(amount) {
  return Array.from({ length: amount }, () => []);
}
export function carryRight(fn, arg) {
  return (...newArgs) => fn(...newArgs, arg);
}
export function randomItem(set) {
  const i = Math.trunc(set.size * Math.random());
  return Array.from(set)[i];
}
