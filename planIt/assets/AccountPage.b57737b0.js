import{c,o as i,b as d,d as e,t as n,I as r,w as u,v as _,p,i as m}from"./vendor.eee2fd9a.js";import{_ as h,A as f}from"./index.67ea13c1.js";const v={name:"Account",setup(){return{account:c(()=>f.account)}}},a=t=>(p("data-v-4d4d3836"),t=t(),m(),t),x={class:"d-flex flex-column align-items-center"},b={class:"about text-center"},g=["src"],y=a(()=>e("hr",null,null,-1)),w={class:"d-flex flex-column"},A=a(()=>e("label",{for:"title"},"Title",-1)),I=a(()=>e("label",{for:"name"},"Name",-1)),S=a(()=>e("input",{type:"text",name:"name","aria-label":"account owener name",placeholder:"name..."},null,-1)),B=a(()=>e("label",{for:"email"},"Email",-1)),j=a(()=>e("input",{type:"url",placeholder:"email..."},null,-1));function k(t,l,D,o,E,N){return i(),d("div",x,[e("div",b,[e("h1",null,"Welcome "+n(o.account.name),1),e("img",{class:"rounded",src:o.account.picture,alt:""},null,8,g),e("p",null,n(o.account.email),1)]),y,e("div",null,[e("form",r(t.submit),[e("div",w,[A,u(e("input",{type:"text",placeholder:"title...",name:"title","aria-label":"account owner title","onUpdate:modelValue":l[0]||(l[0]=s=>t.email=s)},null,512),[[_,t.email]]),I,S,B,j])],16)])])}var V=h(v,[["render",k],["__scopeId","data-v-4d4d3836"]]);export{V as default};
