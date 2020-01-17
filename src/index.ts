import { IApi } from 'umi-types';
import { join, relative } from 'path';
import providerContent from './utils/getProviderContent';
import getModelContent from './utils/getModelContent';
import getExportContent from './utils/getExportContent';
import {
  DIR_NAME,
  RELATIVE_MODEL,
  RELATIVE_MODEL_PATH,
  RELATIVE_EXPORT,
  RELATIVE_EXPORT_PATH,
} from './constants';

export default (api: IApi) => {
  const { paths, findJS } = api;
  // 注册 getInitialState 方法
  api.addRuntimePluginKey('getInitialState');

  api.writeTmpFile(join(DIR_NAME, 'Provider.tsx'), providerContent);

  // Add provider to prevent render
  api.addRuntimePlugin(join(__dirname, './runtime'));

  api.onGenerateFiles(() => {
    const entryFile = findJS(join(paths.absSrcPath, 'app'));
    if (entryFile) {
      const relEntryFile = relative(paths.cwd, entryFile);
      api.writeTmpFile(RELATIVE_MODEL_PATH, getModelContent(relEntryFile));
      api.writeTmpFile(RELATIVE_EXPORT_PATH, getExportContent(RELATIVE_MODEL));
    } else {
      api.log.warn(
        '[@umijs/plugin-initial-state]: 检测到 @umijs/plugin-initial-state 插件已经开启，但是不存在 app.ts/js 入口文件。',
      );
    }
  });

  api.addUmiExports([
    {
      exportAll: true,
      source: api.winPath(join(api.paths.absTmpDirPath, RELATIVE_EXPORT)),
    },
  ]);

  api.register('addExtraModels', () => [
    {
      absPath: join(paths.absTmpDirPath, RELATIVE_MODEL_PATH),
      namespace: '@@initialState',
    },
  ]);
};
