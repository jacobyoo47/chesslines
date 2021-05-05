import Piece from './Piece'
import { wKnight, bKnight } from '../../static/pieceIcons'
import { PieceTypes } from '../../static/pieceDragTypes'

export default class Knight extends Piece {
  constructor(player: string) {
    const pieceProps = {
      player: player,
      icon: player === 'white' ? wKnight : bKnight,
      name: player === 'white' ? 'N' : 'n',
      dragType: PieceTypes.KNIGHT, 
    }
    super(pieceProps)
  }

  isMovePossible(src: number, dest: number){
    return (src - 17 === dest || 
      src - 10 === dest || 
      src + 6 === dest || 
      src + 15 === dest || 
      src - 15 === dest || 
      src - 6 === dest || 
      src + 10 === dest || 
      src + 17 === dest);
  }

  // Knight jumps over pieces.
  getSrcToDestPath(){
    return [];
  }
}