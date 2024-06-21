import {
  checkNonNullable,
  imageCreator,
  makeDisplays,
  updateDisplayBlock,
  updateDisplay,
  initAnimation,
  layerByLayer,
  segmentBySegment,
  transition,
  charToDisplay,
  stringToDisplay,
  getDefaultAnimations,
  getDefaultAnimationsWrappers,
} from '../src';
const domOptions = {
  className: 'display',
  templateId: 'segmentImage',
};
const getImage = imageCreator('segmentImage');
checkNonNullable(getImage);
const startAnimation = initAnimation(domOptions);
const defaultAnimations = getDefaultAnimations(startAnimation);
const segmentDescription = document.getElementById('segmentDescription');
segmentDescription.append(getImage());
const [descriptionDisplay] = makeDisplays(1, segmentDescription, domOptions);
updateDisplay('abcdefhijklm'.split('').concat(['g1', 'g2']), descriptionDisplay);
const oneLetter = document.getElementById('oneLetter');
const oneLetterImage = document.getElementById('oneLetterImage');
oneLetter.oninput = function (event) {
  const letter = event.target.value[0] || ' ';
  oneLetterImage.innerHTML = '';
  oneLetterImage.append(getImage());
  updateDisplay(
    charToDisplay(letter, { convertToUpperCase: true }),
    document.querySelector('#oneLetterImage .display'),
  );
};
const textString = document.getElementById('textString');
const textStringImage = document.getElementById('textStringImage');
textString.oninput = function (event) {
  const text = event.target.value;
  const segments = stringToDisplay(text, { convertToUpperCase: true });
  updateDisplayBlock(segments, textStringImage, domOptions);
};
const startMarquee = document.getElementById('startMarquee');
const startBlink = document.getElementById('startBlink');
const startTyping = document.getElementById('startTyping');
const startMix = document.getElementById('startMix');
const transitionImage = document.getElementById('transitionImage');
const animationFromString = document.getElementById('animationFromString');
const animationToString = document.getElementById('animationToString');
const animationsWrappers = getDefaultAnimationsWrappers(defaultAnimations, textStringImage, textString);
startMarquee.addEventListener('click', () => animationsWrappers.marquee());
startBlink.addEventListener('click', () => animationsWrappers.blink());
startTyping.addEventListener('click', () => animationsWrappers.typing());
startMix.addEventListener('click', () => animationsWrappers.mix());
function startTransition(transitionFunction, transitionOptions) {
  const from = stringToDisplay(animationFromString.value, { convertToUpperCase: true });
  const to = stringToDisplay(animationToString.value, { convertToUpperCase: true });
  const frames = transition(from, to, transitionFunction, transitionOptions);
  startAnimation(frames, transitionImage);
}
const startTransitionSegmentBySegment = document.getElementById('startTransitionSegmentBySegment');
const startTransitionLayerByLayer = document.getElementById('startTransitionLayerByLayer');
const segmentBySegmentDense = document.getElementById('segmentBySegmentDense');
startTransitionSegmentBySegment.onclick = function (event) {
  startTransition(segmentBySegment, { dense: segmentBySegmentDense.checked });
};
startTransitionLayerByLayer.onclick = function (event) {
  startTransition(layerByLayer);
};
