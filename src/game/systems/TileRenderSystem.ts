import Ludic, { Vector2 }from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import {
  isTileComponent,
  SizeComponent,
  CubeCoordinateComponent,
  CameraComponent,
} from '../components'

import { QueryType } from '/src/ecsy'
import { Hex, cubeCoordinateToVector2, CubeCoordinate } from '../utils/Hex'

export default class TileRenderSystem extends System {
  queries: {
    tiles: QueryType
    camera: QueryType
  }

  execute(deltaTime: number): void {
    const camera = this.queries.camera.results[0].getComponent(CameraComponent).value
    const ctx = Ludic.canvas.context

    ctx.save()

    this.queries.tiles.results.forEach((tile: Entity) => {
      ctx.save()
      this.renderTile(ctx, tile)
      ctx.restore()
    })

    ctx.restore()
  }

  renderTile(ctx: CanvasRenderingContext2D, tile: Entity): void {
    const size: number = tile.getComponent(SizeComponent).value
    const coords: CubeCoordinate = tile.getComponent(CubeCoordinateComponent)
    const pos: Vector2 = cubeCoordinateToVector2({x: coords.x, y: coords.y, z: coords.z}, size)
    const x: number = pos.x
    const y: number = pos.y

    ctx.lineWidth = .15
    ctx.fillStyle = "blue"
    ctx.strokeStyle = "red"


    ctx.beginPath()
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0))
    for(let side = 0; side < 7; side++) {
      ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6))
    }
    ctx.fill()
    ctx.stroke()


    // if(Ludic.debug){
    //   ctx.save()
    //   ctx.font = '1px serif'
    //   ctx.fillStyle = 'white'
    //   ctx.scale(1, -1)
    //   // ctx.fillText(`${state.hex.x}  ${state.hex.y}  ${state.hex.z}`, x - 1.5, -y)
    //   // ctx.fillText(`q: ${state.hex.offsetCoordinate.q}  r: ${state.hex.offsetCoordinate.r}`, x - 1.5, -y)
    //   // ctx.fillText(`q: ${state.hex.q} r:${state.hex.r}`, x - 1.5, -y)
    //   ctx.restore()
    // }

  }
}

// @ts-ignore
TileRenderSystem.queries = {
  tiles: { components: [isTileComponent]},
  camera: { components: [CameraComponent], mandatory: true},
}
