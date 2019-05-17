import { System } from '@ludic/ein'
import Ludic from '@ludic/ludic';
import { CameraComponentMapper } from '../components/mappers'

export default class CameraRenderSystem extends System {

  update(){
    const {camera} = this.engine.getSingletonComponent(CameraComponentMapper)
    camera.update(Ludic.canvas.context)
  }
}