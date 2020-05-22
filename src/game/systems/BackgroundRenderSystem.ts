import Ludic, { Camera } from '@ludic/ludic'
import { System } from '@ludic/ein'

export default class BackgroundRenderSystem extends System {
  public execute(delta: number, time: number): void {

    // TODO
    // let cam = CameraComponentMapper.get(this.engine.getSingleton()).camera
    let cam = Camera
    const ctx = Ludic.canvas.context
    ctx.fillStyle = "rgba(0, 0, 0, .90)"
    ctx.fillRect(0, 0, cam.width, cam.height)
  }
}
