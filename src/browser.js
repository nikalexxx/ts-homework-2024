import { blink, marquee, mix, typing } from './effects';
import { segmentNames } from './model';
import { carryRight } from './utils';
export function isElement(element) {
  return element.nodeType === 1;
}
export function isTemplateNode(element) {
  return isElement(element) && element.nodeName === 'TEMPLATE';
}
export function imageCreator(templateId) {
  const templateElement = document.getElementById(templateId);
  if (!templateElement) return null;
  if (!isTemplateNode(templateElement)) return null;
  const clone = () => templateElement.content.cloneNode(true);
  return clone;
}
export function checkNonNullable(value) {
  if (value === null) {
    throw new Error('value is null');
  }
}
export function makeDisplays(amount, parentElement, domOptions) {
  const displays = [...parentElement.querySelectorAll(`.${domOptions.className}`)];
  for (let i = displays.length - 1; i >= amount; i -= 1) {
    displays[i].remove();
    displays.pop();
  }
  const getImage = imageCreator(domOptions.templateId);
  while (getImage && displays.length < amount) {
    const display = getImage();
    parentElement.append(display);
    const last = parentElement.lastChild;
    if (last && isElement(last)) displays.push(last);
  }
  return displays;
}
export function updateDisplay(segments, display) {
  for (const segmentName of segmentNames) {
    display.classList.remove(segmentName);
  }
  for (const segmentName of segments) {
    display.classList.add(segmentName);
  }
}
export function updateDisplayBlock(segments, parentElement, domOptions) {
  const displays = makeDisplays(segments.length, parentElement, domOptions);
  segments.forEach((segment, i) => {
    updateDisplay(segment, displays[i]);
  });
}
function startAnimationBuilder(frameBuffers) {
  return function start(frames, parent) {
    frameBuffers.set(parent, [...frames].reverse());
  };
}
export function initAnimation(domOptions) {
  const frameDelay = 100;
  const frameBuffers = new Map();
  function animateFrame() {
    for (const [parent, frameBuffer] of frameBuffers) {
      if (frameBuffer.length) {
        const block = frameBuffer.pop();
        if (!block) return;
        updateDisplayBlock(block, parent, domOptions);
      } else {
        frameBuffers.delete(parent);
      }
    }
  }
  setInterval(animateFrame, frameDelay);
  return startAnimationBuilder(frameBuffers);
}
export function animateTyping(text, element, start) {
  const frames = typing(text, { convertToUpperCase: true });
  start(frames, element);
}
export function animateBlink(text, element, start) {
  const frames = blink(text, 12);
  start(frames, element);
}
export function animateMarquee(text, element, start) {
  const frames = marquee(text);
  start(frames, element);
}
export function animateMix(text, element, start) {
  const frames = mix(text);
  start(frames, element);
}
export function getDefaultAnimations(start) {
  return {
    typing: carryRight(animateTyping, start),
    blink: carryRight(animateBlink, start),
    marquee: carryRight(animateMarquee, start),
    mix: carryRight(animateMix, start),
  };
}
export function getDefaultAnimationsWrappers(animations, target, input) {
  return {
    typing: () => carryRight(animations.typing, target)(input.value),
    blink: () => carryRight(animations.blink, target)(input.value),
    marquee: () => carryRight(animations.marquee, target)(input.value),
    mix: () => carryRight(animations.mix, target)(input.value),
  };
}
