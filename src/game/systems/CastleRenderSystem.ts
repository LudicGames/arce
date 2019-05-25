import Ludic, { Camera } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'

import CastleStateComponent from '../components/CastleStateComponent'

export default class CastleRenderSystem extends System {
  private tm: ComponentMapper<CastleStateComponent> = ComponentMapper.getFor(CastleStateComponent)

  public entities: Entity[]
  public components = [CastleStateComponent]
  public family: Family

  constructor(){
    super()
    this.family = Family.all(this.components).get()
  }

  public addedToEngine(engine: Engine): void {
    this.entities = engine.getEntitiesFor(this.family)
    this.engine = engine
  }

  public removedFromEngine(engine: Engine): void {
    this.entities = []
  }

  public update(deltaTime: number): void {
    const ctx = Ludic.canvas.context
    this.entities = this.engine.getEntitiesFor(this.family)

    ctx.save()
    this.entities.forEach((entity: Entity) => {
      const state: CastleStateComponent = this.tm.get(entity)
      const pos = state.hex.position

      ctx.save()
      ctx.fillStyle = "lightgreen"

      ctx.beginPath();
      ctx.moveTo(pos.x - (state.size / 2), pos.y - (state.size / 2))
      ctx.lineTo(pos.x, pos.y + (state.size / 2))
      ctx.lineTo(pos.x + (state.size / 2), pos.y - (state.size / 2))
      ctx.fill()

      // ctx.fillRect(pos.x - (state.size / 2), pos.y - (state.size / 2), state.size, state.size)
      ctx.restore()
    })
    ctx.restore()
  }
}
