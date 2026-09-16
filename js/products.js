import {finish,bevelBox} from './materials.js';
import * as T from 'three';
export const clientPresets={
standard:{name:'스탠다드 체어',w:420,d:490,h:820,sh:465,color:0xc2a577,note:'좌면 높이 465mm'},
slabTable:{name:'다이닝 테이블',w:2100,d:1090,h:730,color:0xc3a477},
modularSofa:{name:'패브릭 소파',w:3420,d:1150,h:760,color:0xe8e5df},
woodLamp:{name:'우드 스탠드 조명',w:550,d:400,h:1650,color:0x896443,note:'밑판 400mm, 갓 350×250mm. 측면 돌출 포함 전체 폭 550mm 추정'},
monitorSpeaker:{name:'스피커 본체',w:270,d:380,h:485,color:0xac8458,note:'받침대 별도. 받침대 위 배치 시 띄우기 600mm'},
speakerStand:{name:'검정 스피커 받침대',w:320,d:420,h:600,color:0x17191b,note:'폭 320·깊이 420·높이 600mm 임시값'},
pkLounge:{name:'검정 라운지체어',w:750,d:750,h:750,color:0x202323,note:'좌석 650×650, 다리 높이 350mm. 전체 폭·깊이 750mm 추정'},
ropeBar:{name:'바 체어',w:400,d:400,h:910,sh:650,color:0x9d7850,note:'좌면 높이 650mm'},
naturalRug:{name:'내추럴 러그',w:3500,d:2500,h:12,color:0xc6b797,note:'3500×2500mm 임시값 · 실측 미제공'},
paperPendant:{name:'천장 종이 조명',w:800,d:800,h:1300,lift:1300,color:0xeee3c6,note:'갓 높이 500·폭 800, 끈 800mm. 천장 2600mm 가정'},
woodChair:{name:'목재 의자',w:420,d:450,h:780,sh:450,color:0xa47b50,note:'좌면 높이 450mm'}
};
Object.assign(clientPresets,{
vacantLamp:{name:'베이컨트 테이블 조명',w:280,d:280,h:460,color:0x161616,note:'폭280 × 높이460mm · 갓 높이 약190mm · 검정 몸체와 크림색 갓'},
tripodLamp:{name:'거실 삼각다리 스탠드등',w:400,d:400,h:1650,color:0x181818,note:'기본 높이1650mm · 높이 입력으로 조절 가능 · 갓 높이150·아래 지름400mm 가정, 다리 벌어짐은 사진 기준'},
sornayDesk:{name:'앙드레 소르네 데스크 · 치수 임시',w:1200,d:600,h:740,color:0xa17c52,note:'사진 기준 모형 · W1200 × D600 × H740mm 임시값. 실제 치수 확인 필요 · 크림색 상판, 약간 밝은 원목 프레임'},
softStool:{name:'오프화이트 소프트 스툴',w:1150,d:1150,h:520,color:0xe9e5dd,note:'1150 × 1150 × 520mm · 소파와 같은 오프화이트 패브릭'},
goldmund:{name:'골드문트 · 스탠드 포함',w:420,d:480,h:950,color:0xc9cbcd,note:'본체 W288 × H500 × D392mm · 본체 아래 450mm · 전체 높이 약 950mm. 스탠드 폭420·깊이480mm는 사진 기준 추정'},
akariXP1:{name:'Akari XP1',w:220,d:220,h:380,color:0xeee4c8,note:'220×220×380mm · 사진 기준 간이 모형'},
easeStand:{name:'목재 TV 스탠드',w:850,d:550,h:750,color:0xa47c54,note:'850×550×750mm 임시값 · TV 별도'},
casala:{name:'Casala 비치 체어',w:400,d:480,h:820,sh:460,color:0x937047,note:'폭 400·좌면 높이 460mm. 깊이 480·전체 높이 820mm 추정'},
woodArm:{name:'곡면 목재 암체어',w:540,d:500,h:800,color:0xc6a576,note:'540×500×800mm · 좌면 높이 450mm 추정'},
blockCoffee:{name:'원목 소파테이블',w:1400,d:1000,h:420,color:0xb29b6a,note:'1400×1000×420mm'}
});
Object.assign(clientPresets,{
steelcaseLeap:{name:'Steelcase Leap',w:686,d:629,h:1099,color:0x202326,note:'최대 외형 W686 × D629 × H1099mm · 실제 제품 높이 972–1099, 깊이 533–629mm 조절 범위'},
basicaMinima:{name:'Santa & Cole Básica Mínima',w:210,d:210,h:300,color:0xe8ddc8,note:'높이 300mm · 바닥 지름 85mm · 갓 외경은 사진 비례 약 210mm'},
dell27:{name:'Dell 27인치 모니터',w:612,d:185,h:535,color:0x202326,note:'27인치 16:9 화면 · W612 × D185 × H535mm 일반 Dell 스탠드형 기준'},
akari26N:{name:'Akari 26N',w:350,d:250,h:600,color:0xeee3c5,note:'W350 × H600mm · 깊이 250mm는 사진 비례값'}
});
export function clientMesh(o){const g=new T.Group(),w=o.w/1000,d=o.d/1000,h=o.h/1000;const mat=new T.MeshStandardMaterial({color:o.color,roughness:.75}),black=new T.MeshStandardMaterial({color:0x181a1b,roughness:.55}),cream=new T.MeshStandardMaterial({color:0xece5d7,roughness:.95}),steel=new T.MeshStandardMaterial({color:0xbcc2c6,metalness:.88,roughness:.24});
if(!['speakerStand','paperPendant','akariXP1','goldmund','vacantLamp','tripodLamp'].includes(o.type))finish(mat,['modularSofa','naturalRug','softStool'].includes(o.type)?'fabric':'wood');finish(cream,'fabric');if(o.type==='pkLounge')finish(black,'leather');
function add(geo,x,y,z,m=mat){const q=new T.Mesh(geo,m);q.position.set(x,y,z);q.castShadow=true;q.receiveShadow=true;g.add(q);return q}
const box=(x,y,z,a,b,c,m=mat)=>add(bevelBox(a,b,c),x,y,z,m);
const cyl=(x,y,z,r,hh,m=mat)=>add(new T.CylinderGeometry(r,r,hh,24),x,y,z,m);
function rod(a,b,r,m=mat){const aa=new T.Vector3(...a),bb=new T.Vector3(...b),q=add(new T.CylinderGeometry(r,r,aa.distanceTo(bb),12),...aa.clone().add(bb).multiplyScalar(.5).toArray(),m);q.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bb.sub(aa).normalize());return q}
function rounded(x,y,z,a,b,c,r,m=mat){return add(bevelBox(a,b,c,r),x,y,z,m)}
// Rounded, slightly relaxed upholstery with smooth continuous normals.
function pillow(x,y,z,a,b,c){const geo=new T.SphereGeometry(1,40,24),p=geo.attributes.position;const power=v=>Math.sign(v)*Math.pow(Math.abs(v),.24);for(let i=0;i<p.count;i++){const u=p.getX(i),v=p.getY(i),t=p.getZ(i);p.setXYZ(i,power(u)*a/2,power(v)*b/2+.003*Math.sin(u*15+t*9)*(1-v*v),power(t)*c/2);}geo.computeVertexNormals();return add(geo,x,y,z,mat);}
function skin(fn,material=mat){const pts=[],ix=[],uv=[],n=24;for(let j=0;j<=n;j++)for(let i=0;i<=n;i++){pts.push(...fn(i/n,j/n));uv.push(i/n,j/n);}for(let j=0;j<n;j++)for(let i=0;i<n;i++){const k=j*(n+1)+i;ix.push(k,k+1,k+n+1,k+1,k+n+2,k+n+1);}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pts,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(ix);geo.computeVertexNormals();const m=material.clone();m.side=T.DoubleSide;return add(geo,0,0,0,m);}
if(o.type==='steelcaseLeap'){
const fabric=new T.MeshStandardMaterial({color:0x24282b,roughness:.92}),plastic=new T.MeshStandardMaterial({color:0x151819,roughness:.55});
for(let i=0;i<5;i++){const a=i*Math.PI*2/5;rod([0,.07,0],[Math.cos(a)*w*.43,.035,Math.sin(a)*d*.40],.028,plastic);const wheel=cyl(Math.cos(a)*w*.43,.026,Math.sin(a)*d*.40,.026,.042,plastic);wheel.rotation.z=Math.PI/2;}
cyl(0,.24,0,.042,.40,plastic);rounded(0,.49,d*.03,w*.70,.13,d*.70,.045,fabric);const back=rounded(0,.76,-d*.29,w*.69,.52,.10,.065,fabric);back.rotation.x=-.12;for(const s of [-1,1]){rod([s*w*.34,.48,-d*.03],[s*w*.35,.72,-d*.02],.026,plastic);rounded(s*w*.35,.73,d*.01,w*.19,.055,d*.35,.018,plastic);rod([s*w*.23,.48,-d*.18],[s*w*.30,.81,-d*.33],.018,plastic);}rounded(0,.44,-d*.18,w*.58,.05,d*.13,.018,plastic);
}
else if(o.type==='basicaMinima'){
const oak=new T.MeshStandardMaterial({color:0xc69255,roughness:.72}),shade=new T.MeshStandardMaterial({color:0xeee5d3,roughness:.96,side:T.DoubleSide,emissive:0xffdda0,emissiveIntensity:.09});
cyl(0,.009,0,.0425,.018,black);cyl(0,.075,0,.025,.13,black);cyl(0,.17,0,.024,.19,oak);const q=add(new T.CylinderGeometry(w*.34,w*.50,h*.40,48,1,true),0,h*.80,0,shade);for(const y of [h*.60,h]){const r=y===h?w*.34:w*.50;const rim=add(new T.TorusGeometry(r,.0025,6,48),0,y,0,oak);rim.rotation.x=Math.PI/2;}
}
else if(o.type==='dell27'){
const screen=new T.MeshStandardMaterial({color:0x090b0d,roughness:.28}),silver=new T.MeshStandardMaterial({color:0xbfc4c5,metalness:.7,roughness:.28});
rounded(0,h*.68,0,w,h*.57,.045,.012,black);rounded(0,h*.68,d*.025,w*.94,h*.50,.008,.004,screen);rounded(0,.025,0,w*.62,.025,d,.008,silver);rounded(0,h*.28,-d*.05,w*.11,h*.42,.035,.009,silver);rounded(0,h*.38,-d*.01,w*.30,.035,.045,.008,black);
}
else if(o.type==='akari26N'){
const paper=new T.MeshStandardMaterial({color:0xeee3c5,roughness:1,side:T.DoubleSide,transparent:true,opacity:.92,emissive:0xf0c86f,emissiveIntensity:.13});
for(let i=0;i<3;i++){const a=i*Math.PI*2/3+Math.PI/2;rod([Math.cos(a)*w*.30,.008,Math.sin(a)*d*.30],[Math.cos(a)*w*.12,h*.25,Math.sin(a)*d*.12],.003,black);}const shade=skin((u,v)=>{const y=h*.22+v*h*.75,wa=w*(.46+.07*Math.sin(v*Math.PI*2)-.06*Math.sin(v*Math.PI)),zz=d*(.42+.08*Math.sin(v*Math.PI));return [(u-.5)*wa,y,Math.sin(u*Math.PI)*zz*.12]},paper);for(let i=0;i<15;i++){const y=h*(.25+i*.048);rod([-w*.22,y,0],[w*.22,y,0],.0015,black)}rod([-w*.23,h*.25,0],[w*.23,h*.97,0],.002,black);rod([w*.23,h*.25,0],[-w*.23,h*.97,0],.002,black);
}
else if(o.type==='vacantLamp'||o.type==='tripodLamp'){
const shade=new T.MeshStandardMaterial({color:0xf0ead9,roughness:.94,side:T.DoubleSide,emissive:0xffe6b5,emissiveIntensity:.13});
const glossy=new T.MeshStandardMaterial({color:0x121313,roughness:.23,metalness:.12});
function frustum(y,rt,rb,hh){const q=add(new T.CylinderGeometry(rt,rb,hh,64,1,true),0,y,0,shade);for(const [yy,rr] of [[y+hh/2,rt],[y-hh/2,rb]]){const rim=add(new T.TorusGeometry(rr,.0014,6,64),0,yy,0,shade);rim.rotation.x=Math.PI/2;}return q;}
if(o.type==='vacantLamp'){const sh=Math.min(.19,h*.55);add(new T.CylinderGeometry(.038,.048,h-sh+.008,48),0,(h-sh+.008)/2,0,glossy);frustum(h-sh/2,.105,.14,sh);}
else {const sh=.15,top=h-.035,bottom=top-sh;frustum(top-sh/2,.070,.20,sh);for(let i=0;i<3;i++){const a=i*Math.PI*2/3+Math.PI/2;rod([Math.cos(a)*.175,.008,Math.sin(a)*.175],[Math.cos(a+Math.PI)*.055,h,Math.sin(a+Math.PI)*.055],.006,black);cyl(Math.cos(a)*.175,.005,Math.sin(a)*.175,.008,.01,black);}rod([-.04,bottom+.015,0],[.04,bottom+.015,0],.003,black);}
}
else if(o.type==='sornayDesk'){
const top=new T.MeshStandardMaterial({color:0xeee9d9,roughness:.62});
// Cream inset top, two open rectangular side frames and a low stretcher.
rounded(0,h-.022,0,w-.045,.022,d-.012,.005,top);
for(const sign of [-1,1]){const x=sign*(w/2-.0175);rounded(x,h/2,d/2-.022,.035,h,.044,.008);rounded(x,h/2,-d/2+.022,.035,h,.044,.008);rounded(x,.025,0,.035,.050,d,.008);rounded(x,h-.027,0,.035,.054,d,.008);}
for(const sign of [-1,1])rounded(0,h-.054,sign*(d/2-.032),w-.065,.055,.027,.004);
rounded(0,.055,-d*.16,w-.06,.038,.065,.005);
for(const sign of [-1,1]){const pin=cyl(sign*(w/2-.044),h-.052,d/2-.017,.003,.002,black);pin.rotation.x=Math.PI/2;}
}
else if(o.type==='goldmund'){
const silver=new T.MeshStandardMaterial({color:0xd5d6d7,metalness:.62,roughness:.32});
const grille=new T.MeshStandardMaterial({color:0x111213,roughness:.95});
// Body dimensions exclude the mounting pivots and stand.
box(0,.700,0,.288,.500,.392,silver);box(0,.700,.193,.284,.496,.006,grille);
function rail(a,b,t=.026){const aa=new T.Vector3(...a),bb=new T.Vector3(...b);const q=add(bevelBox(t,aa.distanceTo(bb),t,.002),...aa.clone().add(bb).multiplyScalar(.5).toArray(),black);q.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bb.sub(aa).normalize());}
for(const x of [-.197,.197]){box(x,.015,0,.026,.03,.48,black);rail([x,.03,.20],[x,.92,-.19]);rail([x,.03,-.07],[x,.7,-.07],.022);rail([x,.70,-.07],[x,.70,0],.023);const pivot=cyl(x,.70,0,.052,.025,black);pivot.rotation.z=Math.PI/2;}
for(const z of [-.227,.227])box(0,.015,z,.42,.03,.026,black);
}
else if(o.type==='akariXP1'){const paper=new T.MeshStandardMaterial({color:0xeee4c8,roughness:1,emissive:0xe9c983,emissiveIntensity:.12});box(0,.235,0,.22,.29,.22,paper);for(const x of [-1,1])for(const z of [-1,1])rod([x*.074,0,z*.074],[x*.074,.10,z*.074],.002,black);rod([-.018,.38,0],[-.018,.39,0],.0015,black);rod([-.018,.39,0],[.018,.39,0],.0015,black);rod([.018,.39,0],[.018,.38,0],.0015,black)}
else if(o.type==='easeStand'){for(const x of [-1,1])for(const z of [-1,1]){rod([x*w*.48,.01,z*d*.48],[x*w*.34,h*.9,0],.016);rod([x*w*.34,h*.72,z*.025],[x*w*.34,h,0],.022,black);}box(0,h*.95,0,w*.75,.035,.04,black)}
else if(o.type==='casala'){for(const x of [-1,1]){rounded(x*(w/2-.018),.018,0,.035,.036,d,.01);rod([x*(w/2-.02),.03,-d*.14],[x*(w/2-.02),h,-d*.40],.024);box(x*(w/2-.02),.445,0,.035,.03,d*.85);}rounded(0,.455,.01,w,.018,d*.86,.008,cream);rounded(0,h-.14,-d*.39,w-.035,.28,.018,.008,cream);rod([-w*.46,.075,-d*.1],[w*.46,.075,-d*.1],.02)}
else if(o.type==='woodArm'){for(const x of [-1,1]){box(x*(w/2-.023),.325,d*.42,.046,.65,.046);box(x*(w/2-.023),h/2,-d*.40,.046,h,.046);rounded(x*(w/2-.023),.645,0,.046,.042,d*.9,.012);}rounded(0,.45,0,w*.90,.05,d*.91,.02);const pts=[];for(let i=0;i<=20;i++){const x=-w*.43+i*w*.86/20,z=-d*.38+.09*(x/(w*.43))**2;pts.push(new T.Vector3(x,.59,z),new T.Vector3(x,.79,z));}const geo=new T.BufferGeometry().setFromPoints(pts);const ix=[];for(let i=0;i<20;i++)ix.push(i*2,i*2+1,i*2+2,i*2+1,i*2+3,i*2+2);geo.setIndex(ix);geo.computeVertexNormals();const backmat=mat.clone();backmat.side=T.DoubleSide;add(geo,0,0,0,backmat);}
else if(o.type==='blockCoffee'){rounded(0,h-.055,0,w,.11,d,.018);for(const x of [-1,1])for(const z of [-1,1])rounded(x*(w/2-.115),(h-.10)/2,z*(d/2-.13),.23,h-.10,.26,.012);box(0,h-.12,0,w*.78,.07,d*.72)}
else if(o.type==='standard'){
const sh=(o.sh||465)/1000;
// Deep tapered folded-steel rear legs, slim round front legs.
for(const sign of [-1,1]){const profile=new T.Shape();profile.moveTo(-.237,0);profile.lineTo(-.209,.77);profile.lineTo(-.143,.77);profile.lineTo(-.063,.44);profile.lineTo(-.211,0);profile.closePath();const geo=new T.ExtrudeGeometry(profile,{depth:.036,bevelEnabled:true,bevelSize:.002,bevelThickness:.002,bevelSegments:2});const leg=add(geo,sign*.181,0,0,black);leg.rotation.y=-Math.PI/2;rod([sign*.185,.012,.224],[sign*.185,sh-.024,.185],.012,black);rod([sign*.185,sh-.024,.185],[sign*.185,sh-.024,-.16],.011,black);}
// Bent plywood front lip and a subtly cupped back, with visible fixing bolts.
skin((u,v)=>{const x=(u-.5)*w,z=(v-.5)*.44;return [x,sh-.015*(1-(2*u-1)**2)-.027*Math.pow(Math.max(0,(v-.82)/.18),2),z];});
skin((u,v)=>{const x=(u-.5)*w*(.88+.10*Math.sin(v*Math.PI));return [x,.57+v*.25,-.178-v*.05+.027*(2*u-1)**2];});
for(const sign of [-1,1]){const bolt=cyl(sign*.14,.665,-.180,.004,.005,steel);bolt.rotation.x=Math.PI/2;}
}
else if(o.type==='woodChair'||o.type==='ropeBar'){
 const sh=(o.sh||450)/1000*(h/clientPresets[o.type].h*1000), wood=o.type!=='standard',leg=wood?mat:black;
 for(const x of [-1,1]){rod([x*(w/2-.025),0,d/2-.025],[x*(w/2-.025),sh,.16*d],.018,leg);if(wood)box(x*(w/2-.025),h/2,-d/2+.025,.045,h,.045);else {const q=box(x*(w/2-.025),h*.39,-d*.32,.045,h*.78,.10,black);q.rotation.x=-.10;}}
 box(0,sh-.017,0,w,.034,d,wood?mat:mat);
 if(o.type==='woodChair'){for(const y of [.76,.92])box(0,h*y,-d*.43,w-.04,h*.1,.035);box(0,sh*.35,0,w-.04,.06,.04)}
 else if(o.type==='standard')rounded(0,h*.82,-d*.42,w*.94,h*.36,.027,.035);
 else {box(0,h-.07,-d*.44,w-.04,.14,.035,cream);for(let i=0;i<38;i++)rod([-w*.46,sh+.012,-d*.46+i*d*.92/37],[w*.46,sh+.012,-d*.46+i*d*.92/37],.004,cream);for(const z of [-1,1])rod([-w*.45,.22,z*d*.44],[w*.45,.22,z*d*.44],.014);}
}
else if(o.type==='slabTable'){box(0,h-.018,0,w,.036,d);for(const x of [-w*.30,w*.30]){const bw=d*.65,bh=h-.036;const sh=new T.Shape();sh.moveTo(-bw/2,0);sh.lineTo(bw/2,0);sh.lineTo(bw/2,bh);sh.lineTo(-bw/2,bh);sh.closePath();const hole=new T.Path();hole.absellipse(0,bh*.5,.04,bh*.37,0,Math.PI*2,true);sh.holes.push(hole);const q=add(new T.ExtrudeGeometry(sh,{depth:.045,bevelEnabled:false}),x,0,0);q.rotation.y=Math.PI/2;box(x,bh/2,0,.35,bh,.045)}}
else if(o.type==='modularSofa'){
mat.color.setHex(0xe9e5dd);box(0,.09,0,w*.91,.12,d*.85,black);pillow(0,.25,0,w,.34,d*.97);
const inner=w-.36,cw=inner/3;for(let i=0;i<3;i++){const x=(i-1)*cw;pillow(x,.46,.095,cw-.015,.21,d*.78);const back=pillow(x,.62,-d*.32,cw-.025,.32,.27);back.rotation.x=-.13;}
for(const sign of [-1,1]){pillow(sign*(w/2-.105),.40,0,.21,.48,d);const side=pillow(sign*(w/2-.28),.58,-.13,.32,.30,.19);side.rotation.z=sign*.27;}
}
else if(o.type==='softStool'){mat.color.setHex(0xe9e5dd);box(0,.07,0,w*.86,.10,d*.86,black);pillow(0,.255,0,w,.37,d);pillow(0,.43,0,w*.99,.18,d*.99);}
else if(o.type==='woodLamp'){box(.10,.035,0,.4,.07,.045);box(.10,.035,0,.045,.07,.4);rod([.1,.07,0],[.1,h,0],.016);rod([.1,1.14,0],[-.12,1.14,0],.009,black);const shade=new T.MeshStandardMaterial({color:0xf2ddb0,roughness:1,emissive:0xf3ca80,emissiveIntensity:.18});cyl(-.10,1.25,0,.175,.25,shade)}
else if(o.type==='monitorSpeaker'){box(0,h/2,0,w,h,d);box(0,h/2,d/2,w*.98,h,.008,black);for(const [y,r] of [[h*.74,w*.20],[h*.30,w*.37]]){const q=cyl(0,y,d/2+.009,r,.014,black);q.rotation.x=Math.PI/2;const cone=add(new T.SphereGeometry(r*.72,24,12),0,y,d/2+.016,black);cone.scale.z=.16;}}
else if(o.type==='speakerStand'){box(0,.01,0,w,.02,d,black);box(0,h-.008,0,w*.81,.016,d*.86,black);for(const x of [-.28,.28])box(x*w,h/2,0,.035,h-.02,.035,black)}
else if(o.type==='pkLounge'){const seatGeo=new T.PlaneGeometry(.65,.65,24,24);const sp=seatGeo.attributes.position;for(let i=0;i<sp.count;i++){const x=sp.getX(i),y=sp.getY(i);sp.setZ(i,-.035*(1-(x/.325)**2)*(1-(y/.325)**2));}seatGeo.computeVertexNormals();black.side=T.DoubleSide;const q=add(seatGeo,0,.35,.015,black);q.rotation.x=-Math.PI/2+.05;const back=rounded(0,.555,-.285,.65,.4,.025,.009,black);back.rotation.x=-.20;for(const x of [-1,1]){rod([x*.36,0,.35],[x*.30,.35,.24],.012,steel);rod([x*.36,0,-.34],[x*.30,.35,-.24],.012,steel);rod([x*.30,.34,.29],[x*.30,.34,-.31],.01,steel);rod([x*.30,.34,-.25],[x*.30,.75,-.34],.01,steel)}}
else if(o.type==='naturalRug'){box(0,h/2,0,w,h,d);const thread=new T.MeshStandardMaterial({color:0xb9aa8d,roughness:1});for(let i=0;i<90;i++)box(-w*.49+i*w*.98/89,h,0,.002,.0008,d*.98,thread)}
else if(o.type==='paperPendant'){const q=add(new T.SphereGeometry(1,48,32),0,.25,0,cream);q.scale.set(w/2,.25,d/2);rod([0,.5,0],[0,1.3,0],.003,black);const rib=new T.MeshStandardMaterial({color:0xcfc3a7,roughness:1});for(let i=1;i<17;i++){const y=-.25+i*.5/17,r=Math.sqrt(1-(y/.25)**2)*w/2;const q=add(new T.TorusGeometry(r,.0015,4,48),0,y+.25,0,rib);q.rotation.x=Math.PI/2;}}
return g;}
