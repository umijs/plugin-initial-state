import { IApi } from 'umi-types';
import { join, relative } from 'path';

const DIR_NAME = 'plugin-model';
const MODEL_NAME = 'initialState';
const RELATIVE_MODEL = `${DIR_NAME}/models/${MODEL_NAME}`;
const RELATIVE_MODEL_PATH = `${RELATIVE_MODEL}.ts`;

export default (api: IApi) => {
  const { paths, findJS } = api;
  // 注册 getInitialState 方法
  api.addRuntimePluginKey('getInitialState');

  api.onGenerateFiles(()=>{
    const entryFile = findJS(join(paths.absSrcPath, 'app'));
    if (entryFile) {
      const relEntryFile = relative(paths.cwd, entryFile);
      api.writeTmpFile(RELATIVE_MODEL_PATH, `import { useState, useEffect } from 'react';
import { Models } from 'umi';
import * as app from '@/app';

export type InitialState = Models<'@@initialState'>;
async function getInitialState() {
  if (!app.getInitialState) {
    throw new Error('getInitialState is not defined in ${relEntryFile}');
  }
  return await app.getInitialState();
}

type ThenArg<T> = T extends Promise<infer U> ? U : T

export default () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ThenArg<ReturnType<typeof getInitialState>> | undefined>(undefined);

  const refresh = async() => {
    setLoading(true);
    const asyncFunc = () => new Promise<ReturnType<typeof getInitialState>>(res => res(getInitialState()));
    const ret = await asyncFunc();
    setData(ret);
    setLoading(false);
  };

  useEffect(()=>{
    refresh();
  }, []);

  return {
    initialState: data,
    refresh,
    loading,
  }
}
`);
    } else {
      api.writeTmpFile(RELATIVE_MODEL_PATH, `import React from 'react';

export default () => {
  console.error('[@umijs/plugin-initial-state]: 检测到 @umijs/plugin-initial-state 插件已经开启，但是未在 app.ts/js 中定义 getInitialState 方法。');
  return {};
}
`);
    }
  });

  api.addUmiExports([
    {
      specifiers: ['InitialState'],
      source: join(api.paths.absTmpDirPath, RELATIVE_MODEL),
    },
  ]);

  api.register('addExtraModels', () => [
    {
      absPath: join(paths.absTmpDirPath, RELATIVE_MODEL_PATH),
      namespace: '@@initialState',
    }
  ]);
}
