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
  var y = size * (Math.sqrt(3)/2 * coordinate.x  +  Math.sqrt(3) * coordinate.y)

  return new Vector2(x, y)
}

export const generateMap = function(camera: Camera): Tile[]{
  const ptm = camera.pixelsToMeters

  const mapH = Math.ceil(camera.height / ptm)
  const mapW = Math.ceil(camera.width / ptm)
  const mapArea = mapH * mapW

  const totalXTiles = 16
  const totalYTiles = 9
  const totalTiles =  totalXTiles * totalYTiles // 144

  const w = totalXTiles * 1.5
  const tileSideLength = mapW / w

  // First generate Offset points
  let points = []
  for(let x=0; x <= 16; x++){
    for(let y=0; y >= -9; y--){
      points.push({x,y})
    }
  }

  let tiles: Tile[] = []
  points.forEach(point => {
    const coordinate: Coordinate = Hex.oddq_to_cube(point)
    const position: Vector2 = coordinateToVector2(coordinate, tileSideLength)
    const tile: Tile = new Tile(coordinate, position, tileSideLength)
    tiles.push(tile)
  })

  return tiles
}
