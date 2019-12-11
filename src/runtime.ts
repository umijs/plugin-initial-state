import React from 'react';
import { DIR_NAME } from './constants';

export function rootContainer(container: React.ReactNode) {
  return React.createElement(
    require(`@tmp/${DIR_NAME}/Provider`).default,
    null,
    container,
  );
}