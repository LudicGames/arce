import { System, Family, Entity, ComponentMapper } from '@ludic/ein'
import { GamepadComponent, PositionComponent, MechComponent } from '../../components'
import Ludic, { Camera } from '@ludic/ludic';

export default class CharacterSelectRenderer extends System {

  family: Family
  mechFamily: Family
  camera: Camera

  positionMapper = new ComponentMapper(PositionComponent)
  gamepadMapper = new ComponentMapper(GamepadComponent)
  mechMapper = new ComponentMapper(MechComponent)

  constructor(camera: Camera){
    super()
    this.family = Family.all([GamepadComponent]).get()
    this.mechFamily = Family.all([MechComponent, PositionComponent]).exclude([GamepadComponent]).get()
    this.camera = camera
  }

  getEntities(){
    return this.engine.getEntitiesFor(this.family)
  }
  getMechs(){
    return this.engine.getEntitiesFor(this.mechFamily)
  }

  update(){
    const ctx = Ludic.canvas.context

    ctx.save()
    Ludic.canvas.clear()
    this.camera.update(ctx)
    this.camera.drawAxes(ctx)

    // render the mechs in a row
    this.getMechs().forEach((mech) => {
      ctx.save()

      const pos = this.positionMapper.get(mech)
      const mechComp = this.mechMapper.get(mech)
      ctx.fillStyle = mechComp.type
      ctx.fillRect(pos.x, pos.y, 3, 3)

      ctx.restore()
    })
    // render the player indicator
    this.getEntities().forEach((entity: Entity) => {
      ctx.save()

      const pos = this.positionMapper.get(entity)
      const gamepad = this.gamepadMapper.get(entity)
      const mechComp = this.mechMapper.get(entity)

      // draw the text
      ctx.fillStyle = mechComp != null ? mechComp.type : 'black'
      ctx.scale(1, -1)
      ctx.font = '1px sans-serif'
      ctx.fillText(''+(gamepad.index+1), pos.x, pos.y)

      ctx.restore()
    })
    ctx.restore()
  }
}
