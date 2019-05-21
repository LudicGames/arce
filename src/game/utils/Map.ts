import Ludic, {Screen, Camera, Vector2 } from '@ludic/ludic'
import Tile from '../entities/Tile'
import Hex from './Hex'

export interface Map {

}

export interface Coordinate {
  x: number
  y: number
  z: number
}

export const coordinateToVector2 = function(coordinate: Coordinate, size: number): Vector2 {
  var x = size * (3/2 * coordinate.x)
  var y = size * (Math.sqrt(3)/2 * coordinate.x  +  Math.sqrt(3) * coordinate.z)

  return new Vector2(x, y)
}

export const generateMap = function(camera: Camera, size: number = 3): Tile[]{

  const ptm = camera.pixelsToMeters

  const totalTiles = 144
  const mapH = Math.ceil(camera.height / ptm)
  const mapW = Math.ceil(camera.width / ptm)
  const mapArea = mapH * mapW

  const tileArea = mapArea / totalTiles
  const tileSideLength = Hex.sideLengthFromArea(tileArea)

  const tileH = Math.sqrt(3) * tileSideLength
  const tileW = 2 * tileSideLength

  const minX: number = -10
  const maxX: number = 10
  const minY: number = -10
  const maxY: number = 10
  const minZ: number = -10
  const maxZ: number = 10

  let h = 4

  let tiles: Tile[] = []
  for(let x=minX; x<=maxX; x++){
    for(let y=minY; y<=maxY; y++){
      for(let z=minZ; z<=maxZ; z++){

        if(x+y+z === 0 && (Math.abs(y) < h) && (Math.abs(z) < h)){
          const coordinate: Coordinate = {x,y,z}
          const position: Vector2 = coordinateToVector2(coordinate, size)
          const tile: Tile = new Tile(coordinate, position, size)

          tiles.push(tile)
        }
      }
    }
  }

  return tiles
}
