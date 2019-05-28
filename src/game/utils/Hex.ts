import { Vector2 } from '@ludic/ludic'

export interface OffsetCoordinate {
  q: number
  r: number
}

export interface AxialCoordinate {
  q: number
  r: number
  s: number
}

export interface CubeCoordinate {
  x: number
  y: number
  z: number
}


export default class Hex {
  q: number
  r: number
  s: number
  x: number
  y: number
  z: number
  sideLength: number

  constructor(x: number, y: number, z: number, sideLength: number){
    this.x = x
    this.z = z
    this.y = y
    this.sideLength = sideLength
  }

  get position(): Vector2 {
    return Hex.cubeCoordinateToVector2({x: this.x, y: this.y, z: this.z}, this.sideLength)
  }

  static add(a: Hex, b:Hex): Hex {
    return new Hex(a.x + b.x, a.y + b.y, a.z + b.z, a.sideLength + b.sideLength)
  }

  static subtract(a: Hex, b: Hex): Hex {
    return new Hex(a.x - b.x, a.y - b.y, a.z - b.z, a.sideLength - b.sideLength)
  }

  static equal(a: Hex, b: Hex): boolean {
    if(a.x == b.x && a.y == b.y && a.z == b.z){
      return true
    } else {
      return false
    }
  }

  static scale(hex: Hex, k:number): Hex {
    return new Hex(hex.x * k, hex.y * k, hex.z * k, hex.sideLength * k)
  }

  static rotateLeft(hex: Hex): Hex {
    return new Hex(-hex.x, -hex.y, -hex.z, hex.sideLength)
  }

  static rotateRight(hex: Hex): Hex {
    return new Hex(-hex.x, -hex.y, -hex.z, hex.sideLength)
  }

  public static cubeDirections: CubeCoordinate[] = [
    {x:  1,  y: -1,  z:  0},
    {x:  1,  y:  0,  z: -1},
    {x:  0,  y:  1,  z: -1},
    {x:  0,  y: -1,  z:  1},
    {x: -1,  y:  1,  z:  0},
    {x: -1,  y:  0,  z:  1},
  ]

  static direction(direction: number): CubeCoordinate {
    return Hex.cubeDirections[direction]
  }

  // static neighbor(a: Hex, direction: number): Hex {
  //   let b: Hex = new Hex()
  //   return Hex.add(a, b)
  // }

  static allNeighbors(hex: Hex): Hex[] {
    return Hex.cubeDirections.map((d: CubeCoordinate) => {
      return Hex.add(hex, new Hex(d.x, d.y, d.z, 0))
    })
  }

  public static diagonals:Hex[] = [
    new Hex(2, -1, -1, 0),
    new Hex(1, -2, 1, 0),
    new Hex(-1, -1, 2, 0),
    new Hex(-2, 1, 1, 0),
    new Hex(-1, 2, -1, 0),
    new Hex(1, 1, -2, 0),
  ]

  static diagonalNeighbor(hex: Hex, direction: number): Hex {
    return Hex.add(hex, Hex.diagonals[direction])
  }

  static len(hex: Hex): number {
    return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2
  }

  static distance(a: Hex, b:Hex): number {
    return Hex.len(Hex.subtract(a, b))
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

  // static getCubeNeighbors(coordinate: CubeCoordinate): CubeCoordinate[] {
  //   const cubeDirections = [
  //     {x:  1,  y: -1,  z:  0},
  //     {x:  1,  y:  0,  z: -1},
  //     {x:  0,  y:  1,  z: -1},
  //     {x:  0,  y: -1,  z:  1},
  //     {x: -1,  y:  1,  z:  0},
  //     {x: -1,  y:  0,  z:  1},
  //   ]
  //   return cubeDirections.map(direction => {
  //     return Hex.sumCubeCoordinates(coordinate, direction)
  //   })
  // }

  // static sumCubeCoordinates(c1: CubeCoordinate, c2: CubeCoordinate): CubeCoordinate {
  //   return {
  //     x: c1.x + c2.x,
  //     y: c1.y + c2.y,
  //     z: c1.z + c2.z
  //   }
  // }

  static cubeToAxial(x: number, y: number, z: number): AxialCoordinate {
    return {
      q: x,
      r: y,
      s: -x - y
    }
  }

  static axialToCube(q: number, r: number): CubeCoordinate {
    return {
      x: q,
      y: r,
      z: -q - r
    }
  }
}
