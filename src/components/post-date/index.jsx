import React from 'react'
import { WEEK as week } from '../../constants';

import './index.scss'

export const PostDate = ({ date }) => {
  return <p className="post-date">{`${date} ${week[new Date(date).getDay()]}`}</p>
}
