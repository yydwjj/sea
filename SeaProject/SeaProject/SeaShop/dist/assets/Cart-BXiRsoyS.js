import{_ as w,r as u,m as E,c as P,a as t,b as o,w as l,f as g,h as y,t as k,d as i,o as v,u as U,n as r,p as z}from"./index-BVKDTZie.js";const M={class:"cart-container"},S={class:"cart-header"},A={class:"product-list"},D={class:"product-card"},F={class:"product-info"},I={class:"product-actions"},T={class:"cart-footer"},$={class:"footer-content"},G={class:"price-info"},H={class:"total-price"},J={__name:"Cart",setup(K){const c=u(!1),_=u(!1),m=u([]),a=u({id:1,name:"草鱼",price:35.6,quantity:2,image:"https://example.com/grass-carp.jpg"}),p=u([a.value]),V=E(()=>p.value.reduce((n,e)=>m.value.includes(e.id)?n+e.price*e.quantity:n,0)),b=()=>{c.value=!c.value},x=n=>{p.value=p.value.filter(e=>e.id!==n)},C=()=>{console.log("返回上一页")},B=()=>{console.log("去购物")};return(n,e)=>{const q=i("el-icon"),d=i("el-button"),f=i("el-checkbox"),N=i("el-input-number"),j=i("el-empty");return v(),P("div",M,[t("div",S,[o(d,{type:"text",onClick:C},{default:l(()=>[o(q,null,{default:l(()=>[o(U(z))]),_:1})]),_:1}),e[4]||(e[4]=t("h2",null,"购物车",-1)),o(d,{type:"text",onClick:b},{default:l(()=>[r(k(c.value?"完成":"编辑"),1)]),_:1})]),t("div",A,[t("div",D,[o(f,{modelValue:m.value,"onUpdate:modelValue":e[0]||(e[0]=s=>m.value=s),label:a.value.id},null,8,["modelValue","label"]),e[8]||(e[8]=t("img",{src:"https://rjt666.github.io/sea/caoyu.jpg",alt:"草鱼",class:"product-image"},null,-1)),t("div",F,[e[6]||(e[6]=t("div",{class:"product-name"},"草鱼",-1)),e[7]||(e[7]=t("div",{class:"product-price"},"单价：￥35.6",-1)),t("div",I,[o(N,{modelValue:a.value.quantity,"onUpdate:modelValue":e[1]||(e[1]=s=>a.value.quantity=s),min:1,max:10,size:"small"},null,8,["modelValue"]),c.value?(v(),g(d,{key:0,type:"danger",size:"small",onClick:e[2]||(e[2]=s=>x(a.value.id))},{default:l(()=>e[5]||(e[5]=[r(" 删除 ")])),_:1})):y("",!0)])])])]),t("div",T,[t("div",$,[o(f,{modelValue:_.value,"onUpdate:modelValue":e[3]||(e[3]=s=>_.value=s)},{default:l(()=>e[9]||(e[9]=[r("全选")])),_:1},8,["modelValue"]),t("div",G,[t("div",H,"合计：￥"+k(V.value.toFixed(2)),1),e[10]||(e[10]=t("div",{class:"discount"},"优惠：满100减10",-1))]),o(d,{type:"primary",class:"checkout-btn"},{default:l(()=>e[11]||(e[11]=[r("去结算")])),_:1})])]),p.value.length?y("",!0):(v(),g(j,{key:0,description:"购物车空空如也"},{default:l(()=>[o(d,{type:"primary",onClick:B},{default:l(()=>e[12]||(e[12]=[r("去逛逛")])),_:1})]),_:1}))])}}},O=w(J,[["__scopeId","data-v-db596ce8"]]);export{O as default};
