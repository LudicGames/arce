import { SingletonComponent } from '@ludic/ein'
import { OrthographicCamera } from 'three'

export default class CameraComponent extends SingletonComponent {
  camera: OrthographicCamera
}
