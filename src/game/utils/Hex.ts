export const areaFromSideLength = function(sideLength: number): number {
  return ((3 * Math.sqrt(3)) / 2) * Math.pow(sideLength, 2)
}

export const sideLengthFromArea = function(area: number): number {
  return Math.sqrt((area / ((3 * Math.sqrt(3)) / 2)))
}

export const oddq_to_cube = function(point: any){
  var x = point.x
  var z = point.y - (point.x - (point.x&1)) / 2
  var y = -x-z
  return {x, y, z}
}


const Hex = {
  areaFromSideLength,
  sideLengthFromArea,
  oddq_to_cube,
}

export default Hex
