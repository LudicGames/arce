import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { System, Engine, Entity, Query } from '@ludic/ein'
import { CameraComponent,
         MapConfigComponent,
         TileStateComponent,
         SizeComponent,
         CubeCoordinateComponent,
         PositionComponent,
       } from '../components'

import { side_length_from_area, area_from_side_length, offset_to_cube, OffsetCoordinate, CubeCoordinate, hex_vertices, cube_to_vector2 } from '../utils/Hex'
import {
  PerspectiveCamera,
  OrthographicCamera,
  Shape,
  Vector2,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  Scene,
  WebGLRenderer,
  BackSide,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  ShapeBufferGeometry,
  Matrix3,
  Matrix4,
  Vector3,
  Euler,
  Quaternion,
  InstancedMesh,
  Camera,
  Group,
  AnimationClip
} from 'three'
import { RendererComponent } from '../components/RendererComponent'
import { SceneComponent } from '../components/SceneComponent'

export interface GLTFAsset {
  animations: AnimationClip[] // Array<THREE.AnimationClip>
	scene: Group
	scenes: Group[]
	cameras:  Camera[]
	asset: any
}

export default class CastleInitSystem extends System {
  blueMaterial = new MeshBasicMaterial( { color: '#607eeb', wireframe: false} )
  redMaterial = new MeshBasicMaterial( { color: 'red', wireframe: false} )
  outlineMaterial = new LineBasicMaterial( { color: 'black' } )

  tileShape: Shape
  geometry: ShapeBufferGeometry
  outlineGeometry: EdgesGeometry
  tileMesh: InstancedMesh

  contextQuery: Query

  constructor(priority: number = 0, enabled: boolean = true) {
    super(priority, enabled)
  }

  onAdded(engine: Engine){
    this.engine = engine
    this.contextQuery = engine.createQuery({
      name: 'context'
    })
  }


  execute(delta: number, time: number): void {
    const { camera } = this.engine.getSingletonComponent(CameraComponent)
    const { renderer } = this.engine.getSingletonComponent(RendererComponent)
    const { scene } = this.engine.getSingletonComponent(SceneComponent)

    const canvasSize = renderer.getSize(new Vector2())
    const w = camera.right - camera.left
    const h = camera.top - camera.bottom
    renderer.setClearColor( 0xffffff, 1)

    const loader = new GLTFLoader()
    loader.load('./src/assets/cube.glb', function(gltf: GLTFAsset){
	    scene.add(gltf.scene)
      const model = gltf.scene
      model.rotation.x = 1.00
      model.scale.set(5, 5, 5)


    }, undefined, function (error: any) {
	    console.error(error)
    })

    this.enabled = false
  }
}
