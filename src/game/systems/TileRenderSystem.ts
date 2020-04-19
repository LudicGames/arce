import Ludic, { Vector2 }from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import {
  isTileComponent,
  SizeComponent,
  TileStateComponent,
  CubeCoordinateComponent,
  CameraComponent,
} from '../components'

import { QueryType } from '/src/ecsy'
import { Hex, cube_to_vector2, CubeCoordinate } from '../utils/Hex'
import Color from 'color'

export default class TileRenderSystem extends System {
  canvas: OffscreenCanvas
  context: OffscreenCanvasRenderingContext2D
  typeSettings: any = {
    "grass": {
      fillStyle: "#9cf196",
      strokeStyle: "#FFFFFF",
      lineWidth: .15
    },
    "stone": {
      fillStyle: "#39375b",
      strokeStyle: "#FFFFFF",
      lineWidth: .15
    },
    "dirt": {
      fillStyle: "#f0dd92",
      strokeStyle: "#FFFFFF",
      lineWidth: .15
    }
  }

  queries: {
    tiles: QueryType
    camera: QueryType
  }

  init(){
    const { width, height } = Ludic.canvas.element
    this.canvas = new OffscreenCanvas(width, height)
    this.context = this.canvas.getContext('2d', {alpha: false})
  }

  execute(deltaTime: number): void {
    const camera = this.queries.camera.results[0].getComponent(CameraComponent).value
    const ctx = Ludic.canvas.context


    this.queries.tiles.results.forEach((tile: Entity) => {
      this.renderTile(ctx, tile)
    })
  }

  renderTile(ctx: CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D, tile: Entity): void {
    const state: TileStateComponent = tile.getComponent(TileStateComponent)
    const size: number = tile.getComponent(SizeComponent).value
    const coords: CubeCoordinate = tile.getComponent(CubeCoordinateComponent)
    const pos: Vector2 = cube_to_vector2({x: coords.x, y: coords.y, z: coords.z}, size)
    const x: number = pos.x
    const y: number = pos.y


    const settings: any = this.typeSettings[state.type]

    ctx.lineWidth   = settings.lineWidth
    ctx.fillStyle   = state.status == "active" ? Color(settings.fillStyle).darken(.5) : settings.fillStyle
    ctx.strokeStyle = settings.strokeStyle


    // ctx.translate(x + size * Math.cos(0), y + size * Math.sin(0))

    ctx.beginPath()
    // ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0))
    for(let side = 0; side < 7; side++) {
      ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6))
    }
    ctx.fill()
    ctx.stroke()


    if(Ludic.debug){
      ctx.font = '1px serif'
      ctx.fillStyle = 'white'
      ctx.scale(1, -1)
      ctx.fillText(`${coords.x}  ${coords.y}  ${coords.z}`, x - 1.5, -y)
      // ctx.fillText(`q: ${state.hex.offsetCoordinate.q}  r: ${state.hex.offsetCoordinate.r}`, x - 1.5, -y)
      // ctx.fillText(`q: ${state.hex.q} r:${state.hex.r}`, x - 1.5, -y)
    }
  }
}

// @ts-ignore
TileRenderSystem.queries = {
  tiles: { components: [isTileComponent]},
  camera: { components: [CameraComponent], mandatory: true},
}
