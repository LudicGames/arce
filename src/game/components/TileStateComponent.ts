import { Component } from '@ludic/ein'

export default class TileStateComponent extends Component {
  type: string
  status: string
  playersOn: number
  towersOn: number

  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.type = "grass"
    this.status = "inactive"
    this.playersOn = 0
    this.towersOn = 0
  }
}
