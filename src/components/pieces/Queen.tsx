import Piece from './Piece'
import { wQueen, bQueen } from '../../static/pieceIcons'

export default class Queen extends Piece {
  constructor(player: string) {
    const pieceProps = {
      player: player,
      icon: player === 'white' ? wQueen : bQueen,
    }
    super(pieceProps)
  }

  isMovePossible(src: number, dest: number) {
    let mod = src % 8
    let diff = 8 - mod

    return (
      Math.abs(src - dest) % 9 === 0 ||
      Math.abs(src - dest) % 7 === 0 ||
      Math.abs(src - dest) % 8 === 0 ||
      (dest >= src - mod && dest < src + diff)
    )
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
    if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8
      pathStart += 8
    } else if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9
      pathStart += 9
    } else if (Math.abs(src - dest) % 7 === 0) {
      incrementBy = 7
      pathStart += 7
    } else {
      incrementBy = 1
      pathStart += 1
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i)
    }
    return path
  }
}