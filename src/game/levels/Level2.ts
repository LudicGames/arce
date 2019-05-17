import Ludic, {Screen, Camera} from '@ludic/ludic'
import {Engine, Entity, Component} from '@ludic/ein'

// Systems
import PlayerControlSystem from '../systems/PlayerControlSystem'
import PlayerRenderSystem from '../systems/PlayerRenderSystem'

import TileRenderSystem from '../systems/TileRenderSystem'
import TileActivationSystem from '../systems/TileActivationSystem'

import CastleRenderSystem from '../systems/CastleRenderSystem'

import EnemyRenderSystem from '../systems/EnemyRenderSystem'
import EnemyMovementSystem from '../systems/EnemyMovementSystem'
import EnemySpawnSystem from '../systems/EnemySpawnSystem'


// Entities
import Player from '../entities/Player'
import Tile from '../entities/Tile'
import Castle from '../entities/Castle'
import Enemy from '../entities/Enemy'

import BaseLevel from './BaseLevel'
import GamepadComponent from '../components/GamepadComponent'
import MechComponent from '../components/MechComponent'
import { CameraComponentMapper } from '../components/mappers';

interface LevelOptions {
  playerMap: {[key: string]: string}
}

export default class Level2 extends BaseLevel {
  engine: Engine
  tiles: Tile[]
  enemies: Enemy[]

  constructor(engine: Engine){
    super()
    this.engine = engine
    this.tiles = []
    this.enemies = []
  }

  init(options: LevelOptions){
    this.initSystems()
    this.initEntities(options.playerMap)
  }

  initSystems(){
    this.engine.addSystem(new PlayerControlSystem())
    this.engine.addSystem(new TileRenderSystem())
    this.engine.addSystem(new CastleRenderSystem())
    this.engine.addSystem(new EnemyRenderSystem())
    this.engine.addSystem(new PlayerRenderSystem())
    this.engine.addSystem(new EnemyMovementSystem())
    this.engine.addSystem(new TileActivationSystem())
    this.engine.addSystem(new EnemySpawnSystem())
  }

  initEntities(playerMap: LevelOptions['playerMap']){
    this.initTiles(3)
    this.initPlayers(playerMap)
    this.initCastle(this.tiles[1])
  }
  initTiles(size: number){
    const camera = CameraComponentMapper.get(this.engine.getSingleton()).camera
    const ptm = camera.pixelsToMeters
    const h = camera.height / ptm
    const w = camera.width / ptm
    const d = size * 2

    const totalY = Math.ceil(h / size) + 3
    const totalX = Math.ceil(w / (d + size))


    // console.log("h: ", h)
    // console.log("w: ", w)
    // console.log("ptm: ", ptm)

    // console.log("h/ptm: ", h/ptm)
    // console.log("w/ptm: ", w/ptm)

    // console.log("totalX: ", totalX)
    // console.log("totalY: ", totalY)

    let x = size / 2
    let y = 0
    let toggle = false

    for(let i=0; i<totalX; i++){
      for(let j=0; j<totalY; j++){
        let extra = 0
        if(j % 2) extra = d * .775
        const tile = new Tile(x+extra, y, size)
        this.engine.addEntity(tile)
        this.tiles.push(tile)
        y += size * .89
      }
      y = 0
      x += size * 3.1
    }
  }

  initPlayers(playerMap: LevelOptions['playerMap']){
    Object.entries(playerMap).forEach(([index, type]) => {
      const player = new Player()
      player.add(new GamepadComponent(parseInt(index)))
      player.add(new MechComponent(type))
      this.engine.addEntity(player)
    })
  }

  initCastle(tile: Tile){
    const castle = new Castle(tile)
    this.engine.addEntity(castle)
  }
}
