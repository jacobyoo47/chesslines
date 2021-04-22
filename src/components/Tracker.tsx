import Chess from './Chess'

interface trackerProps {
  moveNameList: Array<string>
  moveList: Array<Chess>
  selectedMove: number
}

/**
 * Object that represents the current state of the move tracker
 */
export default class Tracker {
  moveNameList: Array<string>
  moveList: Array<Chess>
  selectedMove: number

  constructor(state: trackerProps) {
    this.moveNameList = state.moveNameList
    this.moveList = state.moveList
    this.selectedMove = state.selectedMove
  }

  getMoveNameList(index = -1) {
    return index > -1
      ? this.moveNameList.slice(0, index)
      : this.moveNameList.slice()
  }

  getMoveList(index = -1) {
    return index > -1
      ? this.moveList.slice(0, index + 1)
      : this.moveList.slice()
  }
}
