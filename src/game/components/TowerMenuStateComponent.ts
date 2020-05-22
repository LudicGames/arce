import { Component } from '@ludic/ein'

export default class TowerMenuStateComponent extends Component {
  index: number
  constructor(){
    super()
    this.reset()
  }
  reset(){
    this.index = 0
  }
}
