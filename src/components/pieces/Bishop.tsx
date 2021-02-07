import Piece from './Piece'
import { wBishop, bBishop } from '../../static/pieceIcons'

export default class Bishop extends Piece {
  constructor(player: string) {
    const pieceProps = {
      player: player,
      icon: player === 'white' ? wBishop : bBishop,
    }
    super(pieceProps)
  }

  isMovePossible(src: number, dest: number) {
    return Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0
  }

  getSrcToDestPath(src: number, dest: number) {
    let path = [],
      pathStart,
      pathEnd,
      incrementBy
    if (src > dest) {
      pathStart = dest
      pathEnd = src
    } else {
      pathStart = src
      pathEnd = dest
    }
    if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9
      pathStart += 9
    } else {
      incrementBy = 7
      pathStart += 7
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i)
    }
    return path
  }
}
