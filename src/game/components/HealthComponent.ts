import { Component } from '@ludic/ein'

export default class HealthComponent extends Component {
  value: number
  constructor(){
    super()
  }

  reset(){
    this.value = 0
  }
}
