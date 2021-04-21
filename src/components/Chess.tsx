import Piece from './pieces/Piece'
import King from './pieces/King'
import Queen from './pieces/Queen'
import Bishop from './pieces/Bishop'
import Knight from './pieces/Knight'
import Rook from './pieces/Rook'
import Pawn from './pieces/Pawn'

export const getFenPosition = (fen: string): Chess => {
  const squares = Array<Piece | undefined>(64).fill(undefined)
  const fenList = fen.split(' ')
  const position = fenList[0].split('')
  const playerTurn = fenList[1]
  const fenCastling = fenList[2]
  // const enPassant = fenList[3]
  // const halfMoves = fenList[4]
  const fullMoves = fenList[5]
  const reUpper = /[A-Z]/
  let wKing = 0
  let bKing = 0

  let i = 0
  let j = 0
  // Parse fen string position
  while (i < 64) {
    const curr = position[j]
    const player = reUpper.test(curr) ? 'white' : 'black'
    switch (curr.toLowerCase()) {
      case 'r': {
        squares[i] = new Rook(player)
        i += 1
        break
      }
      case 'n': {
        squares[i] = new Knight(player)
        i += 1
        break
      }
      case 'b': {
        squares[i] = new Bishop(player)
        i += 1
        break
      }
      case 'k': {
        squares[i] = new King(player)
        if (player === 'white') {
          wKing = i
        } else {
          bKing = i
        }
        i += 1
        break
      }
      case 'q': {
        squares[i] = new Queen(player)
        i += 1
        break
      }
      case 'p': {
        squares[i] = new Pawn(player)
        i += 1
        break
      }
      default: {
        if (curr >= '0' && curr <= '8') {
          i += parseInt(curr)
        }
        break
      }
    }
    j += 1
  }

  // Parse fen castling
  const castling = [false, false, false, false]
  if (fenCastling !== '-') {
    for (let i = 0; i < fenCastling.length; i++) {
      const curr = fenCastling[i]
      if (curr === 'Q') castling[0] = true
      if (curr === 'K') castling[1] = true
      if (curr === 'q') castling[2] = true
      if (curr === 'k') castling[3] = true
    }
  }

  return new Chess({
    squares: squares,
    kingPos: [wKing, bKing],
    player: playerTurn === 'w' ? 'white' : 'black',
    sourceSelection: -1,
    status: 'default',
    lastMove: new Array<number>(),
    selectedMove: -1,
    castling: castling,
    moveNo: parseInt(fullMoves),
    moveList: new Array<string>(),
    fallenPieces: new Array<string>(),
  })
}

interface chessProps {
  squares: (Piece | undefined)[]
  kingPos: Array<number>
  player: string
  sourceSelection: number
  status: string
  lastMove: Array<number>
  selectedMove: number,
  castling: Array<boolean>
  moveNo: number
  moveList: Array<string>
  fallenPieces: Array<string>
}

/**
 * Handles current state of chess board and helpful methods related to chess rule logic.
 * Does not modify current state; state set by useState hook in Board.tsx
 */
export default class Chess {
  squares: (Piece | undefined)[]
  kingPos: Array<number>
  player: string
  sourceSelection: number
  status: string
  lastMove: Array<number>
  selectedMove: number
  castling: Array<boolean>
  moveNo: number
  moveList: Array<string>
  fallenPieces: Array<string>

  constructor(state: chessProps) {
    this.squares = state.squares
    this.kingPos = state.kingPos
    this.player = state.player
    this.sourceSelection = state.sourceSelection
    this.status = state.status
    this.lastMove = state.lastMove
    this.selectedMove = state.selectedMove
    this.castling = state.castling
    this.moveNo = state.moveNo
    this.moveList = state.moveList
    this.fallenPieces = state.fallenPieces
  }

  getSquares() {
    return this.squares.slice()
  }

  getCastling() {
    return this.castling.slice()
  }

  getFallenPieces() {
    return this.fallenPieces.slice()
  }

  getMoveList() {
    return this.moveList.slice()
  }

  /**
   * Gets the movename for move tracker
   */
  getMoveName(
    pieceName: string,
    captured: boolean,
    castled: string,
    checked: boolean,
    source: number,
    dest: number,
  ) {
    if (castled !== '') {
      if (castled === 'short') {
        return '0-0'
      } else {
        return '0-0-0'
      }
    }

    let res = ''

    // const srcRowName = (8 - Math.floor(source / 8)).toString()
    const srcFileName = String.fromCharCode(97 + (source % 8))
    const destRowName = (8 - Math.floor(dest / 8)).toString()
    const destFileName = String.fromCharCode(97 + (dest % 8))

    if (pieceName.toLowerCase() !== 'p') {
      res += pieceName.toUpperCase()
    } else if (captured) {
      res += srcFileName
    }

    const destPos = destFileName + destRowName

    if (captured) res += 'x'

    res += destPos

    if (checked) res += '+'

    return res
  }

  isWhiteTurn() {
    return this.player === 'white'
  }

