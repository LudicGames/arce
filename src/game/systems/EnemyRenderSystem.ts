import Ludic, { Camera } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'
import PositionComponent from '../components/PositionComponent'
import EnemyStateComponent from '../components/EnemyStateComponent'
import Enemy from '../entities/Enemy'

export default class EnemyRenderSystem extends System {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private sm: ComponentMapper<EnemyStateComponent> = ComponentMapper.getFor(EnemyStateComponent)

  public entities: Entity[]
  public components = [EnemyStateComponent]
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
    this.camera.update(ctx)
    this.entities.forEach((entity: Entity) => {
      ctx.save()
      this.renderEnemy(ctx, entity)
      ctx.restore()
    })
    ctx.restore()
  }

  renderEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy){
    const pos = this.pm.get(enemy)
    const state = this.sm.get(enemy)

    ctx.fillStyle = state.color
    ctx.fillRect(pos.x, pos.y, state.size, state.size)
  }
}
