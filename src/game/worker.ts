import Ludic, { Camera, Vector2, LudicOptions } from '@ludic/ludic'
import * as Comlink from 'comlink'
import { World } from 'ecsy';
import Level1 from './levels/level1/level';
import { CameraComponent } from './components';
import CameraRenderSystem from './systems/CameraRenderSystem';

// const worker = new Ludic({
//   worker: true,
//   update: function(time, delta){

//   }
// }).start()

class UIWorker extends Ludic {

  engine: World
  level: Level1

  constructor(arg: LudicOptions){
    super(arg)

    this.engine = new World()
    this.level = new Level1(this.engine)

  }
  
  init({playerMap}: any){
    this.createCamera()

    this.level.init({
      playerMap,
    })
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

  update(time: number, delta: number){
    // console.log(1000/delta, this.engine)
    Ludic.canvas.context.save()
    Ludic.canvas.clear()
    Ludic.canvas.context.fillStyle = 'black'
    Ludic.canvas.context.fillText(String(1000/delta), 200, 200)
    this.engine.execute(delta, time)
    Ludic.canvas.context.restore()
  }
}

Comlink.expose(new UIWorker({worker: true, start: true}))
