<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">
          {{ topList.name }}
        </div>
        <!-- 介绍 -->
        <div class="info">
          {{ topList.description }}
        </div>
      </div>
      <!-- 背景 -->
      <img :src="topList.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: tag == '全部' }"
          @click="tag = '全部'"
        >
          全部
        </span>
        <span
          class="item"
          :class="{ active: tag == '欧美' }"
          @click="tag = '欧美'"
        >
          欧美
        </span>
        <span
          class="item"
          :class="{ active: tag == '华语' }"
          @click="tag = '华语'"
        >
          华语
        </span>
        <span
          class="item"
          :class="{ active: tag == '流行' }"
          @click="tag = '流行'"
        >
          流行
        </span>
        <span
          class="item"
          :class="{ active: tag == '说唱' }"
          @click="tag = '说唱'"
        >
          说唱
        </span>
        <span
          class="item"
          :class="{ active: tag == '摇滚' }"
          @click="tag = '摇滚'"
        >
          摇滚
        </span>
        <span
          class="item"
          :class="{ active: tag == '民谣' }"
          @click="tag = '民谣'"
        >
          民谣
        </span>
        <span
          class="item"
          :class="{ active: tag == '电子' }"
          @click="tag = '电子'"
        >
          电子
        </span>
        <span
          class="item"
          :class="{ active: tag == '轻音乐' }"
          @click="tag = '轻音乐'"
        >
          轻音乐
        </span>
        <span
          class="item"
          :class="{ active: tag == '影视原声' }"
          @click="tag = '影视原声'"
        >
          影视原声
        </span>
        <span
          class="item"
          :class="{ active: tag == 'ACG' }"
          @click="tag = 'ACG'"
        >
          ACG
        </span>
        <span
          class="item"
          :class="{ active: tag == '怀旧' }"
          @click="tag = '怀旧'"
        >
          怀旧
        </span>
        <span
          class="item"
          :class="{ active: tag == '治愈' }"
          @click="tag = '治愈'"
        >
          治愈
        </span>
        <span
          class="item"
          :class="{ active: tag == '旅行' }"
          @click="tag = '旅行'"
        >
          旅行
        </span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img   :src="item.coverImgUrl" alt="" @click="playmusiclist(item.id)" />
              <span class="iconfont icon-play" @click="playmusiclist(item.id)"><i class="el-icon-video-play"></i> </span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
     -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 顶部的推荐歌单
      topList: {},
      // 歌单列表
      list: [],
      // 当前选择的数据
      tag: "全部",
    };
  },
  // 侦听器
  watch: {
    tag() {
      // 顶部的 精品歌单
      this.topData();
      // 歌单列表
      this.listData();
      // 修改页码为1
      this.page = 1;
    },
  },
  created() {
    // 顶部的 精品歌单
    this.topData();
    // 歌单列表
    this.listData();
  },
  methods: {
    // 抽取的方法1 顶部的数据
    async topData() {
      const { data: res } = await this.$http.get("/top/playlist/highquality?limit=1&cat=" + this.tag);
      if (res.code !== 200) {
        return this.$message.error("error:获取精品歌单获取失败 ");
      } else {
        this.topList = res.playlists[0];
      }
    },
    // 抽取的方法2 列表数据
   async listData() {
      const { data: res } = await this.$http.get("/top/playlist?limit=10&offset="+(this.page - 1) * 10+"&cat="+this.tag);
      if (res.code !== 200) {
        return this.$message.error("error:获取页码失败 ");
      } else {
        this.total = res.total;
        // 保存数据
        this.list = res.playlists;
      }
    },
    // 页码改变事件
  async  handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      // 保存页码
      this.page = val;
      // 重新获取数据
      this.listData();
    },
        //跳转去歌单页面时间
    async playmusiclist(id) {
      if (id == "") {
        return this.$message.error(
          "error:获取歌单失败，请检查版权...或者网络 "
        );
      } else {
        // 去搜索页 携带数据
        await this.$router.push("/PlayMusicList?q=" + id);
      }
    },
  },
};
</script>

<style></style>
