[English](./README.md) | 中文文档

# @umijs/plugin-initial-state

[![codecov](https://codecov.io/gh/umijs/plugin-initial-state/branch/master/graph/badge.svg)](https://codecov.io/gh/umijs/plugin-initial-state)
[![NPM version](https://img.shields.io/npm/v/@umijs/plugin-initial-state.svg?style=flat)](https://npmjs.org/package/@umijs/plugin-initial-state)
[![CircleCI](https://circleci.com/gh/umijs/plugin-initial-state/tree/master.svg?style=svg)](https://circleci.com/gh/umijs/plugin-initial-state/tree/master)
[![GitHub Actions status](https://github.com/umijs/plugin-initial-state/workflows/Node%20CI/badge.svg)](https://github.com/umijs/plugin-initial-state)
[![NPM downloads](http://img.shields.io/npm/dm/@umijs/plugin-initial-state.svg?style=flat)](https://npmjs.org/package/@umijs/plugin-initial-state)

在全局中注册初始化信息的 umi plugin.

## 安装

```bash
# or yarn
$ npm install @umijs/plugin-initial-state --save
```

## 用法

3 步开始使用 @umijs/plugin-initial-state

### 1. 在 `.umirc.js` 中配置

```js
export default {
  plugins: [['@umijs/plugin-initial-state', options]],
};
```

### 2. 在 `src/app.ts` 中配置 getInitialState 方法

```js
export async function getInitialState() {
  return 'Hello World';
}
```

### 3. 在 React 组件或其他 Model 中使用 initialState

```js
import React from 'react';
import { useModel } from 'umi';

export default () => {
  const { initialState, loading, refresh } = useModel('@@initialState');
  return <>{ loading ? 'loading...' : initialState }</>;
};
```

完整例子可参考 [./example](https://github.com/umijs/plugin-initial-state/tree/master/example).

## LICENSE

MIT
