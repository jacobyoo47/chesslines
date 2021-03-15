import Piece from './Piece'
import convertXY from '../../helpers/pieceHelpers'
import { wQueen, bQueen } from '../../static/pieceIcons'

export default class Queen extends Piece {
  constructor(player: string) {
    const pieceProps = {
      player: player,
      icon: player === 'white' ? wQueen : bQueen,
      name: player === 'white' ? 'Q' : 'q',
    }
    super(pieceProps)
  }

  isMovePossible(src: number, dest: number) {
    let mod = src % 8
    let diff = 8 - mod

    const srcCoord = convertXY(src)
    const destCoord = convertXY(dest)
    const diffX = Math.abs(srcCoord[0] - destCoord[0])
    const diffY = Math.abs(srcCoord[1] - destCoord[1])

    return (
      diffX == diffY ||
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
