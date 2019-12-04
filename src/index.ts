import { IApi } from 'umi-types';
import { join } from 'path';
import { readFileSync } from 'fs';
import { parse } from '@babel/parser';
import traverse from "@babel/traverse";

const DIR_NAME = 'plugin-model';
const defaultContent = `import React from 'react';

export default () => {
  console.error('[@umijs/plugin-initial-state]: 检测到 init 插件已经开启，但是未在 app.ts/js 中定义 getInitialInfo 方法');
  return {};
}
`;

export default (api: IApi) => {
  const { paths, findJS } = api;
  // 注册 getInitialInfo 方法
  api.addRuntimePluginKey('getInitialInfo');
  const entryFile = findJS(join(paths.absSrcPath, 'app'));

  if(entryFile){
    api.addPageWatcher([
      entryFile
    ])
  }

  api.onGenerateFiles(()=>{
    // 读取 app.ts/js 文件内容
    let runtimeInit = '';
    try{
      runtimeInit = readFileSync(entryFile!).toString();
    } catch(e) {
      runtimeInit = '';
    }

    try{
      const file = parse(runtimeInit, {
        sourceType: "module",
        plugins: [
          "jsx",
          "typescript"
        ]
      });

      let initStart = 0;
      let initEnd = 0;
      // 复制 getInitialInfo 到 model
      traverse(file, {
        enter(path) {
          if (path.isIdentifier({ name: "getInitialInfo" })) {
            initStart = path.parentPath.parent.start!;
            initEnd = path.parentPath.parent.end!;
            path.stop();
          }
        }
      });
      if(initEnd){
        runtimeInit = runtimeInit.slice(initStart, initEnd);
      }

      if(runtimeInit && initEnd) {
        // 写 initialModel
        api.writeTmpFile(`${DIR_NAME}/init.ts`, `import React, { useState, useEffect } from 'react';
import { Models } from 'umi';

export type InitInfo = Models<'@@init'>;
${runtimeInit}

type ThenArg<T> = T extends Promise<infer U> ? U : T

export default () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ThenArg<ReturnType<typeof getInitialInfo>> | undefined>(undefined);

  const refresh = async() => {
    setLoading(true);
    const asyncFunc = () => new Promise<ReturnType<typeof getInitialInfo>>(res => res(getInitialInfo()));
    const ret = await asyncFunc();
    setData(ret);
    setLoading(false);
  };

  useEffect(()=>{
    refresh();
  }, [])

  return {
    info: data,
    refresh,
    loading,
  }
}
`);
      } else {
        api.writeTmpFile(`${DIR_NAME}/init.ts`, defaultContent);
      }
    } catch(e) {
      api.log.error('[plugin-initial-state]: 入口文件解析失败', e);
    }
  });

  api.writeTmpFile(`${DIR_NAME}/init.ts`, defaultContent);

  api.addUmiExports([
    {
      specifiers: ['InitInfo'],
      source: join(api.paths.absTmpDirPath, DIR_NAME, 'init'),
    },
  ]);

  api.register('addExtraModels', () => [
    {
      absPath: join(paths.absTmpDirPath, `${DIR_NAME}/init.ts`),
      namespace: '@@initialState',
    }
  ]);
}