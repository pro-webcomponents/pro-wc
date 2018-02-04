exports.config = {
  namespace: 'ProWC',
  bundles: [],
  generateDistribution: true,
  generateWWW: false,
  preamble: '(C) Pro WebComponents - MIT License',
};

exports.devServer = {
  root: '.',
  watchGlob: ['dist/*.*', 'dist/ProWC/**/**', 'src/**/*.html']
};