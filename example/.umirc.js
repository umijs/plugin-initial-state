import { join } from 'path';

export default {
  plugins: [
    ['@umijs/plugin-model'],
    [join(__dirname, '..', require('../package').main || 'index.js')],
  ],
}
