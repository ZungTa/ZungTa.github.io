---
title: React + Typescript에 i18n 적용
date: 2021-10-04 15:09:27
category: gatsby
thumbnail: { thumbnailSrc }
draft: false
---

`i18next`와 `react-i18next`를 설치해준다.

```bash
npm i i18next react-i18next
```

`src/config` 폴더에 `lang` 폴더를 만들고 `i18n.ts` `react-i18next.d.ts` 파일과 `locales` 폴더를 만들어준다.

```tsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from './locales/ko';
import en from './locales/en';

export const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  fallbackLng: 'ko',
  debug: true,
  keySeparator: '.', // default value
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
});

export default i18n;
```

```tsx
// import the original type declarations
import 'react-i18next';
// import all namespaces (for the default language, only)
import { resources } from './i18n';

declare module 'react-i18next' {
	type DefaultResources = typeof resources['ko'] & typeof resources['en'];
  interface Resources extends DefaultResources { }
}
```

`locales` 폴더 안에 언어별로 ts 파일을 생성해준다.

```tsx
// ko 예시
const lang = {
	name: 'ZungTa',
}
export default lang;
```

`index.tsx`에서 `i18n.ts` 를 import 해준다.

```tsx
...
import '@/config/lang/i18n';
...
```

이제 원하는 컴포넌트에서 `useTranslation`을 임포트해서 에디터의 지원을 받으며 편하게 사용할 수 있다.

```tsx
...
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div css={appCss}>
      Hello {t('name')}
    </div>
  );
}

export default App;
```

### 버전 기준

- "react": "^17.0.2"
- "i18next": "^20.2.2"
- "react-i18next": "^11.8.15"