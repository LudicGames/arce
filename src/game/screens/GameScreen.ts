import Ludic, {Screen, Camera, Vector2} from '@ludic/ludic'
import {Engine, Entity} from '@ludic/ein'

import Level1 from '../levels/Level1'
import Level2 from '../levels/Level2'
import Level3 from '../levels/Level3'

export default class GameScreen extends Screen {
  engine: Engine
  player: Player
  camera: Camera
  level: any

  constructor() {
    super()
    this.engine = new Engine()
    this.camera = new Camera(Ludic.canvas)
    // this.camera.centerWorldToCamera()
    this.camera.offset = new Vector2(0, this.camera.height)
    this.camera.pixelsToMeters = 20
    this.level = new Level2(this.engine, this.camera)
  }

  public onAddedToManager() {
    this.level.initSystems()
    this.level.initEntities()
  }

  update(delta: number){
	  this.engine.update(delta)
  }
}
