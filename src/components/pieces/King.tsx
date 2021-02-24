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

  // Path is always empty since King moves by only one square
  getSrcToDestPath(src: number, dest: number) {
    return []
  }
}
