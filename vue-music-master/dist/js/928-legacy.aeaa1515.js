"use strict";(self["webpackChunkmusic163_vue"]=self["webpackChunkmusic163_vue"]||[]).push([[928],{8928:function(t,a,e){e.r(a),e.d(a,{default:function(){return l}});var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"songs-container"},[e("div",{staticClass:"itemset"},[e("i",{staticClass:"el-icon-setting",on:{click:function(a){t.showdata=!t.showdata}}})]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.showdata,expression:"showdata"}],staticClass:"tab-bar"},[e("span",{staticClass:"item",class:{active:0==t.tag},on:{click:function(a){t.tag=0}}},[t._v(" 全部 ")]),e("span",{staticClass:"item",class:{active:7==t.tag},on:{click:function(a){t.tag=7}}},[t._v(" 华语 ")]),e("span",{staticClass:"item",class:{active:96==t.tag},on:{click:function(a){t.tag=96}}},[t._v(" 欧美 ")]),e("span",{staticClass:"item",class:{active:8==t.tag},on:{click:function(a){t.tag=8}}},[t._v(" 日本 ")]),e("span",{staticClass:"item",class:{active:16==t.tag},on:{click:function(a){t.tag=16}}},[t._v(" 韩国 ")])]),e("table",{staticClass:"el-table playlit-table"},[t._m(0),e("tbody",t._l(t.lists,(function(a,n){return e("tr",{key:n,staticClass:"el-table__row",on:{click:function(e){return t.playMusic(a.id,a.name)}}},[e("td",[t._v(t._s(n+1))]),e("td",[e("div",{staticClass:"img-wrap"},[e("img",{attrs:{src:a.album.picUrl,alt:""}})])]),e("td",[e("div",{staticClass:"song-wrap"},[e("div",{staticClass:"name-wrap"},[e("span",[t._v(t._s(a.name))]),e("span",{staticClass:"iconfont icon-mv"})]),e("span")])]),e("td",[t._v(t._s(a.album.artists["0"].name))]),e("td",[t._v(t._s(a.album.name))]),e("td",[t._v(t._s(a.duration))])])})),0)])])},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("th"),e("th"),e("th",[t._v("音乐标题")]),e("th",[t._v("歌手")]),e("th",[t._v("专辑")]),e("th",[t._v("时长")])])}],r=e(6198),i=(e(4660),e(5666),{data:function(){return{lists:[],tag:"0",showdata:!0}},watch:{tag:function(){this.getList()}},created:function(){this.getList()},methods:{setshow:function(){return(0,r.Z)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:showdata=!1;case 1:case"end":return t.stop()}}),t)})))()},getList:function(){var t=this;return(0,r.Z)(regeneratorRuntime.mark((function a(){var e,n,s,r,i,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get("/top/song?type="+t.tag);case 2:if(e=a.sent,n=e.data,200===n.code){a.next=8;break}return a.abrupt("return",t.$message.error("error:音乐数据失败 "));case 8:for(t.lists=n.data,s=0;s<t.lists.length;s++)r=t.lists[s].duration,i=parseInt(r/1e3/60),i<10&&(i="0"+i),c=parseInt(r/1e3%60),c<10&&(c="0"+c),t.lists[s].duration="".concat(i,":").concat(c);case 10:case"end":return a.stop()}}),a)})))()},playMusic:function(t){var a=arguments,e=this;return(0,r.Z)(regeneratorRuntime.mark((function n(){var s,r,i,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return s=a.length>1&&void 0!==a[1]?a[1]:null,n.next=3,e.$http.get("/song/url?id="+t);case 3:if(r=n.sent,i=r.data,200===i.code){n.next=9;break}return n.abrupt("return",e.$message.error("error:音乐数据失败 "));case 9:c=i.data[0].url,e.$parent.audioSrc(c),e.$parent.audioSong(s);case 12:case"end":return n.stop()}}),n)})))()}}}),c=i,o=e(3736),u=(0,o.Z)(c,n,s,!1,null,null,null),l=u.exports},4660:function(t,a,e){var n=e(2109),s=e(7854),r=e(7293),i=e(3157),c=e(111),o=e(7908),u=e(6244),l=e(6135),d=e(5417),v=e(1194),f=e(5112),h=e(7392),p=f("isConcatSpreadable"),g=9007199254740991,m="Maximum allowed index exceeded",w=s.TypeError,_=h>=51||!r((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),C=v("concat"),b=function(t){if(!c(t))return!1;var a=t[p];return void 0!==a?!!a:i(t)},k=!_||!C;n({target:"Array",proto:!0,forced:k},{concat:function(t){var a,e,n,s,r,i=o(this),c=d(i,0),v=0;for(a=-1,n=arguments.length;a<n;a++)if(r=-1===a?i:arguments[a],b(r)){if(s=u(r),v+s>g)throw w(m);for(e=0;e<s;e++,v++)e in r&&l(c,v,r[e])}else{if(v>=g)throw w(m);l(c,v++,r)}return c.length=v,c}})}}]);
//# sourceMappingURL=928-legacy.aeaa1515.js.map