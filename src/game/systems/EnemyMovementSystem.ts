import Ludic, { Vector2 } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, IteratingSystem, Engine} from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import MovementComponent from '../components/MovementComponent'
import EnemyStateComponent from '../components/EnemyStateComponent'
import CastleStateComponent from '../components/CastleStateComponent'

export default class EnemyMovementSystem extends IteratingSystem {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private mm: ComponentMapper<MovementComponent> = ComponentMapper.getFor(MovementComponent)
  private sm: ComponentMapper<EnemyStateComponent> = ComponentMapper.getFor(EnemyStateComponent)
  private cm: ComponentMapper<CastleStateComponent> = ComponentMapper.getFor(CastleStateComponent)

  constructor(){
    super(Family.all([PositionComponent, MovementComponent, EnemyStateComponent]).get())
  }

  processEntity(entity: Entity, deltaTime: number) {
	  const p = this.pm.get(entity)
    const m = this.mm.get(entity)
    const s = this.sm.get(entity)
    const c = this.cm.get(entity)

    const cv = new Vector2(0, -.1)
    if(p && m){
		  p.x += cv.x
		  p.y += cv.y
    }
  }
}
