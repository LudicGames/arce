import { Entity } from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import RenderComponent from '../components/RenderComponent'
import FillComponent from '../components/FillComponent'

export default class Tile extends Entity {
  constructor(x: number, y: number, sideLength: number){
    super()

    this.sideLength = sideLength
    this.add(new PositionComponent(x, y))
    this.add(new RenderComponent(this.render.bind(this)))
  }

  render(ctx: CanvasRenderingContext2D, position: PositionComponent){
    // ctx.shadowColor = "red"
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 0;
    // ctx.shadowBlur = 15;

    // ctx.strokeRect(position.x, position.y, this.sideLength, this.sideLength)

    const x = position.x
    const y = position.y
    ctx.strokeStyle = 'red'
    ctx.lineWidth = .1

    ctx.beginPath()
    ctx.moveTo(x + this.sideLength * Math.cos(0), y + this.sideLength * Math.sin(0))
    let side = 0
    for(side; side < 7; side++) {
      ctx.lineTo(x + this.sideLength * Math.cos(side * 2 * Math.PI / 6), y + this.sideLength * Math.sin(side * 2 * Math.PI / 6));
    }

    ctx.stroke()
  }
}
