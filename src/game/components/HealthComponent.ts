import { Component } from 'ecsy'

export default class HealthComponent extends Component {
  value: number
  constructor(){
    super()
  }

  reset(){
    this.value = 0
  }
}
