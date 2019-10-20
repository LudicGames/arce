import Ludic, {Screen, Camera} from '@ludic/ludic'

// Player Systems
import { PlayerInitSystem, PlayerControlSystem, PlayerRenderSystem } from '../../systems'

// Tile Systems
import { TileInitSystem, TileRenderSystem } from '../../systems'
import TileActivationSystem from '../../systems/TileActivationSystem'

// Castle Systems
import { CastleInitSystem, CastleRenderSystem } from '../../systems'
import CastleDamageSystem from '../../systems/CastleDamageSystem'

// Enemy Systems
import { EnemySpawnSystem, EnemyRenderSystem, EnemyMovementSystem } from '../../systems'

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
  PlayerConfigComponent,
  MapConfigComponent,
  EnemyConfigComponent,
  CameraComponent,
  InputFocus,
} from '../../components'

// Map and Waves
import WavesConfig from './wavesConfig'
import mapConfig from './mapConfig'
import { World } from 'ecsy'


interface LevelOptions {
  playerMap: {[key: string]: string}
}

export default class Level1 {
  engine: World

  constructor(engine: World){
    this.engine = engine

    // Hack for now
    Ludic.debug = false
  }

  init(options: LevelOptions){

    // Add the player config
    this.engine.createEntity().addComponent(PlayerConfigComponent, {value: options.playerMap})

    // Add the map config
    this.engine.createEntity().addComponent(MapConfigComponent, {value: mapConfig})

    // Add the enemy config
    this.engine.createEntity().addComponent(EnemyConfigComponent, {value: WavesConfig})


    this.initSystems()
  }

  initSystems(){
    // Init
    this.engine.registerSystem(TileInitSystem)
    this.engine.registerSystem(CastleInitSystem)
    this.engine.registerSystem(PlayerInitSystem)
    this.engine.registerSystem(EnemySpawnSystem)

    // Render
    // this.engine.addSystem(new BackgroundRenderSystem())
    // this.engine.addSystem(new TowerRenderSystem())
    this.engine.registerSystem(TileRenderSystem)
    this.engine.registerSystem(CastleRenderSystem)
    this.engine.registerSystem(EnemyRenderSystem)
    this.engine.registerSystem(PlayerRenderSystem)


    this.engine.registerSystem(TowerMenuControlSystem)
    this.engine.registerSystem(PlayerControlSystem)
    this.engine.registerSystem(TowerMenuRenderSystem)
    this.engine.registerSystem(EnemyMovementSystem)

    // this.engine.addSystem(new TileActivationSystem())
    // this.engine.addSystem(new CastleDamageSystem())
  }
}
