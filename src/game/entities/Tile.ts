import { Entity } from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import RenderComponent from '../components/RenderComponent'
import TileStateComponent from '../components/TileStateComponent'

export default class Tile extends Entity {
  constructor(x: number, y: number, sideLength: number, tileType: string){
    super()
    this.add(new PositionComponent(x, y))
    this.add(new RenderComponent(this.render.bind(this)))
    this.add(new TileStateComponent(sideLength, tileType))
  }

  render(ctx: CanvasRenderingContext2D, position: PositionComponent, state: TileStateComponent){
    // ctx.shadowColor = "red"
    // ctx.shadowOffsetX = 0
    // ctx.shadowOffsetY = 0
    // ctx.shadowBlur = 15

    const x = position.x
    const y = position.y
    ctx.strokeStyle = state.color

    if(state.active) ctx.fillStyle = 'rgba(52, 152, 219, .8)'
    ctx.lineWidth = .1

    ctx.beginPath()
    ctx.moveTo(x + state.sideLength * Math.cos(0), y + state.sideLength * Math.sin(0))
    for(let side = 0; side < 7; side++) {
      ctx.lineTo(x + state.sideLength * Math.cos(side * 2 * Math.PI / 6), y + state.sideLength * Math.sin(side * 2 * Math.PI / 6));
    }
    ctx.fill()
    ctx.stroke()
  }
}
