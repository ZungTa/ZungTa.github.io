---
title: Gatsby Post 날짜 요일 표시하기
date: 2021-09-07 22:09:27
category: gatsby
thumbnail: { thumbnailSrc }
draft: false
---

템플릿 [https://github.com/JaeYeopHan/gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee) 기준으로 포스트의 날짜 표시 부분을 변경하였다.

기존에 `September 07, 2021`같은 형식으로 뜨던 날짜 표시를 `2021-09-07 화요일`와 같이 뜨게 변경하였다.

`src/template/blog-post.js`에서 `graphql`쿼리 부분에서 `date`의 `formatString`을 변경한다.

```graphql{2}
- date(formatString: "MMMM DD, YYYY")
+ date(formatString: "YYYY-MM-DD")
```

`src/constants/enum.js`에 `WEEK`변수를 추가해준다.

```jsx
export const WEEK = ['일', '월', '화', '수', '목', '금', '토'].map(item => item + "요일");
```

`src/components/post-date/index.jsx`에서 표시 내용을 변경해준다.

```jsx{8}
import React from 'react'
import { WEEK as week } from '../../constants';

import './index.scss'

export const PostDate = ({ date }) => {
-	return <p className="post-date">{date}</p>
+ return <p className="post-date">{`${date} ${week[new Date(date).getDay()]}`}</p>
}
```