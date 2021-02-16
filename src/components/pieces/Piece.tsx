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

  isMovePossible(src: number, dest: number, isDestEnemyOccupied: boolean) {
    return false
  }
  getSrcToDestPath(src: number, dest: number) {
    return [0]
  }
}
