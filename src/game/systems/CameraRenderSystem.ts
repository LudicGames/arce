import Ludic from '@ludic/ludic';
import { System } from '@ludic/ein'
import { CameraComponent } from '../components'


class CameraRenderSystem extends System {

  queries!: {
    camera: QueryType
  }

  execute(){
    // const {camera} = this.engine.getSingletonComponent(CameraComponentMapper)
    this.queries.camera.results.forEach(ent => {
      const camera = ent.getComponent(CameraComponent).value
      camera.clearAndUpdate(Ludic.canvas.context)
    })
  }
}

// @ts-ignore
CameraRenderSystem.queries = {
  camera: {components: [CameraComponent]},
}

export default CameraRenderSystem
