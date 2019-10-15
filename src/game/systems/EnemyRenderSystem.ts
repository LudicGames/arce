import Ludic from '@ludic/ludic'
import { PositionComponent,
         CameraComponent,
         isEnemyComponent,
         SizeComponent,
       } from '../components'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'

export default class EnemyRenderSystem extends System {
  engine: World

  queries: {
    enemies: QueryType
    camera: QueryType
  }

  execute(deltaTime: number): void {
    const ctx = Ludic.canvas.context
    const camera = this.queries.camera.results[0].getComponent(CameraComponent).value

    ctx.save()
    this.queries.enemies.results.forEach((entity: Entity) => {
      ctx.save()
      this.render(ctx, entity)
      ctx.restore()
    })
    ctx.restore()
  }

  render(ctx: CanvasRenderingContext2D, enemy: Entity){
    const pos = enemy.getComponent(PositionComponent)
    const size: number = enemy.getComponent(SizeComponent).value

    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(pos.x + (size / 2), pos.y + (size / 2), size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// @ts-ignore
EnemyRenderSystem.queries = {
  enemies: { components: [isEnemyComponent]},
  camera: { components: [CameraComponent]},
}
