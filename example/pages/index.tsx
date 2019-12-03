import React from 'react';
import { useModel } from 'umi';

export default () => {
  const init = useModel('@@initialState');
  return (<>
    <div>
      {
        init.loading ? 'loading' : <>name: {(init.info || {}).name}</>
      }
    </div>
    <button onClick={init.refresh}>refresh</button>
  </>);
}
