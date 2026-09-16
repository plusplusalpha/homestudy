import {finish} from './materials.js';
import * as THREE from 'three';
// All geometry is in metres. Supplied dimensions are kept separate from inferred details.
export const dimensions={study:[3.7,4.5],trading:[2.5,4.5],columnBay:.5,guest:[3,4.5],guestColumnBay:.9,guestRemaining:2.1,master:[3.95,5],bathWidth:2.5,living:[5.4,9.8],endReturns:1.1};
const A=Math.atan2(205,323),ew=[Math.cos(A),Math.sin(A)],el=[-Math.sin(A),Math.cos(A)];
export const L=(u,v)=>[(u-8.3)*ew[0]+v*el[0],-1.7+(u-8.3)*ew[1]+v*el[1]];
export function createShell(scene){
const mats={wall:new THREE.MeshStandardMaterial({color:0xf5f4ef,roughness:.9}),floor:new THREE.MeshStandardMaterial({color:0xc7b697,roughness:.9}),tile:new THREE.MeshStandardMaterial({color:0xd4d1c9,roughness:.9}),dark:new THREE.MeshStandardMaterial({color:0x656c69}),counter:new THREE.MeshStandardMaterial({color:0xa4a29a}),glass:new THREE.MeshStandardMaterial({color:0xbad7dd,transparent:true,opacity:.18,roughness:.1,depthWrite:false}),frame:new THREE.MeshStandardMaterial({color:0x8a9696,metalness:.3,roughness:.5}),estimate:new THREE.MeshStandardMaterial({color:0xc6b598,transparent:true,opacity:.45})};
mats.island=new THREE.MeshStandardMaterial({color:0x303232,roughness:.27,metalness:.08});
finish(mats.wall,'wallpaper');mats.wall.map=null;mats.wall.bumpScale=.0005;finish(mats.island,'marble');mats.island.color.setHex(0x939393);
const walls=[],glasses=[],frames=[],doors=[],footprints=[],dimensionsLines=[];
function box(x,z,w,d,h,mat,base=0){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,base+h/2,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);return m}
function poly(points,mat=mats.floor,height=0,walkable=true){const sh=new THREE.Shape();points.forEach(([x,z],i)=>i?sh.lineTo(x,-z):sh.moveTo(x,-z));sh.closePath();const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),mat);m.rotation.x=-Math.PI/2;m.position.y=height;m.receiveShadow=true;scene.add(m);if(walkable)footprints.push(points);return m}
const rect=(x,z,w,d)=>[[x,z],[x+w,z],[x+w,z+d],[x,z+d]];
const lr=(u,v,w,d)=>[L(u,v),L(u+w,v),L(u+w,v+d),L(u,v+d)];
function seg(a,b,mat=mats.wall,h=.75,t=.15,collection=walls){const dx=b[0]-a[0],dz=b[1]-a[1];const m=box((a[0]+b[0])/2,(a[1]+b[1])/2,Math.hypot(dx,dz),t,h,mat);m.rotation.y=-Math.atan2(dz,dx);collection?.push(m);return m}
function path(p,close=false){for(let i=1;i<p.length;i++)seg(p[i-1],p[i]);if(close)seg(p.at(-1),p[0])}
function glass(a,b){seg(a,b,mats.glass,2.5,.028,glasses);const n=Math.ceil(Math.hypot(a[0]-b[0],a[1]-b[1])/.95);for(let i=0;i<=n;i++)frames.push(box(a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n,.045,.045,2.6,mats.frame));const top=seg(a,b,mats.frame,.04,.05,null);top.position.y=2.55;frames.push(top)}
function built(a,b,width=.6,height=.9,mat=mats.estimate){return seg(a,b,mat,height,width,null)}
// Right-hand rooms: the 500mm transition is a separate bay, not included in 2500mm.
poly(rect(6,0,3.7,4.5));poly(rect(3.5,0,2.5,4.5));poly(rect(3,1.0,.5,3.5));poly(rect(0,0,3,4.5));
poly([[0,-1.7],[2.1,-.25],[3.5,0],[3,0],[0,0]]); // facade extension is not measured.
poly(rect(0,4.5,9.7,1.25));poly(rect(8.2,4.5,1.5,1.25),mats.tile,.008);
path([[9.7,0],[9.7,4.5]]);path([[9.7,5.45],[9.7,5.75],[5.5,5.75]]);
path([[6,0],[6,4.5]]);
path([[3,1],[3,4.5]]);
// Corridor-facing closed rooms, with an explicit door leaf in each opening.
path([[3,4.5],[3.25,4.5]]);path([[4.15,4.5],[6,4.5]]);
path([[6,4.5],[6.2,4.5]]);path([[7.1,4.5],[9.7,4.5]]);
path([[2.85,4.5],[3,4.5]]);
function door(a,b,name){const leaf=seg(a,b,new THREE.MeshStandardMaterial({color:0x9c896e}),2.1,.045,doors);leaf.name=name;const threshold=seg(a,b,mats.dark,.025,.18,null);threshold.name=name+'-threshold';return leaf;}
door([3.25,4.5],[4.15,4.5],'trading-door');door([6.2,4.5],[7.1,4.5],'study-door');door([1.95,4.5],[2.85,4.5],'guest-door');
path([[0,-1.7],[0,4.5],[1.95,4.5]]);
path([[3.5,0],[3.5,1],[2.1,1],[2.1,-.25]]);
glass([0,-1.7],[2.1,-.25]);glass([2.1,-.25],[3.5,0]);glass([3.5,0],[6,0]);glass([6,0],[9.7,0]);
const column=box(2.8,.4,.75,.7,2.6,mats.dark);column.rotation.y=-.25; // cross-section/depth not surveyed.
built([9.37,.35],[9.37,3.5],.6,2.1);built([.35,4.17],[1.65,4.17],.6,2.1);
// Living area: 5400 x 9800, with 1100mm returns beyond each end provisionally.
poly(lr(0,0,5.4,9.8));
// End returns are tapered at the facade corners; their inclusion in 9800 remains unconfirmed.
poly([L(0,0),L(.55,-1.1),L(5.4,-1.1),L(5.4,0)]);poly([L(0,9.8),L(5.4,9.8),L(5.4,10.9),L(.55,10.9)]);
glass(L(0,0),L(0,9.8));glass(L(0,0),L(.55,-1.1));glass(L(.55,-1.1),L(5.4,-1.1));glass(L(0,9.8),L(.55,10.9));glass(L(.55,10.9),L(5.4,10.9));
// Structural returns anchor both ends of the living facade (sections estimated).
seg(L(4.65,-.75),L(5.4,-.75),mats.dark,.75,.75);seg(L(4.65,10.5),L(5.4,10.5),mats.dark,.75,.75);
// Kitchen / utility retain their relationship to the guest room; dimensions estimated.
poly(lr(5.4,-1.1,2.9,2.2),mats.tile);poly(lr(5.4,1.1,2.9,4.45));
path([L(5.4,-1.1),L(8.3,-1.1),[0,-1.7]]);glass(L(5.4,-1.1),L(8.3,-1.1));
path([L(5.4,0),L(5.4,1.1),L(7.5,1.1)]);path([L(8.3,1.1),L(8.3,5.55),L(7.3,5.55)]);
const counter=built(L(7.92,1.55),L(7.92,4.75),.65,.9,mats.wall);const ct=built(L(7.92,1.55),L(7.92,4.75),.72,.045,mats.counter);ct.position.y=.925;
built(L(6.1,2),L(6.1,4.5),.8,.9,mats.wall);
built(L(3.85,1.6),L(3.85,3.8),.95,.87,mats.wall);const it=built(L(3.85,1.6),L(3.85,3.8),1.02,.055,mats.island);it.position.y=.9;
// Enclosed kitchen, estimated 900mm doorway at corridor end.
path([L(7.5,1.1),L(8.3,1.1)]);
path([L(5.4,1.1),L(5.4,5.55),L(6.3,5.55)]);
door(L(6.3,5.55),L(7.2,5.55),'kitchen-door');
path([L(7.2,5.55),L(8.3,5.55)]);
// Fine pale mineral veins on the dark island top.
for(let k=0;k<9;k++){const points=[];for(let j=0;j<=30;j++){const v=1.6+2.2*j/30;const u=3.4+k*.105+.018*Math.sin(j*.48+k*2)+.012*Math.sin(j*1.3);if(u<4.35){const [x,z]=L(u,v);points.push(new THREE.Vector3(x,.929,z))}}const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0x8d918b,transparent:true,opacity:.25}));scene.add(line);}
// Master bedroom: local axes follow the original angled wing.
poly(lr(5.4,6.1,3.95,5));
path([L(5.4,10.9),L(5.4,6.1),L(8.5,6.1)]);path([L(9.3,6.1),L(9.35,6.1),L(9.35,8.3)]);
path([L(9.35,9.2),L(9.35,11.1)]);glass(L(5.4,11.1),L(9.35,11.1));
poly(lr(5.4,11.1,3.95,1.1),mats.tile);glass(L(5.4,11.1),L(5.4,12.2));glass(L(5.4,12.2),L(9.35,12.2));path([L(9.35,12.2),L(9.35,11.1)]);
// Circulation links the angled wing with the straight bedroom wing.
poly([L(8.3,4.6),[0,4.5],[5.5,4.5],[5.5,5.75],[3,5.75],L(11.85,6.1),L(9.35,6.1),L(5.4,6.1),L(5.4,5.55),L(8.3,5.55)]);
poly(lr(9.35,6.1,2.5,2.1),mats.tile);poly(lr(9.35,8.2,2.5,2.9),mats.tile);
path([L(9.35,11.1),L(11.85,11.1),L(11.85,8.2),L(10.2,8.2)]);path([L(11.85,8.2),L(11.85,6.1)]);
poly(rect(2,5.75,2.5,1.6),mats.tile);path([[2,5.75],[2,7.35],[4.5,7.35],[4.5,5.75]]);
built([.3,5.4],[1.7,5.4],.6,2.1);
function pointIn(p,polygon){let c=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
const inside=(x,z)=>footprints.some(p=>pointIn([x,z],p));
// A metre grid is a measurement aid, clipped to the actual model footprint.
const grid=[];for(let z=-10;z<15;z++){let start=null;for(let x=-17;x<=12;x+=.04){if(inside(x,z)){if(start===null)start=x}else if(start!==null){grid.push(start,.012,z,x-.04,.012,z);start=null}}}for(let x=-17;x<12;x++){let start=null;for(let z=-10;z<=15;z+=.04){if(inside(x,z)){if(start===null)start=z}else if(start!==null){grid.push(x,.012,start,x,.012,z-.04);start=null}}}const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.Float32BufferAttribute(grid,3));const gm=new THREE.LineSegments(gg,new THREE.LineBasicMaterial({color:0x8c887d,transparent:true,opacity:.18}));scene.add(gm);
const roomData=[['공부방 · 3,700 × 4,500',7.85,2.2],['트레이딩룸 · 2,500 × 4,500',4.75,2.2],['게스트룸 · 3,000 × 4,500',1.4,2.6],['기둥 구간 900 + 500',2.8,.5],['현관',8.95,5.15],['거실 · 5,400 × 9,800',...L(2.2,6)],['안방 · 3,950 × 5,000',...L(7.375,8.6)],['주방 · 설비 치수 미확인',...L(6.8,3.6)],['욕실1 · 폭 2,500',3.25,6.5],['끝단 1,100 · 포함 여부 확인',...L(2.7,-.55)]];
function dim(a,b,label){const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a[0],.06,a[1]),new THREE.Vector3(b[0],.06,b[1])]);const ln=new THREE.Line(g,new THREE.LineBasicMaterial({color:0x536f70}));scene.add(ln);dimensionsLines.push(ln);roomData.push([label,(a[0]+b[0])/2,(a[1]+b[1])/2]);}
dim([6,-.4],[9.7,-.4],'3,700');dim([3.5,-.4],[6,-.4],'2,500');dim([9.98,0],[9.98,4.5],'4,500');dim(L(-.3,0),L(-.3,9.8),'9,800');dim(L(0,10.2),L(5.4,10.2),'5,400');
return {walls,glasses,frames,doors,roomData,inside,grid:gm};
}
