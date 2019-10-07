import Ludic from '@ludic/ludic';
import { System } from 'ecsy'

export default class CameraRenderSystem extends System {

  update(){
    const {camera} = this.engine.getSingletonComponent(CameraComponentMapper)
    camera.update(Ludic.canvas.context)
  }
}
