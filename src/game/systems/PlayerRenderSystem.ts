import Ludic, { RenderingContext2D } from '@ludic/ludic'
import { PositionComponent,
         PlayerStateComponent,
         CameraComponent,
         MechComponent,
         SizeComponent
       } from '../components'
import { System, World, Entity } from '@ludic/ein'

import Color from 'color'

export default class PlayerRenderSystem extends System {

  engine: World

  queries: {
    players: QueryType
    camera: QueryType
  }

  execute(deltaTime: number): void {
    const ctx = Ludic.canvas.context

    const camera = this.queries.camera.results[0].getComponent(CameraComponent).value
    camera.drawAxes(ctx)
    this.queries.players.results.forEach((entity: Entity) => {
      this.renderPlayer(ctx, entity)
    })
  }

  renderPlayer(ctx: RenderingContext2D, player: Entity){
    const pos = player.getComponent(PositionComponent)
    const state = player.getComponent(PlayerStateComponent)
    const size: number = player.getComponent(SizeComponent).value
    const mechComp = player.getComponent(MechComponent)

    if(state.status == "HURT"){
      ctx.fillStyle = Color(mechComp.type).lighten(.6)
    } else {
      ctx.fillStyle = mechComp.type
    }

    // console.log(pos.x, pos.y)
    ctx.translate(pos.x, pos.y)
    // ctx.translate(0, 0)
    ctx.beginPath()
    ctx.arc(0, 0, size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// @ts-ignore
PlayerRenderSystem.queries = {
  players: { components: [PlayerStateComponent]},
  camera: { components: [CameraComponent]},
}
