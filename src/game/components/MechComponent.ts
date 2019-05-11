import { Component } from '@ludic/ein'

export default class MechComponent extends Component {
  type: string

  constructor(type: string) {
    super()
    this.type = type
  }
}
