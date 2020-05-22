import { Component } from '@ludic/ein'

export default class SpeedComponent extends Component {
  value: number
  constructor(){
    super()
    this.reset()
  }
  reset(){
    this.value = 0
  }
}
