# Learning three.js

Just one of the things I'm learning. <https://github.com/hchiam/learning>

three.js makes it easier to create 3D stuff by encapsulating [WebGL](https://github.com/hchiam/learning-webgl).

Tutorial: <https://discoverthreejs.com>

Note: three.js changes really fast. Check what release number version you're using (also, three.js doesn't use semver). That said, most of the syntax is apparently stable or at least aliased / backwards compatible (check console log for warning messages).

## Notes

- canvas <- renderer <- scene, camera, mesh
- mesh <- geometry, material

## Notes on running locally

<https://threejs.org/docs/#manual/en/introduction/How-to-run-things-locally>

```bash
npm install
npm start
```

## First scene tutorial

<https://discoverthreejs.com/book/first-steps/first-scene>

## CodePen `IcosahedronGeometry` demo

<https://codepen.io/hchiam/pen/GRvgeLN>

## Fireship tutorial

<https://www.youtube.com/watch?v=Q7AOvWpIVHU>

<https://github.com/hchiam/threejs-scroll-animation-demo>

## Minimal car tutorial

<https://www.freecodecamp.org/news/three-js-tutorial/>

<https://codepen.io/HunorMarton/pen/qBqzQOJ>

## Consider using a physics plugin

<https://github.com/chandlerprall/Physijs>

<https://github.com/kripken/ammo.js>

<https://github.com/mrdoob/three.js/blob/master/examples/physics_ammo_break.html>

## Pathfinding

<https://github.com/donmccurdy/three-pathfinding>

## Investigate researching how to incorporate into Next.js website

<https://github.com/pmndrs/react-three-next>

## Transparent Glass and Plastic

<https://tympanus.net/codrops/2021/10/27/creating-the-effect-of-transparent-glass-and-plastic-in-three-js/>

<https://github.com/kellymilligan/codrops-oct-2021-final/tree/14fed1388e6d9a065c77e36cd9a95d1db77c184f/13>

<https://codesandbox.io/s/13-p8kfe>

- transmission -> see-through
- thickness -> refraction
- roughness -> opacity
- clearcoat and normal stuff -> ice-like texture roughness
- bloom post-processing stuff -> shine
