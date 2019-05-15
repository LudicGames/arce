import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'

import EnemyStateComponent from '../components/EnemyStateComponent'
import PositionComponent from '../components/PositionComponent'
import MovementComponent from '../components/MovementComponent'

const pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)

export default class Enemy extends Entity {

  constructor(tile: Tile){
    super()

    const pos = pm.get(tile)
    this.add(new PositionComponent(pos.x, pos.y))
    this.add(new MovementComponent())
    this.add(new EnemyStateComponent(tile))
  }
}
