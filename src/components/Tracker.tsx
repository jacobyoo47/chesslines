import Chess from './Chess'

interface trackerProps {
  moveNameList: Array<string>
  moveList: Array<Chess>,
  selectedMove: number,
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

  getMoveNameList() {
    return this.moveNameList.slice()
  }

  getMoveList() {
    return this.moveList.slice()
  }
}