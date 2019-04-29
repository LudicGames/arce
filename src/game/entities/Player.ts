import { Entity } from '@ludic/ein'

import MovementComponent from '../components/MovementComponent'
import PositionComponent from '../components/PositionComponent'
import RenderComponent from '../components/RenderComponent';


export default class Player extends Entity {

  constructor(){
    super()

    this.add(new PositionComponent(2, 2))
    this.add(new MovementComponent())
    this.add(new RenderComponent(this.render))
  }

  render(ctx: CanvasRenderingContext2D, position: PositionComponent){
    ctx.fillStyle = 'blue'
    ctx.fillRect(position.x, position.y, 2, 2)
  }


}
