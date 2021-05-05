import { useDrag } from 'react-dnd'

export function DisplayPiece(piece: Piece | undefined, coord: number) {
  // Always render useDrag hooks since
  // React requires the same amount of hooks to be rendered at all times
  const [{ isDragging }, drag] = useDrag({
    type: piece?.dragType || 'none',
    item: { coord },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return piece ? (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'grab',
        transform: 'translate(0, 0)',
      }}>
      <img src={piece.iconUrl} alt="test" width="100%" height="100%" />
    </div>
  ) : null
}

interface pieceProps {
  player: string
  icon: string
  name: string
  dragType: string
}

export default class Piece {
  player: string
  iconUrl: string
  name: string
  dragType: string

  constructor({ player, icon, name, dragType }: pieceProps) {
    this.player = player
    this.iconUrl = icon
    // this.iconUrl = "url('" + icon + "')"
    this.name = name
    this.dragType = dragType
  }

  isMovePossible(src: number, dest: number, isDestEnemyOccupied: boolean) {
    return false
  }
  getSrcToDestPath(src: number, dest: number) {
    return [0]
  }
}
