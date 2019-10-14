import { Entity } from 'ecsy';

// import { System, World } from 'ecsy'

// // import { World } from 'ecsy';

// // declare module 'ecsy' {
// //   // import * as ecsy from 'ecsy'
// //   interface System {
// //     world: World
// //   }

// // }

// declare module 'ecsy' {
//   namespace Ecsy {
//     export interface System {
//       world: World
//     }
//   }
// }

export interface QueryType {
  components: any[]
  results: Entity[]
  added?: Entity[]
  removed?: Entity[]
}