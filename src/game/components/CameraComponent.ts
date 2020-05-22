import { Camera } from '@ludic/ludic'
import { Component } from '@ludic/ein'

export default class CameraComponent extends Component {
  value: Camera

  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.value = null
  }
}
