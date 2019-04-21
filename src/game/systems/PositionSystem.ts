import ComponentMapper from 'ein/ComponentMapper'
import Family from 'ein/Family'
import Entity from 'ein/Entity'
import System from 'ein/System'
import Engine from 'ein/Engine'

import PositionComponent from '../components/position'

interface Klass<T> {
  new(): T
}

export default class PositionSystem extends System {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent as Klass<PositionComponent>)

  public entities: Entity[]
  public components = [PositionComponent]
  public family: Family

  constructor(){
    super()
    this.family = Family.all([PositionComponent]).get()
    // console.log("this.family: ", this.family)
  }

  public addedToEngine(engine: Engine): void {
    // console.log(this.family)
    this.entities = engine.getEntitiesFor(this.family)
    this.engine = engine
  }

  public removedFromEngine(engine: Engine): void {
    this.entities = []
	  // console.log("MovementSystem removed from engine.")
  }

  public update(deltaTime: number): void {
    if(this.engine)  this.entities = this.engine.getEntitiesFor(this.family)
    this.entities.forEach((entity: Entity) => {

		  const p: PositionComponent | null = this.pm.get(entity)

      if(p){
		    // p.x += m.velocityX * deltaTime
		    // p.y += m.velocityY * deltaTime
      }
    })
  }
}
