import { Vector2 } from '@ludic/ludic'

export class Hex {
  q: number
  r: number
  s: number
  x: number
  y: number
  z: number
  sideLength: number

  constructor(x: number, y: number, z: number, sideLength: number){
    if((x + y + z) !== 0){ throw "x + y + z needs to = 0"}
    this.x = x
    this.y = y
    this.z = z
    this.q = x
    this.r = z
    this.sideLength = sideLength
  }

  get position(): Vector2 {
    return cubeCoordinateToVector2({x: this.x, y: this.y, z: this.z}, this.sideLength)
  }

  get cubeCoordinate(): CubeCoordinate {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    }
  }

  get offsetCoordinate(): OffsetCoordinate {
    return cubeToOffset(this.cubeCoordinate)
  }
}

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

export const diagonals: Hex[] = [
  new Hex(2, -1, -1, 0),
  new Hex(1, -2, 1, 0),
  new Hex(-1, -1, 2, 0),
  new Hex(-2, 1, 1, 0),
  new Hex(-1, 2, -1, 0),
  new Hex(1, 1, -2, 0),
]

export const cubeDirections: CubeCoordinate[] = [
  {x:  1,  y: -1,  z:  0},
  {x:  1,  y:  0,  z: -1},
  {x:  0,  y:  1,  z: -1},
  {x:  0,  y: -1,  z:  1},
  {x: -1,  y:  1,  z:  0},
  {x: -1,  y:  0,  z:  1},
]

export function add(a: Hex, b:Hex): Hex {
  return new Hex(a.x + b.x, a.y + b.y, a.z + b.z, a.sideLength + b.sideLength)
}

export function subtract(a: Hex, b: Hex): Hex {
  return new Hex(a.x - b.x, a.y - b.y, a.z - b.z, a.sideLength - b.sideLength)
}

export function equal(a: Hex, b: Hex): boolean {
  if(a.x == b.x && a.y == b.y && a.z == b.z){
    return true
  } else {
    return false
  }
}

export function scale(hex: Hex, k:number): Hex {
  return new Hex(hex.x * k, hex.y * k, hex.z * k, hex.sideLength * k)
}

export function rotateLeft(hex: Hex): Hex {
  return new Hex(-hex.x, -hex.y, -hex.z, hex.sideLength)
}

export function rotateRight(hex: Hex): Hex {
  return new Hex(-hex.x, -hex.y, -hex.z, hex.sideLength)
}

export function direction(direction: number): CubeCoordinate {
  return cubeDirections[direction]
}

export function allNeighbors(hex: Hex): Hex[] {
  return cubeDirections.map((d: CubeCoordinate) => {
    return add(hex, new Hex(d.x, d.y, d.z, 0))
  })
}

export function diagonalNeighbor(hex: Hex, direction: number): Hex {
  return add(hex, diagonals[direction])
}

export function len(hex: Hex): number {
  return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2
}

export function distance(a: Hex, b:Hex): number {
  return len(subtract(a, b))
}

export function areaFromSideLength(sideLength: number): number {
  return ((3 * Math.sqrt(3)) / 2) * Math.pow(sideLength, 2)
}

export function sideLengthFromArea(area: number): number {
  return Math.sqrt((area / ((3 * Math.sqrt(3)) / 2)))
}

export function offsetToCube(offsetCoordinate: OffsetCoordinate): CubeCoordinate {
  var x = offsetCoordinate.q
  var z = offsetCoordinate.r - (offsetCoordinate.q - (offsetCoordinate.q&1)) / 2
  var y = -x-z
  return {x, y, z}
}

export function cubeToOffset(cube: CubeCoordinate): OffsetCoordinate{
  return {
    q:cube.x,
    r: cube.z + (cube.x - (cube.x&1)) / 2
  }
}

export function cubeCoordinateToVector2(coordinate: CubeCoordinate, size: number): Vector2 {
  var x = size * (3/2 * coordinate.x)
  var y = size * (Math.sqrt(3)/2 * coordinate.x  +  Math.sqrt(3) * coordinate.y)

  return new Vector2(x, y)
}

export function cubeToAxial(x: number, y: number, z: number): AxialCoordinate {
  return {
    q: x,
    r: y,
    s: -x - y
  }
}

export function axialToCube(q: number, r: number): CubeCoordinate {
  return {
    x: q,
    y: r,
    z: -q - r
  }
}
