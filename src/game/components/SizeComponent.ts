import { Component } from 'ecsy'

export default class SizeComponent extends Component {
  value: number
  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.value = 0
  }
}
