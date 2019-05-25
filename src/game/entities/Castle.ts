import { Entity } from '@ludic/ein'
import Hex from '../utils/Hex'

import CastleStateComponent from '../components/CastleStateComponent'

export default class Castle extends Entity {
  constructor(hex: Hex){
    super()
    this.add(new CastleStateComponent(hex))
  }
}