  /**
   * Check all path indices are undefined. For one steps move of pawn/others or jumping moves of knight array is empty, so move is legal.
   * @param  {[number]}  srcToDestPath [array of board indices comprising path between src and dest ]
   * @return {Boolean}
   */
  isMoveClear(squares: Array<Piece | undefined>, srcToDestPath: number[]) {
    // Check for pieces blocking path
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (squares[srcToDestPath[i]] !== undefined) {
        return false
      }
    }
    return true
  }

  isCheck(squares: Array<Piece | undefined>, kingPos: number, player: string) {
    let res = false
    squares.forEach((p, i) => {
      if (p && p.player !== player) {
        if (
          p.isMovePossible(i, kingPos, true) &&
          this.isMoveClear(squares, p.getSrcToDestPath(i, kingPos))
        ) {
          console.log('found')
          console.log(p.getSrcToDestPath(i, kingPos))
          res = true
        }
      }
    })
    return res
  }

  inRange(x: number, y: number, i: number) {
    return i >= x && i <= y
  }

  isEnPassant(piece: Piece | undefined, pos: number, dest: number) {
    if (piece?.name.toLowerCase() !== 'p') {
      return false
    }
    const p = this.isWhiteTurn() ? 1 : -1
    const enemyPawn = this.squares[dest + 8 * p]
    const enemyColor = this.isWhiteTurn() ? 'p' : 'P'
    const pJump = this.isWhiteTurn() ? 0 : 40
    const enemyJumped =
      this.inRange(8 + pJump, 15 + pJump, this.lastMove[0]) &&
      this.lastMove[0] === this.lastMove[1] - 16 * p

    if (
      (dest === pos - 9 * p || dest === pos - 7 * p) &&
      enemyPawn?.name === enemyColor &&
      enemyJumped
    ) {
      return true
    }

    return false
  }

  /**
   * Check if the move being played is castles
   */
  isCastles(piece: Piece | undefined, dest: number) {
    if (piece?.name.toLowerCase() !== 'k') {
      return false
    }

    const isWhite = this.isWhiteTurn()

    const castleShort = isWhite ? this.castling[1] : this.castling[3]
    const castleLong = isWhite ? this.castling[0] : this.castling[2]

    if (isWhite) {
      if ((castleShort && dest === 62) || (castleLong && dest === 58)) {
        return true
      }
    } else {
      if ((castleShort && dest === 6) || (castleLong && dest === 2)) {
        return true
      }
    }

    return false
  }

  /**
   * Simulates a move and checks if it puts the current player's king in check
   */
  isKingInCheck(dest: number) {
    // Check for checks -- simulate move
    const checkSquares = this.getSquares()
    // Get new kingPos if we're moving the king
    let tempKingPos
    if (checkSquares[this.sourceSelection]?.name.toLowerCase() === 'k') {
      tempKingPos = dest
    } else {
      tempKingPos = this.isWhiteTurn() ? this.kingPos[0] : this.kingPos[1]
    }
    checkSquares[dest] = checkSquares[this.sourceSelection]
    checkSquares[this.sourceSelection] = undefined

    if (this.isCheck(checkSquares, tempKingPos, this.player)) {
      console.log('cant move due to check')
      return true
    }

    return false
  }

  /**
   * Check that move is not blocked (isMoveClear) and does not put own king in check.
   */
  isMoveLegal(srcToDestPath: number[], dest: number, castles: boolean) {
    if (!this.isMoveClear(this.squares, srcToDestPath)) {
      return false
    }

    if (castles) {
      const currKingPos = this.isWhiteTurn() ? this.kingPos[0] : this.kingPos[1]

      // Check that king is not currently in check
      if (this.isCheck(this.squares, currKingPos, this.player)) {
        return false
      }

      // Check that there are no checks blocking castles
      const castleDirection = dest === 2 || dest === 58
      const pathEnd = castleDirection ? dest - 1 : dest
      if (castleDirection) {
        for (let i = this.sourceSelection; i > pathEnd; i -= 1) {
          if (this.isKingInCheck(i)) {
            return false
          }
        }
      } else {
        for (let i = this.sourceSelection; i < pathEnd; i += 1) {
          if (this.isKingInCheck(i)) {
            return false
          }
        }
      }
    }

    // Check that move does not put king in check
    return !this.isKingInCheck(dest)
  }

  /**
   * Handles castling state / rook movement
   * Returns a tuple with the newCastling array and direction (if castles was played)
   */
  handleCastles(
    squares: Array<Piece | undefined>,
    castles: boolean,
    currPiece: Piece | undefined,
    dest: number,
  ) {
    const whiteTurn = this.isWhiteTurn()
    const newCastling = this.getCastling()
    let dir = ''
    if (castles) {
      if (whiteTurn) {
        if (dest === 62) {
          // White castles short
          squares[61] = squares[63]
          squares[63] = undefined
          dir = 'short'
        } else if (dest === 58) {
          // White castles long
          squares[59] = squares[56]
          squares[56] = undefined
          dir = 'long'
        }

        // Update castling
        newCastling[0] = false
        newCastling[1] = false
      } else {
        if (dest === 6) {
          // Black castles short
          squares[5] = squares[7]
          squares[7] = undefined
          dir = 'short'
        } else if (dest === 2) {
          // Black castles long
          squares[3] = squares[0]
          squares[0] = undefined
          dir = 'long'
        }

        // Update castling
        newCastling[2] = false
        newCastling[3] = false
      }
    } else if (currPiece?.name.toLowerCase() === 'r') {
      // Edit castling chessState if rook or king is moved
      if (whiteTurn) {
        if (newCastling[1] && this.sourceSelection === 63) {
          newCastling[1] = false
        } else if (newCastling[0] && this.sourceSelection === 56) {
          newCastling[0] = false
        }
      } else {
        if (newCastling[3] && this.sourceSelection === 7) {
          newCastling[3] = false
        } else if (newCastling[2] && this.sourceSelection === 0) {
          newCastling[2] = false
        }
      }
    } else if (currPiece?.name.toLowerCase() === 'k') {
      if (
        whiteTurn &&
        (newCastling[0] || newCastling[1]) &&
        this.sourceSelection === 60
      ) {
        newCastling[0] = false
        newCastling[1] = false
      } else if (
        !whiteTurn &&
        (newCastling[2] || newCastling[3]) &&
        this.sourceSelection === 4
      ) {
        newCastling[2] = false
        newCastling[3] = false
      }
    }
    return { newCastling, dir }
  }
}
