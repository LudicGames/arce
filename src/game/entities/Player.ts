import { Entity } from '@ludic/ein'

import MovementComponent from '../components/MovementComponent'
import PositionComponent from '../components/PositionComponent'
import PlayerStateComponent from '../components/PlayerStateComponent'

export default class Player extends Entity {

  constructor(){
    super()

    this.add(new PositionComponent(2, 2))
    this.add(new MovementComponent())
    this.add(new PlayerStateComponent())
  }
}
