import { Component } from 'ecsy'
import { Camera } from '@ludic/ludic'

export default class CameraComponent extends Component {
  value: Camera
  constructor() {
    super()
    this.value = null
  }
}