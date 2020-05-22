import Ludic, { Camera, Vector2 } from '@ludic/ludic'
import { System, World, Entity } from '@ludic/ein'
import {
  isCastleComponent,
  isTileComponent,
  SizeComponent,
  HealthComponent,
  CubeCoordinateComponent,
} from '../components'


import { Hex, cube_to_vector2, CubeCoordinate } from '../utils/Hex'


export default class CastleRenderSystem extends System {
  queries: {
    castles: QueryType
    tiles: QueryType
  }


  execute(deltaTime: number): void {
    const ctx = Ludic.canvas.context
    const tileSize: number = this.queries.tiles.results[0].getComponent(SizeComponent).value

    this.queries.castles.results.forEach((castle: Entity) => {
      this.render(ctx, castle, tileSize)
    })
  }

  render(ctx: CanvasRenderingContext2D, castle: Entity, tileSize: number): void {
    const size: number = castle.getComponent(SizeComponent).value
    const health: number = castle.getComponent(HealthComponent).value
    const coords: CubeCoordinate = castle.getComponent(CubeCoordinateComponent)
    const pos: Vector2 = cube_to_vector2({x: coords.x, y: coords.y, z: coords.z}, tileSize)
    const x: number = pos.x
    const y: number = pos.y

    ctx.fillStyle = "#4baea0"

    ctx.beginPath();
    ctx.moveTo(pos.x - (size / 2), pos.y - (size / 2))
    ctx.lineTo(pos.x, pos.y + (size / 2))
    ctx.lineTo(pos.x + (size / 2), pos.y - (size / 2))
    ctx.fill()

    ctx.font = '1px serif'
    ctx.fillStyle = 'white'
    ctx.scale(1, -1)
    ctx.fillText(`${health}`, x - .3, -y + .5)
  }
}


// @ts-ignore
CastleRenderSystem.queries = {
  castles: { components: [isCastleComponent]},
  tiles: { components: [isTileComponent], mandatory: true},
}
