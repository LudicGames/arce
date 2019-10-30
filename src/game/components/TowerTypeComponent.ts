import { Component } from 'ecsy'

export default class TowerTypeComponent extends Component {
  value: string

  constructor(){
    super()
  }

  reset(){
    this.value = null
  }
}
