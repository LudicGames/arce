import Ludic from '@ludic/ludic';
import { System } from 'ecsy'
import CameraComponent from '../components/CameraComponent';
import { QueryType } from '/src/ecsy';

class CameraRenderSystem extends System {

  queries!: {
    camera: QueryType
  }

  execute(){
    // const {camera} = this.engine.getSingletonComponent(CameraComponentMapper)
    this.queries.camera.results.forEach(ent => {
      const camera = ent.getComponent(CameraComponent).value
      camera.update(Ludic.canvas.context)
    })
  }
}

// @ts-ignore
CameraRenderSystem.queries = {
  camera: {components: [CameraComponent]},
}

export default CameraRenderSystem