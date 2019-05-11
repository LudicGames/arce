import { Entity } from '@ludic/ein'

import MovementComponent from '../components/MovementComponent'
import PositionComponent from '../components/PositionComponent'
import RenderComponent from '../components/RenderComponent'
import PlayerStateComponent from '../components/PlayerStateComponent'

export default class Player extends Entity {

  constructor(){
    super()

    this.add(new PositionComponent(2, 2))
    this.add(new MovementComponent())
    this.add(new RenderComponent(this.render))
    this.add(new PlayerStateComponent())
  }

  render(ctx: CanvasRenderingContext2D, position: PositionComponent, state: PlayerStateComponent){
    ctx.fillStyle = state.color
    ctx.fillRect(position.x, position.y, state.size, state.size)
  }


}
