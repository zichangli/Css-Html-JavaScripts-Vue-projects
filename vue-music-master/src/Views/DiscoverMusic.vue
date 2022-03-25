<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <a
          target="_blank"
          :href="item.url == null ? 'https://gitee.com/S88888888' : item.url"
          ><img :src="item.imageUrl" alt="推荐广告信息"
        /></a>
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt="" @click="playmusiclist(item.id)" />
            <span class="iconfont icon-play" @click="playmusiclist(item.id)">
              <i class="el-icon-video-play"></i>
            </span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in songs"
          :key="index"
          @click="playMusic(item.id)"
        >
          <div class="img-wrap">
            <!-- 封面 -->
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont icon-play">
              <i class="el-icon-video-play"></i
            ></span>
          </div>
          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index">
          <div class="img-wrap">
            <img
              :src="item.picUrl"
              alt="MV图片"
              @click="playMusicMv(item.id)"
            />
            <span class="iconfont icon-play">
              <i class="el-icon-video-play" @click="playMusicMv(item.id)"></i>
            </span>

            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <!-- 播放次数 -->
              <div class="num">播放量:{{ item.playCount }}</div>
            </div>
          </div>

          <div class="info-wrap">
            <!-- mv名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      list: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: [],
    };
  },
  async created() {
    this.banner();
    this.personalized();
    this.newsong();
    this.personalizedMv();
    //判断登录
    this.isLogon();
  },
  methods: {
    async banner() {
      // 轮播图接口
      const { data: res } = await this.$http.get("/banner", {
        responseType: "json",
        withCredentials: true,
      });
      if (res.code !== 200) {
        return this.$message.error("error:轮播图数据获取失败 ");
      } else {
        this.banners = res.banners;
      }
    },

    async personalized() {
      //获取歌单
      const { data: res } = await this.$http.get("/personalized?limit=10");
      if (res.code !== 200) {
        return this.$message.error("error:歌单数据获取失败 ");
      } else {
        this.list = res.result;
      }
    },

    async newsong() {
      //获取最新歌曲
      const { data: res } = await this.$http.get("/personalized/newsong");
      if (res.code !== 200) {
        return this.$message.error("error:最新歌曲获取失败 ");
      } else {
        this.songs = res.result;
      }
    },

    async personalizedMv() {
      //获取最新MV
      const { data: res } = await this.$http.get("/personalized/Mv");
      if (res.code !== 200) {
        return this.$message.error("error:最新MV获取失败 ");
      } else {
        this.mvs = res.result;
      }
    },

    async playMusic(id) {
      const { data: res } = await this.$http.get("/song/url?id=" + id);
      if (res.code !== 200) {
        return this.$message.error(
          "error:获取歌曲地址失败，请检查版权...或者网络 "
        );
      } else {
        let url = res.data[0].url;
        // 设置给父组件的 播放地址
        this.$parent.musicUrl = url;
      }
    },
    //跳转去MV页面时间
    async playMusicMv(id) {
      if (id == "") {
        return await this.$message.error(
          "error:获取MV失败，请检查版权...或者网络 "
        );
      } else {
        // 去搜索页 携带数据
        await this.$router.push("/PlayMusicMV?q=" + id);
      }
    },
    //跳转去歌单页面时间
    async playmusiclist(id) {
      if (id == "") {
        return await this.$message.error(
          "error:获取歌单失败，请检查版权...或者网络 "
        );
      } else {
        // 去搜索页 携带数据
        await this.$router.push("/PlayMusicList?q=" + id);
      }
    },
    isLogon() {
      let userid = sessionStorage.getItem("userid");
      let token = sessionStorage.getItem("token");
      if (userid != null && token != null) {
       
      }else
      {

      }

    },
  },
};
</script>

<style></style>
