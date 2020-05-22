import { Component } from '@ludic/ein'

export default class EnemyStateComponent extends Component {
  type: string

  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.type = "1"
  }
}
