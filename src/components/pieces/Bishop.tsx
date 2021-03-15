import Piece from './Piece'
import convertXY from '../../helpers/pieceHelpers'
import { wBishop, bBishop } from '../../static/pieceIcons'

export default class Bishop extends Piece {
  constructor(player: string) {
    const pieceProps = {
      player: player,
      icon: player === 'white' ? wBishop : bBishop,
      name: player === 'white' ? 'B' : 'b'
    }
    super(pieceProps)
  }

  isMovePossible(src: number, dest: number) {
    const srcCoord = convertXY(src)
    const destCoord = convertXY(dest)
    const diffX = Math.abs(srcCoord[0] - destCoord[0])
    const diffY = Math.abs(srcCoord[1] - destCoord[1])
    return diffX === diffY
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
