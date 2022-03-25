<template>
  <div class="index-container">
    <!-- 导航区域 -->

    <div class="nav">
      <el-row class="tac">
        <el-col :span="20">
          <el-menu
            default-active="1"
            class="nav"
            active-text-color="#dd6d60"
            background-color="#ededed"
            text-color="#303133"
          >
            <router-link to="/DiscoverMusic">
              <el-menu-item index="1">
                <span class="el-icon-platform-eleme"></span>
                发现音乐
              </el-menu-item>
            </router-link>
            <router-link to="/RecommendedMusic">
              <el-menu-item index="2">
                <li>
                  <span class="el-icon-present"></span>
                  推荐歌单
                </li>
              </el-menu-item>
            </router-link>
            <router-link to="/LatestMusic">
              <el-menu-item index="3">
                <span class="el-icon-news"></span>
                最新音乐
              </el-menu-item>
            </router-link>
            <router-link to="/LatestMV">
              <el-menu-item index="4">
                <span class="el-icon-video-camera-solid"></span>
                最新MV
              </el-menu-item>
            </router-link>

            <!-- <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>我创建的歌单</span>
              </template>

              <router-link to="/demo">
                <el-menu-item-group>
                  <el-menu-item index="1-1"
                    ><i class="el-icon-star-off"></i>我喜欢的音乐</el-menu-item
                  >
                </el-menu-item-group>
              </router-link> -->

            <!-- </el-submenu> -->
          </el-menu>
        </el-col>
      </el-row>
    </div>

    <!-- 主体区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->

    <div class="player">
      <!-- autoplay 自动播放 -->
      <div class="player_box">
        <!-- <span><i class="el-icon-video-play"></i> {{singsong}}</span> -->
        <span>{{ singsong }}</span>
      </div>
      <audio
        :src="musicUrl"
        ref="audioDom"
        controls="controls"
        crossOrigin="anonymous"
        autoplay="autoplay"
        paused
      ></audio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicUrl: "",
      singsong: "",
    };
  },

  async created() {
  },
  methods: {
    //暂停
    async audioPause() {
      await this.$refs.audioDom.pause();
    },
    //播放
    //原因：
    // 从Chrome50开始，对<video>或<audio>元素的play()调用返回一个Promise。
    // 一个异步返回单个结果的函数。如果回放成功，Promise就会实现，而play事件也会同时触发，对应执行.then。
    // 如果回放失败，Promise将被拒绝，同时会有一个错误消息解释失败，对应执行.catch。
    async audioPlay() {
      // await this.$refs.audioDom.load();
      // await this.$refs.audioDom.play();
      let playPromise = this.$refs.audioDom.play();

      if (playPromise !== undefined) {
        await playPromise
          .then(() => {
            this.$refs.audioDom.play();
          })
          .catch(() => {});
      }
    },
    //播放地址
    audioSrc(value) {
      // this.$refs.audioDom.src = value;
      this.musicUrl = value;
    },
    //地址
    audioSong(value) {
      this.singsong = value;
    },
  },
};
</script>

<style></style>
