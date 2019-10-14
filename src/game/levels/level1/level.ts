import Ludic, {Screen, Camera} from '@ludic/ludic'

// Player Systems
import { PlayerControlSystem, PlayerRenderSystem } from '../../systems'

// Tile Systems
import { TileInitSystem, TileRenderSystem } from '../../systems'
import TileActivationSystem from '../../systems/TileActivationSystem'

// Castle Systems
import { CastleInitSystem, CastleRenderSystem } from '../../systems'
import CastleDamageSystem from '../../systems/CastleDamageSystem'

// Enemy Systems
import EnemyRenderSystem from '../../systems/EnemyRenderSystem'
import EnemyMovementSystem from '../../systems/EnemyMovementSystem'
import EnemySpawnSystem from '../../systems/EnemySpawnSystem'

// Tower Systems
import TowerMenuControlSystem from '../../systems/TowerMenuControlSystem'
import TowerMenuRenderSystem from '../../systems/TowerMenuRenderSystem'

import BackgroundRenderSystem from '../../systems/BackgroundRenderSystem'

import {
  GamepadComponent,
  MechComponent,
  PositionComponent,
  MovementComponent,
  PlayerStateComponent,
  InputFocus
} from '../../components'

// Map and Waves
import { generateMap } from '../../utils/Map'
import WavesConfig from './wavesConfig'
import mapConfig from './mapConfig'
import { World } from 'ecsy'
import UIRenderSystem from '../../systems/UIRenderSystem'


interface LevelOptions {
  playerMap: {[key: string]: string}
}

export default class Level1 {
  engine: World
  map: any
  waves: any

  constructor(engine: World){
    this.engine = engine

    // Hack for now
    Ludic.debug = true
  }

  init(options: LevelOptions){
    // Add the map
    const map = this.engine.createEntity().addComponent(MapConfigComponent, {value: mapConfig})

    this.initSystems()

    // Add the Players
    // partial taken from fn above:
    Object.entries(options.playerMap).forEach(([index, type]) => {
      // let spawnPoint = mapConfig.playerSpawnPoints[parseInt(index)]
      // let hex = new Hex(spawnPoint.x, spawnPoint.y, spawnPoint.z, hexSideLength)
      const player = this.engine.createEntity()
      player.addComponent(PositionComponent, {x: 10, y: 10})
      player.addComponent(MovementComponent)
      player.addComponent(PlayerStateComponent)
      player.addComponent(GamepadComponent, {index: parseInt(index)})
      player.addComponent(InputFocus)
      player.addComponent(MechComponent, {type})
    })

  }

  initSystems(){
    // Init
    this.engine.registerSystem(TileInitSystem)
    this.engine.registerSystem(CastleInitSystem)

    // Render
    // this.engine.addSystem(new BackgroundRenderSystem())
    // this.engine.addSystem(new EnemyRenderSystem())
    // this.engine.addSystem(new TowerRenderSystem())
    this.engine.registerSystem(TileRenderSystem)
    this.engine.registerSystem(CastleRenderSystem)
    this.engine.registerSystem(PlayerRenderSystem)


    this.engine.registerSystem(PlayerControlSystem)
    this.engine.registerSystem(TowerMenuRenderSystem)
    this.engine.registerSystem(TowerMenuControlSystem)
    // this.engine.addSystem(new EnemyMovementSystem())
    // this.engine.addSystem(new TileActivationSystem())
    // this.engine.addSystem(new EnemySpawnSystem(WavesConfig))
    // this.engine.addSystem(new CastleDamageSystem())
  }
}
