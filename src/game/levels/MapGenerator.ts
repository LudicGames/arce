import Ludic, {Screen, Camera} from '@ludic/ludic'
import {Engine, Entity, Component} from '@ludic/ein'

// Systems
import PlayerMapControlSystem from '../systems/PlayerMapControlSystem'
import PlayerRenderSystem from '../systems/PlayerRenderSystem'

import TileRenderSystem from '../systems/TileRenderSystem'
import TileActivationSystem from '../systems/TileActivationSystem'

import CastleRenderSystem from '../systems/CastleRenderSystem'
import CastleDamageSystem from '../systems/CastleDamageSystem'

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
import { CameraComponentMapper } from '../components/mappers'

// Map and Waves
import { generateMap, Map } from '../utils/Map'

interface LevelOptions {
  playerMap: {[key: string]: string}
}

export default class Level2 extends BaseLevel {
  engine: Engine
  tiles: Tile[]
  enemies: Enemy[]
  map: any
  waves: any

  constructor(engine: Engine){
    super()
    this.engine = engine
    this.tiles = []
    this.enemies = []

    // Hack for now
    Ludic.debug = true
  }

  init(options: LevelOptions){
    this.initSystems()
    const mapConfig: Map = {
      tiles: [],
      castles:[],
      playerSpawnPoints: [
        {x:1, y: 1, z: -2},
        {x:3, y: -1, z: 2},
      ]
    }
    generateMap(CameraComponentMapper.get(this.engine.getSingleton()).camera, this.engine, mapConfig, options.playerMap)
  }

  initSystems(){
    this.engine.addSystem(new PlayerMapControlSystem(this.engine))
    this.engine.addSystem(new TileRenderSystem())
    this.engine.addSystem(new CastleRenderSystem())
    this.engine.addSystem(new PlayerRenderSystem())
    this.engine.addSystem(new TileActivationSystem())
    this.engine.addSystem(new CastleDamageSystem())
  }
}
