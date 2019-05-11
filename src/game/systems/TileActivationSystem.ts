import intersects from 'intersects'
import Ludic, { Camera } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import TileStateComponent from '../components/TileStateComponent'
import PlayerStateComponent from '../components/PlayerStateComponent'

export default class TileActivationSystem extends System {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private psm: ComponentMapper<PlayerStateComponent> = ComponentMapper.getFor(PlayerStateComponent)
  private tsm: ComponentMapper<TileStateComponent> = ComponentMapper.getFor(TileStateComponent)

  public entities: Entity[]
  public components = [PositionComponent]
  public family: Family

  camera: Camera

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

    let player = this.entities.find(entity => {
      return !!this.psm.get(entity)
    })

    if(player){
      const playerPos = this.pm.get(player)
      const playerState = this.psm.get(player)

      const xb = playerPos.x 	//top-left corner of box
      const yb = playerPos.y 	//top-left corner of box
      const wb = playerState.size 	//width of box
      const hb = playerState.size  	//height of box

      this.entities.forEach((entity: Entity) => {
        // Only Tiles
        let tileState: TileStateComponent = this.tsm.get(entity)
        if(!!tileState){
          const pos: PositionComponent = this.pm.get(entity)
          let points = []	// [x1, y1, x2, y2, ... xn, yn] of polygon
          let x = pos.x
          let y = pos.y
          let sideLength = tileState.sideLength

          points.push(x + sideLength * Math.cos(0), y + sideLength * Math.sin(0))
          for(let side = 0; side < 7; side++){
            points.push(x + sideLength * Math.cos(side * 2 * Math.PI / 6))
            points.push(y + sideLength * Math.sin(side * 2 * Math.PI / 6))
          }

          if(intersects.boxPolygon(xb, yb, wb, hb, points)){
            // console.log("intersect")
            tileState.active = true
          } else {
            tileState.active = false
          }
        }
      })
    }
  }
}
