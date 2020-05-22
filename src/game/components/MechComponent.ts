import { Component } from '@ludic/ein'

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
