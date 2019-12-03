# @umijs/plugin-initial-state

[![codecov](https://codecov.io/gh/umijs/plugin-model/branch/master/graph/badge.svg)](https://codecov.io/gh/umijs/plugin-initial-state)
[![NPM version](https://img.shields.io/npm/v/@umijs/plugin-model.svg?style=flat)](https://npmjs.org/package/@umijs/plugin-initial-state)
[![CircleCI](https://circleci.com/gh/umijs/plugin-model/tree/master.svg?style=svg)](https://circleci.com/gh/umijs/plugin-initial-state/tree/master)
[![GitHub Actions status](https://github.com/umijs/plugin-model/workflows/Node%20CI/badge.svg)](https://github.com/umijs/plugin-initial-state)
[![NPM downloads](http://img.shields.io/npm/dm/@umijs/plugin-model.svg?style=flat)](https://npmjs.org/package/@umijs/plugin-initial-state)

umi plugin to store initial state globally.

## Install

```bash
# or yarn
$ npm install
```

## Usage

Getting started in 3 steps.

### 1. Configure in `.umirc.js`

```js
export default {
  plugins: [['@umijs/plugin-initial-state', options]],
};
```

### 2. Add getInitialInfo into entry file

```js
// src/app.ts
import { useState } from 'react';

export const getInitialInfo = () => {
  return 'Hello World';
}
```

### 3. Use it in your React Component or other models

```js
import React from 'react';
import { useModel } from 'umi';

export default () => {
  const state = useModel('@@initialState');
  return <>{ state }</>;
};
```

Full example can find in [./example](https://github.com/umijs/plugin-initial-state/tree/master/example).

## LICENSE

MIT
