import { Entity } from '@ludic/ein'

import { MovementComponent, PositionComponent, PlayerStateComponent} from '../components'

import Hex from '../utils/Hex'

export default class Player extends Entity {

  constructor(hex: Hex){
    super()

    this.add(new PositionComponent(hex.position.x, hex.position.y))
    this.add(new MovementComponent())
    this.add(new PlayerStateComponent())
  }
}
