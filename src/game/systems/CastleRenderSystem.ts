import Ludic, { Camera, Vector2 } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import {
  isCastleComponent,
  SizeComponent,
  CubeCoordinateComponent,
  CameraComponent,
} from '../components'

import { QueryType } from '/src/ecsy'
import { Hex, cubeCoordinateToVector2, CubeCoordinate } from '../utils/Hex'


export default class CastleRenderSystem extends System {
  queries: {
    castles: QueryType
    camera: QueryType
  }


  execute(deltaTime: number): void {
    const camera = this.queries.camera.results[0].getComponent(CameraComponent).value
    const ctx = Ludic.canvas.context

    ctx.save()

    this.queries.castles.results.forEach((castle: Entity) => {
      ctx.save()
      this.render(ctx, castle)
      ctx.restore()
    })

    ctx.restore()
  }

  render(ctx: CanvasRenderingContext2D, castle: Entity): void {
    const size: number = castle.getComponent(SizeComponent).value
    const coords: CubeCoordinate = castle.getComponent(CubeCoordinateComponent)
    const pos: Vector2 = cubeCoordinateToVector2({x: coords.x, y: coords.y, z: coords.z}, size)
    const x: number = pos.x
    const y: number = pos.y

    ctx.fillStyle = "rgba(67, 211, 35, 1)"

    ctx.beginPath();
    ctx.moveTo(pos.x - (size / 2), pos.y - (size / 2))
    ctx.lineTo(pos.x, pos.y + (size / 2))
    ctx.lineTo(pos.x + (size / 2), pos.y - (size / 2))
    ctx.fill()
  }
}


// @ts-ignore
CastleRenderSystem.queries = {
  castles: { components: [isCastleComponent]},
  camera: { components: [CameraComponent], mandatory: true},
}
