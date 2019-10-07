import Ludic from '@ludic/ludic'
import { PositionComponent, RenderComponent, PlayerStateComponent, CameraComponent, MechComponent } from '../components'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'

export default class PlayerRenderSystem extends System {

  engine: World

  queries: {
    entities: QueryType
    camera: QueryType
  }

  execute(deltaTime: number): void {
    const ctx = Ludic.canvas.context

    ctx.save()
    const camera = this.queries.camera.results[0].getComponent(CameraComponent).value
    camera.drawAxes(ctx)
    this.queries.entities.results.forEach((entity: Entity) => {
      ctx.save()
      this.renderPlayer(ctx, entity)
      ctx.restore()
    })
    ctx.restore()
  }

  renderPlayer(ctx: CanvasRenderingContext2D, player: Entity){
    const pos = player.getComponent(PositionComponent)
    const state = player.getComponent(PlayerStateComponent)
    const mechComp = player.getComponent(MechComponent)

    ctx.fillStyle = mechComp.type
    ctx.beginPath()
    ctx.arc(pos.x + (state.size / 2), pos.y + (state.size / 2), state.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// @ts-ignore
PlayerRenderSystem.queries = {
  entities: { components: [PlayerStateComponent]},
  camera: { components: [CameraComponent]},
}
