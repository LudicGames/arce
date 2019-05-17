import { Component } from '@ludic/ein'
import { Camera } from '@ludic/ludic'

export default class CameraComponent extends Component {
  camera: Camera
  constructor(camera: Camera) {
    super()
    this.camera = camera
  }
}