import Ludic, {Screen, Camera, ScreenManager, Vector2} from '@ludic/ludic'

import Level1 from '../levels/level1/level'
import Player from '../entities/Player'
import BaseLevel from '../levels/BaseLevel'
import { CameraComponent } from '../components'
import CameraRenderSystem from '../systems/CameraRenderSystem'
import { World } from 'ecsy'

export default class GameScreen extends Screen {
  engine: World
  player: Player
  level: BaseLevel

  constructor() {
    super()
    this.engine = new World()
    // this.camera = new Camera(Ludic.canvas)

    // this.camera.centerWorldToCamera()
    this.createCamera()
    this.level = new Level1(this.engine)
  }

  createCamera(){
    const camera = new Camera(Ludic.canvas)
    camera.offset = new Vector2(0, camera.height)
    camera.pixelsToMeters = 20

    const cameraEntity = this.engine.createEntity()
    cameraEntity.addComponent(CameraComponent, {value: camera})
    camera.centerWorldToCamera()
    // console.log(this.engine)
    // this.engine.addSingletonComponent(new CameraComponent(camera))
    // this.engine.addSystem(new CameraRenderSystem())
    this.engine.registerSystem(CameraRenderSystem)
    // this.engine.addSystem(new TowerMenuSystem())
  }

  public onAddedToManager(manager: ScreenManager, finalData?: {[key: number]: string}) {
    this.level.init({
      playerMap: finalData
    })

    // Fired by the CastleDamageSystem
    window.addEventListener('GAME_OVER', () => {
      // TODO add cool stats here, from this.engine.stats()
      console.log("GAMEOVER")
      // @ts-ignore
      console.log(this.engine.stats())
      this.finish({})
    })
  }

  update(delta: number, time: number){
    Ludic.canvas.context.save()
    Ludic.canvas.clear()
    this.engine.execute(delta, time)
    Ludic.canvas.context.restore()
  }
}
