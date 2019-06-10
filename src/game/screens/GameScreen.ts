import Ludic, {Screen, Camera, ScreenManager, Vector2} from '@ludic/ludic'
import {Engine, Entity} from '@ludic/ein'

import Level1 from '../levels/level1/level'
import Player from '../entities/Player'
import BaseLevel from '../levels/BaseLevel'
import CameraComponent from '../components/CameraComponent'
import CameraRenderSystem from '../systems/CameraRenderSystem'
import TowerMenuSystem from '../systems/TowerMenuSystem';

export default class GameScreen extends Screen {
  engine: Engine
  player: Player
  level: BaseLevel

  constructor() {
    super()
    this.engine = new Engine()
    // this.camera = new Camera(Ludic.canvas)

    // this.camera.centerWorldToCamera()
    this.createCamera()
    this.level = new Level1(this.engine)
  }

  createCamera(){
    const camera = new Camera(Ludic.canvas)
    camera.offset = new Vector2(0, camera.height)
    camera.pixelsToMeters = 20
    // camera.centerWorldToCamera();
    this.engine.addSingletonComponent(new CameraComponent(camera))
    this.engine.addSystem(new CameraRenderSystem(0))
    this.engine.addSystem(new TowerMenuSystem())
  }

  public onAddedToManager(manager: ScreenManager, finalData?: {[key: number]: string}) {
    this.level.init({
      playerMap: finalData
    })
  }

  update(delta: number){
    Ludic.canvas.context.save()
    Ludic.canvas.clear()
    this.engine.update(delta)
    Ludic.canvas.context.restore()
  }
}
