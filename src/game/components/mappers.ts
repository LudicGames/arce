import { ComponentMapper } from '@ludic/ein'
import { MechComponent, PositionComponent, GamepadComponent, CameraComponent } from '../components'

export const MechComponentMapper = new ComponentMapper(MechComponent)
export const PositionComponentMapper = new ComponentMapper(PositionComponent)
export const GamepadComponentMapper = new ComponentMapper(GamepadComponent)
export const CameraComponentMapper = new ComponentMapper(CameraComponent)
