import Piece from './Piece'
import { wPawn, bPawn } from '../../static/pieceIcons'

const wPawnInitial = [48,49,50,51,52,53,54,55]
const bPawnInitial = [8,9,10,11,12,13,14,15]

export default class Pawn extends Piece {
  constructor(player: string) {
    const pieceProps = {
      player: player,
      icon: player === 'white' ? wPawn : bPawn,
    }
    super(pieceProps)
  }

  isMovePossible(src: number, dest: number, isDestEnemyOccupied: boolean) {
    if (this.player === 'white') {
      if (
        (dest === src - 8 && !isDestEnemyOccupied) ||
        (dest === src - 16 && src in wPawnInitial)
      ) {
        return true
      } else if (
        isDestEnemyOccupied &&
        (dest === src - 9 || dest === src - 7)
      ) {
        return true
      }
    } else if (this.player === 'black') {
      if (
        (dest === src + 8 && !isDestEnemyOccupied) ||
        (dest === src + 16 && src in bPawnInitial)
      ) {
        return true
      } else if (
        isDestEnemyOccupied &&
        (dest === src + 9 || dest === src + 7)
      ) {
        return true
      }
    }
    return false
  }

  getSrcToDestPath(src: number, dest: number) {
    if (dest === src - 16) {
      return [src - 8]
    } else if (dest === src + 16) {
      return [src + 8]
    }
    return []
  }
}
