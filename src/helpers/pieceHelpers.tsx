
function convertXY(pos: number): [number, number] {
  const x = pos % 8
  const y = Math.floor(pos / 8)
  return [x, y]
}

export default convertXY