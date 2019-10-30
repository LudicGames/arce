import { Component } from 'ecsy'

export default class MechComponent extends Component {
  type: string

  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.type = ''
  }
}
