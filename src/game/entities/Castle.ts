import { Entity } from '@ludic/ein'
import Hex from '../utils/Hex'

import CastleStateComponent from '../components/CastleStateComponent'
import PositionComponent from '../components/PositionComponent'

export default class Castle extends Entity {
  constructor(hex: Hex){
    super()
    this.add(new PositionComponent(hex.position.x, hex.position.y))
    this.add(new CastleStateComponent(hex))
  }
}
