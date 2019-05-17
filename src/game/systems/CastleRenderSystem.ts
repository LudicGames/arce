import Ludic, { Camera } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import CastleStateComponent from '../components/CastleStateComponent'
import { CameraComponentMapper } from '../components/mappers';
import TileStateComponent from '../components/TileStateComponent';

export default class CastleRenderSystem extends System {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
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
    if(this.engine) {
      this.entities = this.engine.getEntitiesFor(this.family)
    }
    ctx.save()
    this.entities.forEach((entity: Entity) => {
      const state: TileStateComponent = this.tm.get(entity)
      const pos: PositionComponent = this.pm.get(state.tile)

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
