import Piece from './Piece'
import { wKing, bKing } from '../../static/pieceIcons'

export default class King extends Piece {
  constructor(player: string) {
    const pieceProps = {
      player: player,
      icon: player === 'white' ? wKing : bKing,
      name: player === 'white' ? 'K' : 'k',
    }
    super(pieceProps)
  }

  isMovePossible(src: number, dest: number) {
    return (
      src - 9 === dest ||
      src - 8 === dest ||
      src - 7 === dest ||
      src + 1 === dest ||
      src + 9 === dest ||
      src + 8 === dest ||
      src + 7 === dest ||
      src - 1 === dest
    )
  }

  // Path is always empty EXCEPT when castling
  getSrcToDestPath(src: number, dest: number) {
    const diff = Math.abs(src - dest)
    const increment = src > dest ? -1 : 1
    if (diff === 2) {
      const path = []
      let start = src + increment
      while (start !== dest) {
        path.push(start)
        start += increment
      }
      console.log(path)
      return path
    } else {
      return []
    }
  }
}
