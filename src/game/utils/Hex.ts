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

  static getCubeNeighbors(coordinate: CubeCoordinate): CubeCoordinate[] {
    const cubeDirections = [
      {x:  1,  y: -1,  z:  0},
      {x:  1,  y:  0,  z: -1},
      {x:  0,  y:  1,  z: -1},
      {x:  0,  y: -1,  z:  1},
      {x: -1,  y:  1,  z:  0},
      {x: -1,  y:  0,  z:  1},
    ]
    return cubeDirections.map(direction => {
      return Hex.sumCubeCoordinates(coordinate, direction)
    })
  }

  static sumCubeCoordinates(c1: CubeCoordinate, c2: CubeCoordinate): CubeCoordinate {
    return {
      x: c1.x + c2.x,
      y: c1.y + c2.y,
      z: c1.z + c2.z
    }
  }

}
