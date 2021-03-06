import Ludic, {Screen, Camera, Vector2 } from '@ludic/ludic'
import { Engine, ComponentMapper } from '@ludic/ein'

import Player from '../entities/Player'
import Tile from '../entities/Tile'
import Castle from '../entities/Castle'

import { GamepadComponent, MechComponent, TileStateComponent } from '../components'

import { Hex, OffsetCoordinate, CubeCoordinate } from './Hex'


export interface Map {
  tiles: MapTile[]
  castles: MapCastle[]
  playerSpawnPoints: CubeCoordinate[]
}

export interface MapTile {
  coords: CubeCoordinate
  tileType?: string
}

export interface MapCastle {
  coords: CubeCoordinate
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

  const totalXTiles = 23
  const totalYTiles = 13
  const totalTiles =  totalXTiles * totalYTiles // 144

  const w = totalXTiles * 1.5
  const hexSideLength = mapW / w

  const minQ = 1
  const maxQ = 22

  const minR = -9
  const maxR = -2
  // Tiles
  let tiles: Tile[] = []
  for(let q=0; q <= totalXTiles; q++){
    for(let r=0; r >= -totalYTiles; r--){

      if(q <= maxQ && q >= minQ && r <=maxR && r >= minR) {
        let cube = Hex.offsetToCube({q, r})
        let hex = new Hex(cube.x, cube.y, cube.z, hexSideLength)

        let tileType = '1'
        let tileConfig = mapConfig.tiles.find(tile => {
          let tileHex: Hex = new Hex(tile.pos.x, tile.pos.y, tile.pos.z, hexSideLength)
          return Hex.equal(hex, tileHex)
        })

        tileType = tileConfig ? tileConfig.tileType : '1'

        let tile = new Tile(hex, tileType)
        engine.addEntity(tile)
        tiles.push(tile)
      }
    }
  }

  // Castles
  mapConfig.castles.forEach(c => {
    let hex = new Hex(c.x, c.y, c.z, hexSideLength)
    let castle = new Castle(hex)
    engine.addEntity(castle)
  })

  // Players
  Object.entries(playerMap).forEach(([index, type]) => {
    let spawnPoint = mapConfig.playerSpawnPoints[parseInt(index)]
    let hex = new Hex(spawnPoint.x, spawnPoint.y, spawnPoint.z, hexSideLength)
    const player = new Player(hex)
    player.add(new GamepadComponent(parseInt(index)))
    player.add(new MechComponent(type))
    engine.addEntity(player)
  })

}
