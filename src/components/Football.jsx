import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* A procedural truncated-icosahedron: 12 pentagons and 20 hexagons.
   No externally hosted texture, model, font or tracking script. */
function makeLeatherTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  const d = ctx.createImageData(512, 512);
  for (let i=0; i<d.data.length; i+=4) {
    const n = Math.round(118 + Math.random()*25);
    d.data[i] = d.data[i+1] = d.data[i+2] = n;
    d.data[i+3] = 255;
  }
  ctx.putImageData(d,0,0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS=t.wrapT=THREE.RepeatWrapping;
  t.repeat.set(5,3);
  return t;
}
const unit = v => v.clone().normalize();
function makePolygon(points, material, group) {
  const midpoint=unit(points.reduce((sum,p)=>sum.add(p),new THREE.Vector3()));
  const vertices=[];
  const normal=[];
  for(let edge=0;edge<points.length;edge++) {
    const a=unit(points[edge]);
    const b=unit(points[(edge+1)%points.length]);
    // curved, smoothly shaded triangular fan over spherical shell
    for(let part=0;part<6;part++) {
      const aa=unit(a.clone().lerp(b,part/6));
      const bb=unit(a.clone().lerp(b,(part+1)/6));
      const tri=[midpoint,aa,bb];
      for(const v of tri){vertices.push(v.x,v.y,v.z);normal.push(v.x,v.y,v.z)}
    }
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normal,3));
  const mesh=new THREE.Mesh(geometry,material);
  mesh.material.side=THREE.DoubleSide;
  group.add(mesh);
  return geometry;
}
function buildBall(bump) {
  const ico=new THREE.IcosahedronGeometry(1,0);
  const attr=ico.getAttribute('position');
  const coords=[];const index=new Map();const faces=[];
  for(let i=0;i<attr.count;i+=3){
    const face=[];
    for(let j=0;j<3;j++){
      const v=new THREE.Vector3().fromBufferAttribute(attr,i+j);
      const k=[v.x,v.y,v.z].map(n=>n.toFixed(5)).join(',');
      if(!index.has(k)){index.set(k,coords.length);coords.push(v)}
      face.push(index.get(k));
    }
    faces.push(face);
  }
  ico.dispose();
  const group=new THREE.Group();
  const white=new THREE.MeshStandardMaterial({color:0xe9e7df,roughness:.91,metalness:0,bumpMap:bump,bumpScale:.012});
  const black=new THREE.MeshStandardMaterial({color:0x171a18,roughness:.94,metalness:0,bumpMap:bump,bumpScale:.01});
  const seamMaterial=new THREE.MeshStandardMaterial({color:0x383b33,roughness:1});
  const edgeMap=new Set();
  const allGeom=[];
  function edge(a,b){
    const key=[a,b].sort((x,y)=>x-y).join(':');
    edgeMap.add(key);
  }
  for(const [a,b,c] of faces){edge(a,b);edge(b,c);edge(c,a);}
  // Hexagonal faces: the 20 truncated original icosahedral triangles.
  for(const [a,b,c] of faces){
    const A=coords[a],B=coords[b],C=coords[c];
    const p=[A.clone().lerp(B,1/3), B.clone().lerp(A,1/3), B.clone().lerp(C,1/3), C.clone().lerp(B,1/3), C.clone().lerp(A,1/3), A.clone().lerp(C,1/3)];
    allGeom.push(makePolygon(p,white,group));
  }
  // Pentagonal faces: one around each of the 12 original vertices.
  for(let i=0;i<coords.length;i++){
    const neighbours=[];
    for(const e of edgeMap){const [a,b]=e.split(':').map(Number);if(a===i)neighbours.push(b);if(b===i)neighbours.push(a)}
    const axis=unit(coords[i]);
    const right=unit(new THREE.Vector3(0,1,0).cross(axis));
    if(right.lengthSq()<.01)right.copy(unit(new THREE.Vector3(1,0,0).cross(axis)));
    const up=unit(axis.clone().cross(right));
    neighbours.sort((aa,bb)=>{
      const getAngle=n=>{const p=unit(coords[i].clone().lerp(coords[n],1/3));return Math.atan2(p.dot(up),p.dot(right))};
      return getAngle(aa)-getAngle(bb)
    });
    const points=neighbours.map(n=>coords[i].clone().lerp(coords[n],1/3));
    allGeom.push(makePolygon(points,black,group));
  }
  // Stitch line detail over panel borders, following the sphere.
  for(const [a,b] of [...edgeMap].map(e=>e.split(':').map(Number))){
    const p=unit(coords[a].clone().lerp(coords[b],1/3));
    const q=unit(coords[b].clone().lerp(coords[a],1/3));
    const line=[];
    for(let j=0;j<=12;j++)line.push(unit(p.clone().lerp(q,j/12)).multiplyScalar(1.002));
    const geometry=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(line),12,.003,3,false);
    group.add(new THREE.Mesh(geometry,seamMaterial));
    allGeom.push(geometry);
  }
  // The thin outer panel borders are built by the adjoining panel geometries.
  return {group,dispose(){allGeom.forEach(g=>g.dispose());white.dispose();black.dispose();seamMaterial.dispose()}};
}

