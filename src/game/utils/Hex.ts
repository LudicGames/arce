import { Vector2 } from '@ludic/ludic'

export interface OffsetCoordinate {
  q: number
  r: number
}

export interface CubeCoordinate {
  x: number
  y: number
  z: number
}


export default class Hex {
  offsetCoordinate: OffsetCoordinate
  cubeCoordinate: CubeCoordinate
  sideLength: number

  constructor(offsetCoordinate: OffsetCoordinate, sideLength: number){
    this.offsetCoordinate = offsetCoordinate
    this.cubeCoordinate = Hex.offsetToCube(offsetCoordinate)
    this.sideLength = sideLength
  }

  get position(): Vector2 {
    return Hex.cubeCoordinateToVector2(this.cubeCoordinate, this.sideLength)
  }


  static areaFromSideLength(sideLength: number): number {
    return ((3 * Math.sqrt(3)) / 2) * Math.pow(sideLength, 2)
  }

  static sideLengthFromArea(area: number): number {
    return Math.sqrt((area / ((3 * Math.sqrt(3)) / 2)))
  }

  static offsetToCube(offsetCoordinate: OffsetCoordinate){
    var x = offsetCoordinate.q
    var z = offsetCoordinate.r - (offsetCoordinate.q - (offsetCoordinate.q&1)) / 2
    var y = -x-z
    return {x, y, z}
  }

  static cubeCoordinateToVector2(coordinate: CubeCoordinate, size: number): Vector2 {
    var x = size * (3/2 * coordinate.x)
    var y = size * (Math.sqrt(3)/2 * coordinate.x  +  Math.sqrt(3) * coordinate.y)

    return new Vector2(x, y)
  }


}
