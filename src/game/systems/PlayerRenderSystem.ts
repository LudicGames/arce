import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'
import PositionComponent from '../components/PositionComponent'
import RenderComponent from '../components/RenderComponent'
import PlayerStateComponent from '../components/PlayerStateComponent'
import Ludic, { Camera } from '@ludic/ludic'

export default class PlayerRenderSystem extends System {
  private rm: ComponentMapper<RenderComponent> = ComponentMapper.getFor(RenderComponent)
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private sm: ComponentMapper<PlayerStateComponent> = ComponentMapper.getFor(PlayerStateComponent)

  public entities: Entity[]
  public components = [PlayerStateComponent]
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
    // Ludic.canvas.clear()
    this.camera.update(ctx)
    this.camera.drawAxes(ctx)
    this.entities.forEach((entity: Entity) => {
      ctx.save()

      const r: RenderComponent = this.rm.get(entity)
      const pos: PositionComponent = this.pm.get(entity)
      const state: PlayerStateComponent = this.sm.get(entity)
      if(r){
        r.renderFn(ctx, pos, state)
      }
      ctx.restore()
    })
    ctx.restore()
  }
}
