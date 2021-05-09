import { useCallback, useState } from 'react';

const useForceUpdate = () => {
  const [, updateState]: [any, any] = useState();
  return useCallback(() => updateState({}), []);
};
export { useForceUpdate };
