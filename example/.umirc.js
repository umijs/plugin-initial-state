import { join } from 'path';

export default {
  singular: false,
  plugins: [
    ['@umijs/plugin-model'],
    [join(__dirname, '..', require('../package').main || 'index.js')],
  ],
}
