import Ludic from '@ludic/ludic'
import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'
import PositionComponent from '../components/PositionComponent'
import GamepadComponent from '../components/GamepadComponent'

export default class PositionSystem extends System {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private gm: ComponentMapper<GamepadComponent> = ComponentMapper.getFor(GamepadComponent)

  public entities: Entity[]
  public components = [PositionComponent]
  public family: Family

  constructor(){
    super()
    this.family = Family.all([PositionComponent, GamepadComponent]).get()
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

		  const p: PositionComponent = this.pm.get(entity)
		  const g: GamepadComponent = this.gm.get(entity)
      const gamepad = Ludic.input.gamepad.get(g.index)
      
      if(p){
        // Update the position based on gamepad actions
        if(gamepad.right.pressed) {
          p.x += 0.2
        } else if(gamepad.left.pressed) {
          p.x -= 0.2
        }
        if(gamepad.up.pressed) {
          p.y += 0.2
        } else if(gamepad.down.pressed) {
          p.y -= 0.2
        }
      }
    })
  }
}
