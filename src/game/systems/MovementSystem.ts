import ComponentMapper from 'ein/ComponentMapper'
import Family from 'ein/Family'
import Entity from 'ein/Entity'
import System from 'ein/System'
import Engine from 'ein/Engine'

import PositionComponent from '../components/PositionComponent'
import MovementComponent from '../components/MovementComponent'

export default class MovementSystem extends System {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent.constructor.prototype)
  private mm: ComponentMapper<MovementComponent> = ComponentMapper.getFor(MovementComponent.constructor.prototype)

  public entities: Entity[]
  public components = [PositionComponent, MovementComponent]
  public family: Family

  constructor(){
    super()
    this.family = Family.all([PositionComponent, MovementComponent]).get()
  }

  public addedToEngine(engine: Engine): void {
    this.entities = engine.getEntitiesFor(this.family)
    this.engine = engine
  }

  public removedFromEngine(engine: Engine): void {
    this.entities = []
  }

  public update(deltaTime: number): void {
    if(this.engine)  this.entities = this.engine.getEntitiesFor(this.family)

    this.entities.forEach((entity: Entity) => {

		  const p: PositionComponent | null = this.pm.get(entity)
		  const m: MovementComponent | null = this.mm.get(entity)

      if(p && m){
		    p.x += m.velocityX * deltaTime
		    p.y += m.velocityY * deltaTime
      }
    })
  }
}