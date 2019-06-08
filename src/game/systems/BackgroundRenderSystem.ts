import Ludic, { Camera } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'
import { CameraComponentMapper } from '../components/mappers'

export default class BackgroundRenderSystem extends System {
  engine: Engine

  constructor(){
    super()
  }

  public addedToEngine(engine: Engine): void {
    this.engine = engine
  }

  public removedFromEngine(engine: Engine): void {

  }

  public update(deltaTime: number): void {
    let cam = CameraComponentMapper.get(this.engine.getSingleton()).camera
    const ctx = Ludic.canvas.context
    ctx.save()
    ctx.fillStyle = "rgba(0, 0, 0, .90)"
    ctx.fillRect(0, 0, cam.width, cam.height)
    ctx.restore()
  }
}
