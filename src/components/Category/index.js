import React from 'react'
import { Anchor, Image } from './styles'
const DEFAULT_IMAGE = 'https://play.nintendo.com/images/Masthead_Kirby.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png'

export const Category = ( {cover = DEFAULT_IMAGE, path, emoji = '?'}) => (
  <Anchor href={path}>
    <Image src={cover} />
    {emoji}
  </Anchor>
)