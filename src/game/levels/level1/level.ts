import Ludic, {Screen, Camera} from '@ludic/ludic'

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

import {
  GamepadComponent,
  MechComponent,
  PositionComponent,
  MovementComponent,
  PlayerStateComponent
} from '../../components'

// Map and Waves
import { generateMap } from '../../utils/Map'
import WavesConfig from './wavesConfig'
import mapConfig from './mapConfig'
import { World } from 'ecsy'


interface LevelOptions {
  playerMap: {[key: string]: string}
}

export default class Level1 {
  engine: World
  tiles: Tile[]
  enemies: Enemy[]
  map: any
  waves: any

  constructor(engine: World){
    this.engine = engine
    this.tiles = []
    this.enemies = []

    // Hack for now
    Ludic.debug = true
  }

  init(options: LevelOptions){
    this.initSystems()
    // generateMap(CameraComponentMapper.get(this.engine.getSingleton()).camera, this.engine, mapConfig, options.playerMap)

    // partial taken from fn above:
    Object.entries(options.playerMap).forEach(([index, type]) => {
      let spawnPoint = mapConfig.playerSpawnPoints[parseInt(index)]
      // let hex = new Hex(spawnPoint.x, spawnPoint.y, spawnPoint.z, hexSideLength)
      const player = this.engine.createEntity()
      player.addComponent(PositionComponent, {x: 10, y: 10})
      player.addComponent(MovementComponent)
      player.addComponent(PlayerStateComponent)
      player.addComponent(GamepadComponent, {index: parseInt(index)})
      player.addComponent(MechComponent, {type})
    })
  }

  initSystems(){
    // Render
    // this.engine.addSystem(new BackgroundRenderSystem())
    // this.engine.addSystem(new TileRenderSystem())
    // this.engine.addSystem(new EnemyRenderSystem())
    // this.engine.addSystem(new CastleRenderSystem())
    // this.engine.addSystem(new TowerRenderSystem())
    this.engine.registerSystem(PlayerRenderSystem)

    this.engine.registerSystem(PlayerControlSystem)
    // this.engine.addSystem(new EnemyMovementSystem())
    // this.engine.addSystem(new TileActivationSystem())
    // this.engine.addSystem(new EnemySpawnSystem(WavesConfig))
    // this.engine.addSystem(new CastleDamageSystem())
  }
}
