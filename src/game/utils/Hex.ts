export const areaFromSideLength = function(sideLength: number): number {
  return ((3 * Math.sqrt(3)) / 2) * Math.pow(sideLength, 2)
}

export const sideLengthFromArea = function(area: number): number {
  return Math.sqrt((area / ((3 * Math.sqrt(3)) / 2)))
}


const Hex = {
  areaFromSideLength,
  sideLengthFromArea,
}

export default Hex
