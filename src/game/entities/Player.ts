import { Entity, Engine} from 'ein'

import MovementComponent from '../components/MovementComponent.ts'
import PositionComponent from '../components/PositionComponent.ts'

export default class Player {
  public movement: MovementComponent
  public position: PositionComponent
  public entity: Entity
  public engine: Engine

  constructor(engine: Engine){
    this.engine = engine
    this.entity = engine.createEntity()

    this.position = new PositionComponent(2, 2)
    this.movement = new MovementComponent(0, 0)

    this.entity.add(this.position)
    this.entity.add(this.movement)

    engine.addEntity(this.entity)
  }


}
