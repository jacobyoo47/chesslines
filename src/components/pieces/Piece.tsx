import React from 'react'

interface pieceProps {
  player: string
  icon: string
}

export default class Piece {
  player: string
  iconUrl: string

  constructor({ player, icon }: pieceProps) {
    this.player = player
    this.iconUrl = "url('" + icon + "')"
  }
}
