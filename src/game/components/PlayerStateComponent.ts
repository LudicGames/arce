import { Component } from '@ludic/ein'

export default class PlayerStateComponent extends Component {
  vibrating: boolean
  boosting: boolean
  boostMultiplier = 1.2
  building: boolean = false
  status: string = "NORMAL"
  private _speed = 0.5

  constructor(){
    super()
    this.vibrating = false
  }

  get speed(): number {
    return this.boosting ? this._speed * this.boostMultiplier : this._speed
  }
}
