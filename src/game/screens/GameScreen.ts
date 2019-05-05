import Ludic, {Screen, Camera} from '@ludic/ludic'
import {Engine, Entity} from '@ludic/ein'

import PositionSystem from '../systems/PositionSystem'
import PositionComponent from '../components/PositionComponent'
import Player from '../entities/Player'
import RenderSystem from '../systems/RenderSystem'
import GamepadComponent from '../components/GamepadComponent'
import PlayerCreate from '../systems/PlayerCreate'
import PlayerControlSystem from '../systems/PlayerControlSystem'

export default class GameScreen extends Screen {
  engine: Engine
  player: Player
  camera: Camera

  constructor() {
    super()
    this.engine = new Engine()
    this.camera = new Camera(Ludic.canvas)
    this.camera.centerWorldToCamera()
    this.camera.pixelsToMeters = 20
  }

  public onAddedToManager() {
    this.initSystems()
    this.initEntities()
  }

  initSystems(){
    this.engine.addSystem(new PlayerControlSystem())
    this.engine.addSystem(new RenderSystem(this.camera))
    this.engine.addSystem(new PlayerCreate())
  }

  initEntities(){
	  // const entity = this.engine.createEntity()
    // entity.add(new PositionComponent(10, 0))
    // this.player = new Player()
    // this.player.add(new GamepadComponent(0))
    // this.engine.addEntity(this.player)
  }

  update(delta: number){
	  this.engine.update(delta)
  }
}
