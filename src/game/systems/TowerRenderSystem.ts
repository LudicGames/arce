import Ludic, { Vector2 } from '@ludic/ludic';
import { System, Family, Entity, ComponentMapper, IteratingSystem } from '@ludic/ein'


import PositionComponent from '../components/PositionComponent'
import TowerStateComponent from '../components/TowerStateComponent'

export default class TowerRenderSystem extends IteratingSystem {
  PM  = new ComponentMapper(PositionComponent)
  TSM = new ComponentMapper(TowerStateComponent)

  constructor(){
    super(Family.all([TowerStateComponent]).get())
  }

  processEntity(ent: Entity, deltaTime: number) {
    const ctx = Ludic.canvas.context
    const pos: PositionComponent = this.PM.get(ent)
    const state: TowerStateComponent = this.TSM.get(ent)

    const x: number = pos.x
    const y: number = pos.y
    const size: number = state.size

    ctx.save()

    ctx.strokeStyle = state.color

    ctx.fillStyle = state.color
    ctx.lineWidth = .1

    ctx.beginPath()
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0))
    for(let side = 0; side < 7; side++) {
      ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6))
    }
    ctx.fill()
    ctx.stroke()

    ctx.restore()

  }
}
