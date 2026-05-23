import{j as A}from"./index-R_q_zrTp.js";import{r as b}from"./vendor-react-Dj6GEHtq.js";import{S as B,P as G,W as L,e as H,V as U,b as v,A as R,D as j,G as D,T as F,M as I,a as N,B as V,d as _,c as k,C as O}from"./vendor-three-CVJaAtqj.js";const g=18,T=120;function J(){const M=b.useRef(null);return b.useEffect(()=>{const c=M.current;if(!c)return;const p=new B,u=new G(60,window.innerWidth/window.innerHeight,.1,100);u.position.z=5;const o=new L({antialias:!0,alpha:!0,powerPreference:"high-performance"});o.setSize(window.innerWidth,window.innerHeight),o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setClearColor(0,0),c.appendChild(o.domElement);const z=new H({side:j,transparent:!0,blending:R,depthWrite:!1,uniforms:{uTime:{value:0},uColor1:{value:new v("#00e5ff")},uColor2:{value:new v("#1a237e")},uBrightness:{value:.6},uMouse:{value:new U(.5,.5)}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uBrightness;
        uniform vec2 uMouse;
        varying vec2 vUv;

        void main() {
          vec2 c = vec2(0.5, 0.5);
          vec2 uv = vUv - c;
          float a = atan(uv.y, uv.x);
          float d = length(uv);

          float spiral = sin(a * 6.0 + uTime * 0.15 + d * 12.0) * 0.5 + 0.5;
          float spiral2 = cos(a * 4.0 - uTime * 0.1 + d * 8.0) * 0.5 + 0.5;
          vec3 color = mix(uColor2, uColor1, spiral * spiral2);

          float alpha = smoothstep(0.5, 0.1, d) * uBrightness;
          float pulse = sin(uTime * 0.6) * 0.06 + 0.94;
          alpha *= pulse;

          vec2 mo = uMouse - c;
          float md = length(uv - mo * 0.3);
          float mg = smoothstep(0.4, 0.0, md) * 0.12;
          color += uColor1 * mg;
          alpha += mg;

          gl_FragColor = vec4(color, alpha * 0.5);
        }
      `}),i=new D;for(let e=0;e<g;e++){const t=.5+e*.25,n=.006+e*8e-4,a=64+e*2,r=new F(t,n,8,a),h=z.clone(),S=.5+e/g*.15;h.uniforms.uColor1.value=new v().setHSL(S,.8,.5),h.uniforms.uColor2.value=new v().setHSL(S+.1,.6,.18),h.uniforms.uBrightness.value=.3+e/g*.35;const l=new I(r,h);l.rotation.x=Math.PI*.5,l.rotation.z=Math.random()*.08,l.userData={rotSpeed:(3e-4+Math.random()*6e-4)*(e%2===0?1:-1),baseRot:l.rotation.z},i.add(l)}p.add(i);const d=new Float32Array(T*3);for(let e=0;e<T;e++){const t=e*3,n=Math.random()*6,a=Math.random()*Math.PI*2,r=Math.random()*Math.PI;d[t]=n*Math.sin(r)*Math.cos(a),d[t+1]=n*Math.sin(r)*Math.sin(a),d[t+2]=n*Math.cos(r)*.3}const w=new N;w.setAttribute("position",new V(d,3));const x=new _({color:58879,size:.018,transparent:!0,opacity:.25,blending:R,depthWrite:!1}),f=new k(w,x);p.add(f);const s={x:.5,y:.5},m={x:.5,y:.5},C=e=>{m.x=e.clientX/window.innerWidth,m.y=e.clientY/window.innerHeight};window.addEventListener("mousemove",C,{passive:!0});let y;const W=new O,E=()=>{y=requestAnimationFrame(E);const e=W.getElapsedTime();s.x+=(m.x-s.x)*.02,s.y+=(m.y-s.y)*.02;for(let n=0;n<i.children.length;n++){const a=i.children[n],r=a.material;r.uniforms.uTime.value=e,r.uniforms.uMouse.value.set(s.x,1-s.y),a.rotation.z=a.userData.baseRot+e*a.userData.rotSpeed}i.rotation.x=Math.sin(e*.08)*.06,i.rotation.y=Math.sin(e*.05)*.04;const t=1+Math.sin(e*.6)*.015;i.scale.setScalar(t),f.rotation.y=e*.008,f.rotation.x=e*.004,o.render(p,u)};E();const P=()=>{u.aspect=window.innerWidth/window.innerHeight,u.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)};return window.addEventListener("resize",P,{passive:!0}),()=>{cancelAnimationFrame(y),window.removeEventListener("mousemove",C),window.removeEventListener("resize",P),i.children.forEach(e=>{const t=e;t.geometry.dispose(),t.material.dispose()}),w.dispose(),x.dispose(),o.dispose(),c.contains(o.domElement)&&c.removeChild(o.domElement)}},[]),A.jsx("div",{ref:M,className:"fixed inset-0 z-0",style:{background:"#0a0a0f"}})}export{J as VortexEngine};
