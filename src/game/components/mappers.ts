import { ComponentMapper } from '@ludic/ein'
import MechComponent from './MechComponent'
import PositionComponent from './PositionComponent'
import GamepadComponent from './GamepadComponent'
import CameraComponent from './CameraComponent'

export const MechComponentMapper = new ComponentMapper(MechComponent)
export const PositionComponentMapper = new ComponentMapper(PositionComponent)
export const GamepadComponentMapper = new ComponentMapper(GamepadComponent)
export const CameraComponentMapper = new ComponentMapper(CameraComponent)