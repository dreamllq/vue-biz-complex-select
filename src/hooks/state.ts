import { createInjectionState } from '@vueuse/core';

const [useProvideSelectState, useSelectState] = createInjectionState((props) => {
  console.log(props);
  
  return { props };
});

export {
  useProvideSelectState,
  useSelectState
};