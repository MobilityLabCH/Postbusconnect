import { terser } from '@rollup/plugin-terser';

export default {
  input: 'src/postbus-widget.js',
  output: {
    file: 'dist/postbus-widget.min.js',
    format: 'iife',
    name: 'PostBusWidget'
  },
  plugins: [terser()]
};
