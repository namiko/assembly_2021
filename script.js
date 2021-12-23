/*! For license information please see script.js.LICENSE.txt */
(()=>{"use strict";var e={733:(e,t,r)=>{r.r(t),r.d(t,{Properties:()=>o,VariableDescriptor:()=>n,bootstrapExtra:()=>K,findLayerBoundaries:()=>m,findLayersBoundaries:()=>c,getAllVariables:()=>a,getLayersMap:()=>l,initDoors:()=>q,initPropertiesTemplates:()=>V,initVariableActionLayer:()=>J});class o{constructor(e){this.properties=null!=e?e:[]}get(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.value));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const r=this.get(e);if(void 0!==r){if(typeof r!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const r=this.get(e);if(void 0===r)throw new Error('Property "'+e+'" is missing');if(typeof r!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return r}getType(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.type));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}}class n{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new o(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return!e||WA.player.tags.includes(e)}get isWritable(){const e=this.properties.getString("writableBy");return!e||WA.player.tags.includes(e)}}async function a(){const e=await WA.room.getTiledMap(),t=new Map;return i(e.layers,t),t}function i(e,t){for(const r of e)if("objectgroup"===r.type)for(const e of r.objects)"variable"===e.type&&t.set(e.name,new n(e));else"group"===r.type&&i(r.layers,t)}let s;async function l(){return void 0===s&&(s=async function(){return function(e){const t=new Map;return u(e.layers,"",t),t}(await WA.room.getTiledMap())}()),s}function u(e,t,r){for(const o of e)"group"===o.type?u(o.layers,t+o.name+"/",r):(o.name=t+o.name,r.set(o.name,o))}function m(e){let t=1/0,r=1/0,o=0,n=0;const a=e.data;if("string"==typeof a)throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let i=0;i<e.height;i++)for(let s=0;s<e.width;s++)0!==a[s+i*e.width]&&(t=Math.min(t,s),n=Math.max(n,s),r=Math.min(r,i),o=Math.max(o,i));return{top:r,left:t,right:n+1,bottom:o+1}}function c(e){let t=1/0,r=1/0,o=0,n=0;for(const a of e){const e=m(a);e.left<t&&(t=e.left),e.top<r&&(r=e.top),e.right>n&&(n=e.right),e.bottom>o&&(o=e.bottom)}return{top:r,left:t,right:n,bottom:o}}var y=Object.prototype.toString,p=Array.isArray||function(e){return"[object Array]"===y.call(e)};function h(e){return"function"==typeof e}function f(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function A(e,t){return null!=e&&"object"==typeof e&&t in e}var d=RegExp.prototype.test,g=/\S/;var W={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},b=/\s*/,T=/\s+/,v=/\s*=/,w=/\s*\}/,L=/#|\^|\/|>|\{|&|=|!/;function x(e){this.string=e,this.tail=e,this.pos=0}function S(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function C(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}x.prototype.eos=function(){return""===this.tail},x.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r},x.prototype.scanUntil=function(e){var t,r=this.tail.search(e);switch(r){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,r),this.tail=this.tail.substring(r)}return this.pos+=t.length,t},S.prototype.push=function(e){return new S(e,this)},S.prototype.lookup=function(e){var t,r,o,n=this.cache;if(n.hasOwnProperty(e))t=n[e];else{for(var a,i,s,l=this,u=!1;l;){if(e.indexOf(".")>0)for(a=l.view,i=e.split("."),s=0;null!=a&&s<i.length;)s===i.length-1&&(u=A(a,i[s])||(r=a,o=i[s],null!=r&&"object"!=typeof r&&r.hasOwnProperty&&r.hasOwnProperty(o))),a=a[i[s++]];else a=l.view[e],u=A(l.view,e);if(u){t=a;break}l=l.parent}n[e]=t}return h(t)&&(t=t.call(this.view)),t},C.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},C.prototype.parse=function(e,t){var r=this.templateCache,o=e+":"+(t||E.tags).join(":"),n=void 0!==r,a=n?r.get(o):void 0;return null==a&&(a=function(e,t){if(!e)return[];var r,o,n,a,i=!1,s=[],l=[],u=[],m=!1,c=!1,y="",h=0;function A(){if(m&&!c)for(;u.length;)delete l[u.pop()];else u=[];m=!1,c=!1}function W(e){if("string"==typeof e&&(e=e.split(T,2)),!p(e)||2!==e.length)throw new Error("Invalid tags: "+e);r=new RegExp(f(e[0])+"\\s*"),o=new RegExp("\\s*"+f(e[1])),n=new RegExp("\\s*"+f("}"+e[1]))}W(t||E.tags);for(var S,C,k,_,M,V,P=new x(e);!P.eos();){if(S=P.pos,k=P.scanUntil(r))for(var B=0,D=k.length;B<D;++B)a=_=k.charAt(B),function(e,t){return d.call(e,t)}(g,a)?(c=!0,i=!0,y+=" "):(u.push(l.length),y+=_),l.push(["text",_,S,S+1]),S+=1,"\n"===_&&(A(),y="",h=0,i=!1);if(!P.scan(r))break;if(m=!0,C=P.scan(L)||"name",P.scan(b),"="===C?(k=P.scanUntil(v),P.scan(v),P.scanUntil(o)):"{"===C?(k=P.scanUntil(n),P.scan(w),P.scanUntil(o),C="&"):k=P.scanUntil(o),!P.scan(o))throw new Error("Unclosed tag at "+P.pos);if(M=">"==C?[C,k,S,P.pos,y,h,i]:[C,k,S,P.pos],h++,l.push(M),"#"===C||"^"===C)s.push(M);else if("/"===C){if(!(V=s.pop()))throw new Error('Unopened section "'+k+'" at '+S);if(V[1]!==k)throw new Error('Unclosed section "'+V[1]+'" at '+S)}else"name"===C||"{"===C||"&"===C?c=!0:"="===C&&W(k)}if(A(),V=s.pop())throw new Error('Unclosed section "'+V[1]+'" at '+P.pos);return function(e){for(var t,r=[],o=r,n=[],a=0,i=e.length;a<i;++a)switch((t=e[a])[0]){case"#":case"^":o.push(t),n.push(t),o=t[4]=[];break;case"/":n.pop()[5]=t[2],o=n.length>0?n[n.length-1][4]:r;break;default:o.push(t)}return r}(function(e){for(var t,r,o=[],n=0,a=e.length;n<a;++n)(t=e[n])&&("text"===t[0]&&r&&"text"===r[0]?(r[1]+=t[1],r[3]=t[3]):(o.push(t),r=t));return o}(l))}(e,t),n&&r.set(o,a)),a},C.prototype.render=function(e,t,r,o){var n=this.getConfigTags(o),a=this.parse(e,n),i=t instanceof S?t:new S(t,void 0);return this.renderTokens(a,i,r,e,o)},C.prototype.renderTokens=function(e,t,r,o,n){for(var a,i,s,l="",u=0,m=e.length;u<m;++u)s=void 0,"#"===(i=(a=e[u])[0])?s=this.renderSection(a,t,r,o,n):"^"===i?s=this.renderInverted(a,t,r,o,n):">"===i?s=this.renderPartial(a,t,r,n):"&"===i?s=this.unescapedValue(a,t):"name"===i?s=this.escapedValue(a,t,n):"text"===i&&(s=this.rawValue(a)),void 0!==s&&(l+=s);return l},C.prototype.renderSection=function(e,t,r,o,n){var a=this,i="",s=t.lookup(e[1]);if(s){if(p(s))for(var l=0,u=s.length;l<u;++l)i+=this.renderTokens(e[4],t.push(s[l]),r,o,n);else if("object"==typeof s||"string"==typeof s||"number"==typeof s)i+=this.renderTokens(e[4],t.push(s),r,o,n);else if(h(s)){if("string"!=typeof o)throw new Error("Cannot use higher-order sections without the original template");null!=(s=s.call(t.view,o.slice(e[3],e[5]),(function(e){return a.render(e,t,r,n)})))&&(i+=s)}else i+=this.renderTokens(e[4],t,r,o,n);return i}},C.prototype.renderInverted=function(e,t,r,o,n){var a=t.lookup(e[1]);if(!a||p(a)&&0===a.length)return this.renderTokens(e[4],t,r,o,n)},C.prototype.indentPartial=function(e,t,r){for(var o=t.replace(/[^ \t]/g,""),n=e.split("\n"),a=0;a<n.length;a++)n[a].length&&(a>0||!r)&&(n[a]=o+n[a]);return n.join("\n")},C.prototype.renderPartial=function(e,t,r,o){if(r){var n=this.getConfigTags(o),a=h(r)?r(e[1]):r[e[1]];if(null!=a){var i=e[6],s=e[5],l=e[4],u=a;0==s&&l&&(u=this.indentPartial(a,l,i));var m=this.parse(u,n);return this.renderTokens(m,t,r,u,o)}}},C.prototype.unescapedValue=function(e,t){var r=t.lookup(e[1]);if(null!=r)return r},C.prototype.escapedValue=function(e,t,r){var o=this.getConfigEscape(r)||E.escape,n=t.lookup(e[1]);if(null!=n)return"number"==typeof n&&o===E.escape?String(n):o(n)},C.prototype.rawValue=function(e){return e[1]},C.prototype.getConfigTags=function(e){return p(e)?e:e&&"object"==typeof e?e.tags:void 0},C.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!p(e)?e.escape:void 0};var E={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){k.templateCache=e},get templateCache(){return k.templateCache}},k=new C;E.clearCache=function(){return k.clearCache()},E.parse=function(e,t){return k.parse(e,t)},E.render=function(e,t,r,o){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(p(n=e)?"array":typeof n)+'" was given as the first argument for mustache#render(template, view, partials)');var n;return k.render(e,t,r,o)},E.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return W[e]}))},E.Scanner=x,E.Context=S,E.Writer=C;const _=E;class M{constructor(e,t){this.template=e,this.state=t,this.ast=_.parse(e)}getValue(){return void 0===this.value&&(this.value=_.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const r of this.getUsedVariables().values())t.push(this.state.onVariableChange(r).subscribe((()=>{const t=_.render(this.template,this.state);t!==this.value&&(this.value=t,e(this.value))})));return{unsubscribe:()=>{for(const e of t)e.unsubscribe()}}}isPureString(){return 0===this.ast.length||1===this.ast.length&&"text"===this.ast[0][0]}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const r of e){const e=r[0],o=r[1],n=r[4];["name","&","#","^"].includes(e)&&t.add(o),void 0!==n&&"string"!=typeof n&&this.recursiveGetUsedVariables(n,t)}}}async function V(){var e;const t=await l();for(const[r,o]of t.entries()){const t=null!==(e=o.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type||"string"!=typeof e.value)continue;const t=new M(e.value,WA.state);if(t.isPureString())continue;const o=t.getValue();P(r,e.name,o),t.onChange((t=>{P(r,e.name,t)}))}}}function P(e,t,r){WA.room.setProperty(e,t,r),"visible"===t&&(r?WA.room.showLayer(e):WA.room.hideLayer(e))}const B="https://unpkg.com/@workadventure/scripting-api-extra@1.1.1/dist";let D,O,j=0,G=0;function U(e){if(WA.state[e.name]){let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.showLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.hideLayer(e)}else{let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.hideLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.showLayer(e)}}function F(e){return e.map((e=>D.get(e))).filter((e=>"tilelayer"===(null==e?void 0:e.type)))}function R(e){const t=c(F(e)),r=32*((t.right-t.left)/2+t.left),o=32*((t.bottom-t.top)/2+t.top);return Math.sqrt(Math.pow(j-r,2)+Math.pow(G-o,2))}function N(e){WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]?function(e){const t=e.properties.getString("openSound"),r=e.properties.getNumber("soundRadius");let o=1;if(r){const t=R(e.properties.mustGetString("openLayer").split("\n"));if(t>r)return;o=1-t/r}t&&WA.sound.loadSound(t).play({volume:o})}(e):function(e){const t=e.properties.getString("closeSound"),r=e.properties.getNumber("soundRadius");let o=1;if(r){const t=R(e.properties.mustGetString("closeLayer").split("\n"));if(t>r)return;o=1-t/r}t&&WA.sound.loadSound(t).play({volume:o})}(e),U(e)})),U(e)}function I(e,t,r,o){const n=e.name;let a,i,s=!1;const l=r.getString("zone");if(!l)throw new Error('Missing "zone" property on doorstep layer "'+n+'"');const u=r.getString("tag");let m=!0;u&&!WA.player.tags.includes(u)&&(m=!1);const y=!!u;function p(){var e;a&&a.remove(),a=WA.ui.displayActionMessage({message:null!==(e=r.getString("closeTriggerMessage"))&&void 0!==e?e:"Press SPACE to close the door",callback:()=>{WA.state[t.name]=!1,h()}})}function h(){var e;a&&a.remove(),a=WA.ui.displayActionMessage({message:null!==(e=r.getString("openTriggerMessage"))&&void 0!==e?e:"Press SPACE to open the door",callback:()=>{WA.state[t.name]=!0,p()}})}function f(){i&&(WA.room.website.delete(i.name),i=void 0)}WA.room.onEnterZone(l,(()=>{s=!0,r.getBoolean("autoOpen")&&m?WA.state[t.name]=!0:WA.state[t.name]||(!y||m)&&y||!r.getString("code")&&!r.getString("codeVariable")?m&&(WA.state[t.name]?p():h()):function(e){const r=c(F(t.properties.mustGetString("closeLayer").split("\n")));i=WA.room.website.create({name:"doorKeypad"+e,url:o+"/keypad.html#"+encodeURIComponent(e),position:{x:32*r.right,y:32*r.top,width:96,height:128},allowApi:!0})}(n)})),WA.room.onLeaveZone(l,(()=>{s=!1,r.getBoolean("autoClose")&&(WA.state[t.name]=!1),a&&a.remove(),f()})),WA.state.onVariableChange(t.name).subscribe((()=>{s&&(r.getBoolean("autoClose")||!0!==WA.state[t.name]||p(),i&&!0===WA.state[t.name]&&f(),r.getBoolean("autoOpen")||!1!==WA.state[t.name]||h())}))}function z(e){void 0===WA.state[e.name]&&(WA.state[e.name]=0),WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]&&function(e){const t=e.properties.mustGetString("bellSound"),r=e.properties.getNumber("soundRadius");let o=1;if(r){const t=Math.sqrt(Math.pow(e.x-j,2)+Math.pow(e.y-G,2));if(t>r)return;o=1-t/r}WA.sound.loadSound(t).play({volume:o})}(e)}))}function Z(e,t){let r;const o=t.mustGetString("zone"),n=t.getString("bellPopup");WA.room.onEnterZone(o,(()=>{var o;n?r=WA.ui.openPopup(n,"",[{label:null!==(o=t.getString("bellButtonText"))&&void 0!==o?o:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.onLeaveZone(o,(()=>{r&&(r.close(),r=void 0)}))}async function q(e){e=null!=e?e:B;const t=await a();D=await l();for(const e of t.values())e.properties.get("door")&&N(e),e.properties.get("bell")&&z(e);for(const r of D.values()){const n=new o(r.properties),a=n.getString("doorVariable");if(a&&"tilelayer"===r.type){const o=t.get(a);if(void 0===o)throw new Error('Cannot find variable "'+a+'" referred in the "doorVariable" property of layer "'+r.name+'"');I(r,o,n,e)}const i=n.getString("bellVariable");i&&Z(i,n)}WA.player.onPlayerMove((e=>{j=e.x,G=e.y}))}function J(e){const t=e.getString("bindVariable");if(t){const r=e.getString("zone");if(!r)throw new Error('A layer with a "bindVariable" property must ALSO have a "zone" property.');!function(e,t,r,o,n,a){a&&!WA.player.tags.includes(a)||(void 0!==r&&WA.room.onEnterZone(t,(()=>{n||(WA.state[e]=r)})),void 0!==o&&WA.room.onLeaveZone(t,(()=>{WA.state[e]=o})))}(t,r,e.get("enterValue"),e.get("leaveValue"),e.getString("triggerMessage"),e.getString("tag"))}}function $(e,t){let r;const o=t.getString("zone");if(!o)throw new Error('Missing "zone" property');const n=t.getString("openConfigAdminTag");let a=!0;function i(){WA.nav.closeCoWebSite()}n&&!WA.player.tags.includes(n)&&(a=!1),WA.room.onEnterZone(o,(()=>{const o=t.getString("openConfigTrigger");var n;a&&(o&&"onaction"===o?(r&&r.remove(),r=WA.ui.displayActionMessage({message:null!==(n=t.getString("openConfigTriggerMessage"))&&void 0!==n?n:"Press SPACE or touch here to configure",callback:()=>H(e)})):H(e))})),WA.room.onLeaveZone(o,(()=>{r?(r.remove(),i()):i()}))}function H(e){const t=e?"#"+e:"";WA.nav.openCoWebSite(B+"/configuration.html"+t,!0)}function K(){return WA.onInit().then((()=>{q().catch((e=>console.error(e))),async function(){const e=await l();for(const t of e.values())J(new o(t.properties))}().catch((e=>console.error(e))),async function(e){const t=await WA.room.getTiledMap();e=null!=e?e:B,O=await l();const r=t.layers.find((e=>"configuration"===e.name));if(r){const t=new o(r.properties).getString("tag");t&&!WA.player.tags.includes(t)||WA.ui.registerMenuCommand("Configure the room",(()=>{WA.nav.openCoWebSite(e+"/configuration.html",!0)}));for(const e of O.values()){const t=new o(e.properties),r=t.getString("openConfig");r&&"tilelayer"===e.type&&$(r,t)}}}().catch((e=>console.error(e))),V().catch((e=>console.error(e)))}))}},942:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.estimateTimeOfDay=t.initDaytimes=void 0,t.initDaytimes=()=>{(0,t.estimateTimeOfDay)(),setInterval(t.estimateTimeOfDay,6e5)},t.estimateTimeOfDay=function(){const e=(new Date).getUTCHours();e>=17||e<=9?(WA.room.showLayer("Daemmerung"),WA.room.hideLayer("Feuerschimmer"),WA.room.hideLayer("Beleuchtung"),WA.room.hideLayer("Abend"),WA.room.hideLayer("Nacht")):e>=20||e<=7?(WA.room.showLayer("Daemmerung"),WA.room.showLayer("Feuerschimmer"),WA.room.showLayer("Beleuchtung"),WA.room.showLayer("Abend"),WA.room.hideLayer("Nacht")):e>=22||e<=5?(WA.room.showLayer("Nacht"),WA.room.showLayer("Daemmerung"),WA.room.showLayer("Feuerschimmer"),WA.room.showLayer("Beleuchtung"),WA.room.showLayer("Abend")):(WA.room.hideLayer("Nacht"),WA.room.hideLayer("Daemmerung"),WA.room.hideLayer("Feuerschimmer"),WA.room.hideLayer("Beleuchtung"),WA.room.hideLayer("Abend"))}},372:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initInteractions=void 0;let r,o,n=new Array,a=!1,i=!1;t.initInteractions=()=>{r=WA.sound.loadSound("assets/mp3/67243__robban87__snowstep_shortened.mp3"),o=WA.sound.loadSound("assets/mp3/204035__duckduckpony__footsteps-water-light-008_shortened.mp3"),s()};let s=function(){let e={volume:.2,loop:!1,rate:1,detune:1,delay:0,seek:0,mute:!1};WA.room.onEnterLayer("SnowSteps").subscribe((()=>{a=!0})),WA.room.onLeaveLayer("SnowSteps").subscribe((()=>{a=!1,n.forEach((function(e){WA.room.setTiles([{x:e.x,y:e.y,tile:null,layer:"footsteps"}])}))})),WA.room.onEnterLayer("WaterSteps").subscribe((()=>{i=!0})),WA.room.onLeaveLayer("WaterSteps").subscribe((()=>{i=!1})),WA.player.onPlayerMove((t=>{a?t.moving?(r.play(e),function(e){let t=function(e){let t="center",r="center",o=e.x/32,n=e.y/32;if(!((o+"").indexOf(".")<0)){let e=+(o+"").split(".")[1][0];e<=3&&(t="left"),e>7&&(t="right")}if(!((n+"").indexOf(".")<0)){let e=+(n+"").split(".")[1][0];e<=3&&(r="bottom"),e>6&&(r="ceil")}return{vertical:t,horizontal:r}}(e),r=Math.trunc(e.x/32),o=Math.round(e.y/32),a=t.vertical;"left"!==e.direction&&"right"!==e.direction||(a=t.horizontal);let i="step_"+e.direction+"_"+a;if(WA.room.setTiles([{x:r,y:o,tile:i,layer:"footsteps"}]),3==n.length){let e=n.shift();WA.room.setTiles([{x:e.x,y:e.y,tile:null,layer:"footsteps"}])}n.push({x:r,y:o})}(t)):r.stop():i&&(t.moving?o.play(e):o.stop())}))}},825:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initMiniquest=void 0;let r=!1,o=!1,n=!1,a=!1,i=!1,s=(new Date).getTime(),l=(new Date).getTime(),u=(new Date).getTime();t.initMiniquest=()=>{WA.room.hideLayer("hat"),WA.room.hideLayer("hat_glow"),WA.room.hideLayer("shock"),m()};let m=function(){WA.room.onEnterLayer("shockArea").subscribe((()=>{WA.room.showLayer("shock"),o&&(i=!1,r=!0,l=(new Date).getTime(),o=!1,n=!0,WA.room.hideLayer("hat"),WA.room.showLayer("hat_glow"))})),WA.room.onLeaveLayer("shockArea").subscribe((()=>{WA.room.hideLayer("shock"),l=(new Date).getTime()})),WA.room.onEnterLayer("solderStation").subscribe((()=>{o||n||(s=(new Date).getTime(),i=!1,o=!0,n=!1,WA.room.showLayer("hat"),WA.room.hideLayer("hat_glow")),n&&(i=!1,a=!0)})),WA.player.onPlayerMove((e=>{u=(new Date).getTime()-s,u>=3e3&&o&&(i=!0),u=(new Date).getTime()-l,u>=3e3&&n&&!a&&(i=!0),i&&(o=!1,n=!1,WA.room.hideLayer("hat"),WA.room.hideLayer("hat_glow"))}))}},949:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initTeamPlay=void 0;const o=r(110);let n,a,i=[];t.initTeamPlay=function(){WA.room.hideLayer("TeamAnimation/AniA"),WA.room.hideLayer("TeamAnimation/AniB"),WA.room.hideLayer("TeamAnimation/AniC"),WA.room.hideLayer("TeamAnimation/AniD"),WA.room.hideLayer("TeamAnimation/AniE");let e=WA.state.loadVariable("isFiring");n=JSON.parse(e);let t,r=WA.state.loadVariable("wiped");t="string"==typeof r?JSON.parse(r):r,a=t,n?(WA.room.showLayer("feuerwerk_1"),WA.room.showLayer("feuerwerk_2"),WA.room.showLayer("feuerwerk_3")):(WA.room.hideLayer("feuerwerk_1"),WA.room.hideLayer("feuerwerk_2"),WA.room.hideLayer("feuerwerk_3")),WA.room.setTiles([{x:t[0].x,y:t[0].y,tile:"marker",layer:"TeamLayer/TeamA"}]),WA.room.setTiles([{x:t[1].x,y:t[1].y,tile:"marker",layer:"TeamLayer/TeamB"}]),WA.room.setTiles([{x:t[2].x,y:t[2].y,tile:"marker",layer:"TeamLayer/TeamC"}]),WA.room.setTiles([{x:t[3].x,y:t[3].y,tile:"marker",layer:"TeamLayer/TeamD"}]),WA.room.setTiles([{x:t[4].x,y:t[4].y,tile:"marker",layer:"TeamLayer/TeamE"}]),WA.room.setTiles([{x:t[0].x,y:t[0].y,tile:"found",layer:"TeamAnimation/AniA"}]),WA.room.setTiles([{x:t[1].x,y:t[1].y,tile:"found",layer:"TeamAnimation/AniB"}]),WA.room.setTiles([{x:t[2].x,y:t[2].y,tile:"found",layer:"TeamAnimation/AniC"}]),WA.room.setTiles([{x:t[3].x,y:t[3].y,tile:"found",layer:"TeamAnimation/AniD"}]),WA.room.setTiles([{x:t[4].x,y:t[4].y,tile:"found",layer:"TeamAnimation/AniE"}]),y(),WA.state.onVariableChange("teamCounter").subscribe((e=>{console.log(e),n||l(e)})),WA.state.onVariableChange("wiped").subscribe((e=>{WA.room.setTiles([{x:a[0].x,y:a[0].y,tile:0,layer:"TeamLayer/TeamA"}]),WA.room.setTiles([{x:a[1].x,y:a[1].y,tile:0,layer:"TeamLayer/TeamB"}]),WA.room.setTiles([{x:a[2].x,y:a[2].y,tile:0,layer:"TeamLayer/TeamC"}]),WA.room.setTiles([{x:a[3].x,y:a[3].y,tile:0,layer:"TeamLayer/TeamD"}]),WA.room.setTiles([{x:a[4].x,y:a[4].y,tile:0,layer:"TeamLayer/TeamE"}]),WA.room.setTiles([{x:a[0].x,y:a[0].y,tile:0,layer:"TeamAnimation/AniA"}]),WA.room.setTiles([{x:a[1].x,y:a[1].y,tile:0,layer:"TeamAnimation/AniB"}]),WA.room.setTiles([{x:a[2].x,y:a[2].y,tile:0,layer:"TeamAnimation/AniC"}]),WA.room.setTiles([{x:a[3].x,y:a[3].y,tile:0,layer:"TeamAnimation/AniD"}]),WA.room.setTiles([{x:a[4].x,y:a[4].y,tile:0,layer:"TeamAnimation/AniE"}]),a=e,WA.room.setTiles([{x:e[0].x,y:e[0].y,tile:"marker",layer:"TeamLayer/TeamA"}]),WA.room.setTiles([{x:e[1].x,y:e[1].y,tile:"marker",layer:"TeamLayer/TeamB"}]),WA.room.setTiles([{x:e[2].x,y:e[2].y,tile:"marker",layer:"TeamLayer/TeamC"}]),WA.room.setTiles([{x:e[3].x,y:e[3].y,tile:"marker",layer:"TeamLayer/TeamD"}]),WA.room.setTiles([{x:e[4].x,y:e[4].y,tile:"marker",layer:"TeamLayer/TeamE"}]),WA.room.setTiles([{x:e[0].x,y:e[0].y,tile:"found",layer:"TeamAnimation/AniA"}]),WA.room.setTiles([{x:e[1].x,y:e[1].y,tile:"found",layer:"TeamAnimation/AniB"}]),WA.room.setTiles([{x:e[2].x,y:e[2].y,tile:"found",layer:"TeamAnimation/AniC"}]),WA.room.setTiles([{x:e[3].x,y:e[3].y,tile:"found",layer:"TeamAnimation/AniD"}]),WA.room.setTiles([{x:e[4].x,y:e[4].y,tile:"found",layer:"TeamAnimation/AniE"}])}))};let s=function(e,t){let r,o=WA.player.name,n=WA.state.loadVariable("teamCounter");"string"==typeof n?(r=JSON.parse(n),r.count=0,r.players={}):r=n;let a=r.players[e];if(a===o&&t&&r.count>0&&(r.players[e]=null,r.count=r.count-1),!a){let t=!1;for(let n in r.players)n!=e&&r.players[n]===o&&(t=!0);t?console.log("no, no, no cheating!"):(r.players[e]=o,r.count=r.count+1)}WA.state.saveVariable("teamCounter",r)},l=function(e){5===e.count&&(WA.room.showLayer("feuerwerk_1"),WA.room.showLayer("feuerwerk_2"),WA.room.showLayer("feuerwerk_3"),n=!0,WA.state.saveVariable("isFiring",n),(0,o.getRandomField)(),u(),m(),setTimeout(c,3e5))},u=function(){},m=function(){let e;e=WA.state.loadVariable("teamCounter"),e.players={},e.count=0,WA.state.saveVariable("teamCounter",e),WA.room.hideLayer("TeamAnimation/AniA"),WA.room.hideLayer("TeamAnimation/AniB"),WA.room.hideLayer("TeamAnimation/AniC"),WA.room.hideLayer("TeamAnimation/AniD"),WA.room.hideLayer("TeamAnimation/AniE")},c=function(){WA.room.hideLayer("feuerwerk_1"),WA.room.hideLayer("feuerwerk_2"),WA.room.hideLayer("feuerwerk_3"),n=!1,WA.state.saveVariable("isFiring",n)},y=function(){i.push(WA.room.onEnterLayer("TeamLayer/TeamA").subscribe((e=>{WA.room.showLayer("TeamAnimation/AniA"),s("a",!1)}))),i.push(WA.room.onEnterLayer("TeamLayer/TeamB").subscribe((()=>{WA.room.showLayer("TeamAnimation/AniB"),s("b",!1)}))),i.push(WA.room.onEnterLayer("TeamLayer/TeamC").subscribe((()=>{WA.room.showLayer("TeamAnimation/AniC"),s("c",!1)}))),i.push(WA.room.onEnterLayer("TeamLayer/TeamD").subscribe((()=>{WA.room.showLayer("TeamAnimation/AniD"),s("d",!1)}))),i.push(WA.room.onEnterLayer("TeamLayer/TeamE").subscribe((()=>{WA.room.showLayer("TeamAnimation/AniE"),s("e",!1)}))),i.push(WA.room.onLeaveLayer("TeamLayer/TeamA").subscribe((()=>{WA.room.hideLayer("TeamAnimation/AniA"),s("a",!0)}))),i.push(WA.room.onLeaveLayer("TeamLayer/TeamB").subscribe((()=>{WA.room.hideLayer("TeamAnimation/AniB"),s("b",!0)}))),i.push(WA.room.onLeaveLayer("TeamLayer/TeamC").subscribe((()=>{WA.room.hideLayer("TeamAnimation/AniC"),s("c",!0)}))),i.push(WA.room.onLeaveLayer("TeamLayer/TeamD").subscribe((()=>{WA.room.hideLayer("TeamAnimation/AniD"),s("d",!0)}))),i.push(WA.room.onLeaveLayer("TeamLayer/TeamE").subscribe((()=>{WA.room.hideLayer("TeamAnimation/AniE"),s("e",!0)})))}},110:function(e,t,r){var o=this&&this.__awaiter||function(e,t,r,o){return new(r||(r=Promise))((function(n,a){function i(e){try{l(o.next(e))}catch(e){a(e)}}function s(e){try{l(o.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,s)}l((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getRandomField=void 0;const n=r(733);t.getRandomField=function(){(function(){return o(this,void 0,void 0,(function*(){let e={width:0,accessableFields:new Array},t=[],r=(yield(0,n.getLayersMap)()).get("begehbar");e.width=r.width;for(let e=0;e<r.data.length;e++)0!=r.data[e]&&t.push(e);return e.accessableFields=t,e}))})().then((e=>{let t=[];e.accessableFields.map((e=>({value:e,sort:Math.random()}))).sort(((e,t)=>e.sort-t.sort)).map((({value:e})=>e)).slice(0,5).forEach((function(r){let o=Math.floor(r/e.width),n=r%e.width;t.push({x:n,y:o})})),WA.state.saveVariable("wiped",t)}))}}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,r),a.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const e=r(733),t=r(949),o=r(372),n=r(942),a=r(825);(0,e.bootstrapExtra)().catch((e=>console.error(e))),WA.onInit().then((()=>{(0,t.initTeamPlay)(),(0,n.initDaytimes)(),(0,o.initInteractions)(),(0,a.initMiniquest)()}))})()})();
//# sourceMappingURL=script.js.map