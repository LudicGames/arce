import Ludic from '@ludic/ludic'
import { System, Entity } from '@ludic/ein'
import { isTowerComponent, TowerTypeComponent, PositionComponent } from '../components'

export default class TowerRenderSystem extends System {

  queries!: {
    towers: QueryType
  }

  execute() {
    const ctx = Ludic.canvas.context
    this.queries.towers.results.forEach((tower: Entity) => {
      this.renderTower(ctx, tower)
    })

  }

  renderTower(ctx: CanvasRenderingContext2D, tower: Entity){
    const pos = tower.getComponent(PositionComponent)
    const type = tower.getComponent(TowerTypeComponent).value
    ctx.fillStyle = type
    ctx.fillRect(pos.x-1, pos.y-0.5, 2, 3)
  }
}

// @ts-ignore
TowerRenderSystem.queries = {
  towers: {
    components: [isTowerComponent, TowerTypeComponent, PositionComponent],
    mandatory: true,
  },
}
