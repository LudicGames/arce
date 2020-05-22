import { Component } from '@ludic/ein'

export default class TowerTypeComponent extends Component {
  value: string

  constructor(){
    super()
  }

  reset(){
    this.value = null
  }
}
