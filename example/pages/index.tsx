import React from 'react';
import { useModel } from 'umi';

export default () => {
  const { initialState = {}, loading, refresh } = useModel('@@initialState');
  return (<>
    <div>
      {
        loading ? 'loading' : <>name: {initialState.name}</>
      }
    </div>
    <button onClick={refresh}>refresh</button>
  </>);
}
