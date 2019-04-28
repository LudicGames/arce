import {Screen} from '@ludic/ludic'
import {Engine} from  '@ludic/ein'

import PositionSystem from '../systems/PositionSystem'
import PositionComponent from '../components/PositionComponent'

export default class GameScreen extends Screen {
  engine: Engine

  constructor() {
    super()
    this.engine = new Engine()
  }

  public onAddedToManager() {
    console.log("added to Manager")
    this.initSystems()
    this.initEntities()
  }

  initSystems(){
    this.engine.addSystem(new PositionSystem())
  }

  initEntities(){
	  const entity: Entity = this.engine.createEntity()
	  entity.add(new PositionComponent(10, 0))

    this.engine.addEntity(entity)
  }

  public update(delta: number){
	  this.engine.update(delta)
  }
}
