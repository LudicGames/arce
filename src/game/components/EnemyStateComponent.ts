import { Component } from 'ecsy'

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
