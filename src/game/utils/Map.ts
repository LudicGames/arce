import Ludic, {Screen, Camera, Vector2 } from '@ludic/ludic'
import Tile from '../entities/Tile'
import Hex, { OffsetCoordinate } from './Hex'

export interface Map {

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
  const hexSideLength = mapW / w


  let tiles: Tile[] = []
  for(let x=0; x <= 16; x++){
    for(let y=0; y >= -9; y--){
      let offsetCoordinate: OffsetCoordinate = {q: x, r: y}
      let hex = new Hex(offsetCoordinate, hexSideLength)

      // TODO add things like tile.type, color, from a map.json file
      tiles.push(new Tile(hex))
    }
  }

  return tiles
}
