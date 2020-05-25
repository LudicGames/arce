import { SingletonComponent } from '@ludic/ein'
import { Scene } from 'three'

export class SceneComponent extends SingletonComponent {
  scene: Scene
}