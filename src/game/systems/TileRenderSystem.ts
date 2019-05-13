import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'
import PositionComponent from '../components/PositionComponent'
import TileStateComponent from '../components/TileStateComponent'
import Ludic, { Camera } from '@ludic/ludic'

export default class TileRenderSystem extends System {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private tm: ComponentMapper<TileStateComponent> = ComponentMapper.getFor(TileStateComponent)

  public entities: Entity[]
  public components = [TileStateComponent]
  public family: Family

  camera: Camera

  constructor(camera: Camera){
    super()
    this.family = Family.all(this.components).get()
    this.camera = camera
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
    Ludic.canvas.clear()
    this.camera.update(ctx)
    this.camera.drawAxes(ctx)
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
      ctx.moveTo(x + state.sideLength * Math.cos(0), y + state.sideLength * Math.sin(0))
      for(let side = 0; side < 7; side++) {
        ctx.lineTo(x + state.sideLength * Math.cos(side * 2 * Math.PI / 6), y + state.sideLength * Math.sin(side * 2 * Math.PI / 6));
      }
      ctx.fill()
      ctx.stroke()

      ctx.restore()
    })
    ctx.restore()
  }
}
