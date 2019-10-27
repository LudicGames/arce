import Ludic from '@ludic/ludic'
import { PositionComponent,
         RenderComponent,
         PlayerStateComponent,
         CameraComponent,
         MechComponent,
         SizeComponent
       } from '../components'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import Color from 'color'

export default class PlayerRenderSystem extends System {

  engine: World

  queries: {
    players: QueryType
    camera: QueryType
  }

  execute(deltaTime: number): void {
    const ctx = Ludic.canvas.context

    ctx.save()
    const camera = this.queries.camera.results[0].getComponent(CameraComponent).value
    camera.drawAxes(ctx)
    this.queries.players.results.forEach((entity: Entity) => {
      ctx.save()
      this.renderPlayer(ctx, entity)
      ctx.restore()
    })
    ctx.restore()
  }

  renderPlayer(ctx: CanvasRenderingContext2D, player: Entity){
    const pos = player.getComponent(PositionComponent)
    const state = player.getComponent(PlayerStateComponent)
    const size: number = player.getComponent(SizeComponent).value
    const mechComp = player.getComponent(MechComponent)

    if(state.status == "HURT"){
      ctx.fillStyle = Color(mechComp.type).lighten(.6)
    } else {
      ctx.fillStyle = mechComp.type
    }

    ctx.translate(pos.x, pos.y)
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
