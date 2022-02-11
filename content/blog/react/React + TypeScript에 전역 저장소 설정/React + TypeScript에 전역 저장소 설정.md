---
title: React + TypeScript에 전역 저장소 설정
date: 2021-10-04 15:09:27
category: gatsby
thumbnail: { thumbnailSrc }
draft: false
---

`src` 폴더에 `store` 폴더를 생성하고 `RootStore.tsx` 파일을 생성한다.

```tsx
import React, { createContext, Dispatch, useContext, useReducer } from 'react';

type RootState = {
  count: number; // Sample State
  projectName: string; // Sample State
};

const initialRootState: RootState = {
  count: 0, // Sample State
  projectName: 'project', // Sample State
};

type RootAction =
  | { type: 'defaultType' }
  | { type: 'setCount'; newCount: number } // Sample Action
  | { type: 'setProjectName'; newProjectName: string }; // Sample Action
type RootDispatch = Dispatch<RootAction>;

function rootReducer(state: RootState, action: RootAction): RootState {
  switch (action.type) {
    case 'defaultType':
      return state;
    case 'setCount': // Sample Reducer
      state.count = action.newCount;
      return {
        ...state,
        count: action.newCount,
      };
    case 'setProjectName': // Sample Reducer
      return {
        ...state,
        projectName: action.newProjectName,
      };
    default:
      return state;
  }
}

// default value를 주니까 null check를 할 필요가 없다.
const RootStateContext = createContext<RootState>(initialRootState);
const RootDispatchContext = createContext<RootDispatch>(() => null);

export function RootStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(rootReducer, initialRootState);
  return (
    <RootStateContext.Provider value={state}>
      <RootDispatchContext.Provider value={dispatch}>
        {children}
      </RootDispatchContext.Provider>
    </RootStateContext.Provider>
  );
}

export function useRootState(): RootState {
  return useContext(RootStateContext);
}

export function useRootDispatch(): RootDispatch {
  return useContext(RootDispatchContext);
}
```

```tsx
import { RootStoreProvider } from './store/RootStore';

ReactDOM.render(
  <React.StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

이제 원하는 컴포넌트에서 

`useRootState` 및 `useRootDispatch` 를 `import` 해서 간편하게 사용할 수 있다.

물론 그 전에 `RootStore.tsx` 에서 원하는 `RootState` 및 `RootAction`을 작성해줘야한다.

```tsx
import React, { useEffect } from 'react';
import { useRootDispatch, useRootState } from './store/RootStore';

function App() {
  const rootState = useRootState();
  const rootDispatch = useRootDispatch();

  useEffect(() => {
    setTimeout(() => {
      rootDispatch({
        type: 'setProjectName',
        newProjectName: 'Hello World',
      });
    }, 500);
  }, []);

  return (
    <div>
      Hello, {rootState.projectName} + {rootState.count}
    </div>
  );
}

export default App;
```

### 버전 기준

- react 17.0.2