export default function Football({progressRef,activeChapter}){
  const host=useRef(null);
  const active=useRef(activeChapter);
  useEffect(()=>{active.current=activeChapter},[activeChapter]);
  useEffect(()=>{
    const node=host.current;
    if(!node) return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer;
    try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}
    catch{return}
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.65));
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.10;
    node.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden','true');
    const scene=new THREE.Scene();
    // Orthographic framing prevents the football from unexpectedly filling or clipping the viewport.
    const camera=new THREE.OrthographicCamera(-2,2,2,-2,.1,100);camera.position.set(0,0,8);camera.lookAt(0,0,0);
    scene.add(new THREE.HemisphereLight(0xe8f3e8,0x495447,1.15));
    const key=new THREE.DirectionalLight(0xfff4df,2.35);key.position.set(-3,5,6);scene.add(key);
    const edge=new THREE.DirectionalLight(0xb6d2bc,1.1);edge.position.set(4,0,-3);scene.add(edge);
    const fill=new THREE.DirectionalLight(0xd6ddf0,.58);fill.position.set(-3,-4,2);scene.add(fill);
    const bump=makeLeatherTexture();
    const {group,dispose}=buildBall(bump);scene.add(group);
    group.rotation.set(-.22,.18,.1);
    let width=0,height=0,raf=0,angle=0,last=0;
    const resize=()=>{
      const r=node.getBoundingClientRect();width=Math.max(1,r.width);height=Math.max(1,r.height);
      renderer.setSize(width,height,true); // Keep CSS display size in sync with the WebGL drawing buffer.
      const aspect=width/height;
      const halfHeight=1.85;
      camera.left=-halfHeight*aspect;
      camera.right=halfHeight*aspect;
      camera.top=halfHeight;
      camera.bottom=-halfHeight;
      camera.updateProjectionMatrix();
      const fit=width<520?1.06:1.12;
      group.scale.setScalar(fit);
    };
    const ro=new ResizeObserver(resize);ro.observe(node);resize();
    const draw=(now)=>{
      const t=now*.001;
      const progress=Math.max(0,Math.min(1,progressRef.current||0));
      const target=progress*Math.PI*3.0+.28;
      const frame=Math.min((now-last||16)/1000,.05);last=now;
      angle+=(target-angle)*(1-Math.exp(-frame*6));
      group.rotation.y=reduce?.25:angle;
      group.rotation.x=reduce?-.16:-.18+progress*.34+Math.sin(t*.28)*.01;
      group.rotation.z=reduce?.05:Math.sin(t*.21)*.008;
      renderer.render(scene,camera);
      if(!reduce)raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return ()=>{cancelAnimationFrame(raf);ro.disconnect();dispose();bump.dispose();renderer.dispose();renderer.domElement.remove();};
  },[progressRef]);
  return <div ref={host} className="fqf-football-canvas" role="img" aria-label="Three-dimensional stitched football, rotating with the founder’s story"/>;
}
