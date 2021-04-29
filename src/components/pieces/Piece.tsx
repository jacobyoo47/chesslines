interface pieceProps {
  player: string
  icon: string
  name: string
}

export default class Piece {
  player: string
  iconUrl: string
  name: string

  constructor({ player, icon, name }: pieceProps) {
    this.player = player
    this.iconUrl = icon
    // this.iconUrl = "url('" + icon + "')"
    this.name = name
  }

  isMovePossible(src: number, dest: number, isDestEnemyOccupied: boolean) {
    return false
  }
  getSrcToDestPath(src: number, dest: number) {
    return [0]
  }

  displayPiece() {
    return <img src={this.iconUrl} alt="test" width="100%" height="100%" />
  }
}
