import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'
import PositionComponent from '../components/PositionComponent'
import RenderComponent from '../components/RenderComponent'
import PlayerStateComponent from '../components/PlayerStateComponent'
import Ludic, { Camera } from '@ludic/ludic'
import { MechComponentMapper, CameraComponentMapper } from '../components/mappers';
import Player from '../entities/Player';

export default class PlayerRenderSystem extends System {
  private rm: ComponentMapper<RenderComponent> = ComponentMapper.getFor(RenderComponent)
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private sm: ComponentMapper<PlayerStateComponent> = ComponentMapper.getFor(PlayerStateComponent)

  public entities: Entity[]
  public components = [PlayerStateComponent]
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
    const {camera} = this.engine.getSingletonComponent(CameraComponentMapper)
    camera.drawAxes(ctx)
    this.entities.forEach((entity: Entity) => {
      ctx.save()
      this.renderPlayer(ctx, entity)
      ctx.restore()
    })
    ctx.restore()
  }

  renderPlayer(ctx: CanvasRenderingContext2D, player: Player){
    const r = this.rm.get(player)
    const pos = this.pm.get(player)
    const state = this.sm.get(player)
    const mechComp = MechComponentMapper.get(player)

    ctx.fillStyle = mechComp.type
    ctx.beginPath()
    ctx.arc(pos.x + (state.size / 2), pos.y + (state.size / 2), state.size, 0, Math.PI * 2)
    ctx.fill()
  }
}
