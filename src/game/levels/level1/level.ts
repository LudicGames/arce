import Ludic, {Screen, Camera} from '@ludic/ludic'
import {Engine, Entity, Component} from '@ludic/ein'

// Player Systems
import PlayerControlSystem from '../../systems/PlayerControlSystem'
import PlayerRenderSystem from '../../systems/PlayerRenderSystem'

// Tile Systems
import TileRenderSystem from '../../systems/TileRenderSystem'
import TileActivationSystem from '../../systems/TileActivationSystem'

// Castle Systems
import CastleRenderSystem from '../../systems/CastleRenderSystem'
import CastleDamageSystem from '../../systems/CastleDamageSystem'

// Enemy Systems
import EnemyRenderSystem from '../../systems/EnemyRenderSystem'
import EnemyMovementSystem from '../../systems/EnemyMovementSystem'
import EnemySpawnSystem from '../../systems/EnemySpawnSystem'

// Tower Systems
import TowerRenderSystem from '../../systems/TowerRenderSystem'

import BackgroundRenderSystem from '../../systems/BackgroundRenderSystem'

// Entities
import Player from '../../entities/Player'
import Tile from '../../entities/Tile'
import Castle from '../../entities/Castle'
import Enemy from '../../entities/Enemy'
import Tower from '../../entities/Tower'

import BaseLevel from '../BaseLevel'
import GamepadComponent from '../../components/GamepadComponent'
import MechComponent from '../../components/MechComponent'
import { CameraComponentMapper } from '../../components/mappers'

// Map and Waves
import { generateMap } from '../../utils/Map'
import WavesConfig from './wavesConfig'
import mapConfig from './mapConfig'


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
    generateMap(CameraComponentMapper.get(this.engine.getSingleton()).camera, this.engine, mapConfig, options.playerMap)
  }

  initSystems(){
    // Render
    this.engine.addSystem(new BackgroundRenderSystem())
    this.engine.addSystem(new TileRenderSystem())
    this.engine.addSystem(new EnemyRenderSystem())
    this.engine.addSystem(new CastleRenderSystem())
    this.engine.addSystem(new TowerRenderSystem())
    this.engine.addSystem(new PlayerRenderSystem())

    this.engine.addSystem(new PlayerControlSystem())
    this.engine.addSystem(new EnemyMovementSystem())
    this.engine.addSystem(new TileActivationSystem())
    this.engine.addSystem(new EnemySpawnSystem(WavesConfig))
    this.engine.addSystem(new CastleDamageSystem())
  }
}
