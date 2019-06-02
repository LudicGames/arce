import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'
import PositionComponent from '../components/PositionComponent'
import TileStateComponent from '../components/TileStateComponent'
import Ludic from '@ludic/ludic'

export default class TileRenderSystem extends System {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private tm: ComponentMapper<TileStateComponent> = ComponentMapper.getFor(TileStateComponent)

  public entities: Entity[]
  public components = [TileStateComponent]
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
      ctx.save()

      const pos: PositionComponent = this.pm.get(entity)
      const state: TileStateComponent = this.tm.get(entity)

      const x = pos.x
      const y = pos.y
      ctx.strokeStyle = state.color

      ctx.fillStyle = state.fill
      ctx.lineWidth = .1

      ctx.beginPath()
      ctx.moveTo(x + state.hex.sideLength * Math.cos(0), y + state.hex.sideLength * Math.sin(0))
      for(let side = 0; side < 7; side++) {
        ctx.lineTo(x + state.hex.sideLength * Math.cos(side * 2 * Math.PI / 6), y + state.hex.sideLength * Math.sin(side * 2 * Math.PI / 6))
      }
      ctx.fill()
      ctx.stroke()

      if(Ludic.debug){
        ctx.save()
        ctx.font = '1px serif'
        ctx.fillStyle = 'black'
        ctx.scale(1, -1)
        // ctx.fillText(`${state.hex.x}  ${state.hex.y}  ${state.hex.z}`, x - 1.5, -y)
        // ctx.fillText(`q: ${state.hex.q} r:${state.hex.r}`, x - 1.5, -y)
        ctx.restore()
      }

      ctx.restore()
    })
    ctx.restore()
  }
}
