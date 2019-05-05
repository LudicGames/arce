import Ludic, {Screen, Camera} from '@ludic/ludic'
import {Engine, Entity} from '@ludic/ein'

import Level1 from '../levels/Level1'

export default class GameScreen extends Screen {
  engine: Engine
  player: Player
  camera: Camera
  level: any

  constructor() {
    super()
    this.engine = new Engine()
    this.camera = new Camera(Ludic.canvas)
    this.camera.centerWorldToCamera()
    this.camera.pixelsToMeters = 20

    this.level = new Level1(this.engine, this.camera)
  }

  public onAddedToManager() {
    this.level.initSystems()
    this.level.initEntities()
  }

  update(delta: number){
	  this.engine.update(delta)
  }
}
