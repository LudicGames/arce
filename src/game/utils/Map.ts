import Ludic, {Screen, Camera, Vector2 } from '@ludic/ludic'
import { Engine } from '@ludic/ein'

import Player from '../entities/Player'
import Tile from '../entities/Tile'
import Castle from '../entities/Castle'

import GamepadComponent from '../components/GamepadComponent'
import MechComponent from '../components/MechComponent'

import Hex, { OffsetCoordinate, CubeCoordinate } from './Hex'

export interface MapTile {
  offsetCoordinate?: OffsetCoordinate
  tileType?: string
}

export interface Map {
  tiles?: MapTile[]
  castles?: [
    {
      offsetCoordinate?: OffsetCoordinate
    }
  ]
  playerSpawnPoints: OffsetCoordinate[]
}

// TODO consolidate this
interface LevelOptions {
  playerMap: {[key: string]: string}
}


export const generateMap = function(camera: Camera, engine: Engine, mapConfig: Map, playerMap: LevelOptions['playerMap']): void {
  const ptm = camera.pixelsToMeters

  const mapH = Math.ceil(camera.height / ptm)
  const mapW = Math.ceil(camera.width / ptm)
  const mapArea = mapH * mapW

  const totalXTiles = 16
  const totalYTiles = 9
  const totalTiles =  totalXTiles * totalYTiles // 144

  const w = totalXTiles * 1.5
  const hexSideLength = mapW / w

  // Tiles
  let tiles: Tile[] = []
  for(let x=0; x <= 16; x++){
    for(let y=0; y >= -9; y--){
      let offsetCoordinate: OffsetCoordinate = {q: x, r: y}
      let hex = new Hex(offsetCoordinate, hexSideLength)

      // TODO add things like tile.type, color, from a map.json file
      let tileConfig = mapConfig.tiles.find(t => (t.offsetCoordinate.q == offsetCoordinate.q && t.offsetCoordinate.r == offsetCoordinate.r))
      let tileType = tileConfig ? tileConfig.tileType : '1'
      let tile = new Tile(hex, tileType)
      engine.addEntity(tile)
      tiles.push(tile)
    }
  }

  // Castles
  mapConfig.castles.forEach(c => {
    let hex = new Hex(c.offsetCoordinate, hexSideLength)
    let castle = new Castle(hex)
    engine.addEntity(castle)
  })

  // Players
  Object.entries(playerMap).forEach(([index, type]) => {
    let spawnPoint = mapConfig.playerSpawnPoints[index]
    let hex = new Hex(spawnPoint, hexSideLength)
    const player = new Player(hex)
    player.add(new GamepadComponent(parseInt(index)))
    player.add(new MechComponent(type))
    engine.addEntity(player)
  })

}
