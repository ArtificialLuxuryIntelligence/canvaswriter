const paperDefaults = {
  dimensions: { w: 480, h: 360 },
  lineHeight: 1.1, //not 0
  letterSpacing: 1,
  fontRatio: 2, //not 0
  font: 'Roboto Mono',
  broken: 0.1,
  fontColor: '#121212',
  pageColor: '#f5f5f5',
  randomOpacity: true,
};

const editorDefaults = {
  overwrite: false,
  maxHistory: 5000,
  history: [],
};

const GIFWriterDefaults = {
  //TODO:
  // maxGIFDimensions
  animationSpeed: 0.1,
  historyAnimation: true,
};

export { GIFWriterDefaults, paperDefaults, editorDefaults };
