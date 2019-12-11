import { join } from 'path';

export const DIR_NAME = 'plugin-init';
export const MODEL_NAME = 'initialState';
export const RELATIVE_MODEL = join(DIR_NAME, 'models', MODEL_NAME);
export const RELATIVE_MODEL_PATH = `${RELATIVE_MODEL}.ts`;