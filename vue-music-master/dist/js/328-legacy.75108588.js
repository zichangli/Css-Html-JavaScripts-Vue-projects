"use strict";(self["webpackChunkmusic163_vue"]=self["webpackChunkmusic163_vue"]||[]).push([[328],{9328:function(t,a,s){s.r(a),s.d(a,{default:function(){return v}});var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"mvs-container"},[s("div",{staticClass:"filter-wrap"},[s("div",{staticClass:"seciton-wrap"},[s("span",{staticClass:"section-type"},[t._v("地区:")]),s("ul",{staticClass:"tabs-wrap"},[s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"全部"==t.area},on:{click:function(a){t.area="全部"}}},[t._v(" 全部 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"内地"==t.area},on:{click:function(a){t.area="内地"}}},[t._v(" 内地 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"港台"==t.area},on:{click:function(a){t.area="港台"}}},[t._v(" 港台 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"欧美"==t.area},on:{click:function(a){t.area="欧美"}}},[t._v(" 欧美 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"日本"==t.area},on:{click:function(a){t.area="日本"}}},[t._v(" 日本 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"韩国"==t.area},on:{click:function(a){t.area="韩国"}}},[t._v(" 韩国 ")])])])]),s("div",{staticClass:"type-wrap"},[s("span",{staticClass:"type-type"},[t._v("类型:")]),s("ul",{staticClass:"tabs-wrap"},[s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"全部"==t.type},on:{click:function(a){t.type="全部"}}},[t._v(" 全部 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"官方版"==t.type},on:{click:function(a){t.type="官方版"}}},[t._v(" 官方版 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"原声"==t.type},on:{click:function(a){t.type="原声"}}},[t._v(" 原声 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"现场版"==t.type},on:{click:function(a){t.type="现场版"}}},[t._v(" 现场版 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"网易出品"==t.type},on:{click:function(a){t.type="网易出品"}}},[t._v(" 网易出品 ")])])])]),s("div",{staticClass:"order-wrap"},[s("span",{staticClass:"order-type"},[t._v("排序:")]),s("ul",{staticClass:"tabs-wrap"},[s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"上升最快"==t.order},on:{click:function(a){t.order="上升最快"}}},[t._v(" 上升最快 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"最热"==t.order},on:{click:function(a){t.order="最热"}}},[t._v(" 最热 ")])]),s("li",{staticClass:"tab"},[s("span",{staticClass:"title",class:{active:"最新"==t.order},on:{click:function(a){t.order="最新"}}},[t._v(" 最新 ")])])])])]),s("div",{staticClass:"mvs"},[s("div",{staticClass:"items"},t._l(t.list,(function(a,i){return s("div",{key:i,staticClass:"item"},[s("div",{staticClass:"img-wrap"},[s("img",{attrs:{src:a.cover,alt:""},on:{click:function(s){return t.playMusicMv(a.id)}}}),s("div",{staticClass:"num-wrap"},[s("div",{staticClass:"iconfont icon-play"}),s("div",{staticClass:"num"},[t._v("播放:"+t._s(a.playCount)+"次")])])]),s("div",{staticClass:"info-wrap"},[s("div",{staticClass:"name"},[t._v(t._s(a.name))]),s("div",{staticClass:"singer"},[t._v(t._s(a.artistName))]),s("div",{staticClass:"mvs_time"},[s("p",[t._v(" "+t._s(t._f("filterDatatime")(a.duration)))])])])])})),0),s("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total,"current-page":t.page,"page-size":5,limit:t.limit},on:{"current-change":t.handleCurrentChange}})],1)])},e=[],n=s(6198),c=(s(5666),s(381)),r=s.n(c),l={filters:{filterDatatime:function(t){return 0==t?"未获取到数据":r()(t).format("mm:ss")}},data:function(){return{total:20,page:1,limit:8,area:"全部",type:"全部",order:"上升最快",list:[]}},watch:{area:function(){this.page=1,this.getList()},type:function(){this.page=1,this.getList()},order:function(){this.page=1,this.getList()}},created:function(){this.getList()},methods:{getList:function(){var t=this;return(0,n.Z)(regeneratorRuntime.mark((function a(){var s,i,e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get("/mv/all?area="+t.area+"&type="+t.type+"&order="+t.order+"&limit="+t.limit+"&offset="+(t.page-1)*t.limit);case 2:if(s=a.sent,i=s.data,200===i.code){a.next=8;break}return a.abrupt("return",t.$message.error("error:音乐数据失败 "));case 8:for(t.list=i.data,e=0;e<t.list.length;e++)t.list[e].playCount>1e5&&(t.list[e].playCount=parseInt(t.list[e].playCount/1e4)+"万");i.data.count&&(t.total=i.count);case 11:case"end":return a.stop()}}),a)})))()},handleCurrentChange:function(t){var a=this;return(0,n.Z)(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:a.page=t,a.getList();case 2:case"end":return s.stop()}}),s)})))()},playMusicMv:function(t){var a=this;return(0,n.Z)(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(""!=t){s.next=6;break}return s.next=3,a.$message.error("error:获取MV失败，请检查版权...或者网络 ");case 3:return s.abrupt("return",s.sent);case 6:return s.next=8,a.$router.push("/PlayMusicMV?q="+t);case 8:case"end":return s.stop()}}),s)})))()}}},o=l,u=s(3736),p=(0,u.Z)(o,i,e,!1,null,null,null),v=p.exports}}]);
//# sourceMappingURL=328-legacy.75108588.js.map