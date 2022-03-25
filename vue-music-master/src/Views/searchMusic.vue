<template>
  <div class="result-container">
    <div class="title-wrap">
      <!-- 标题 -->
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title">找到 {{ count }} 个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <el-table :data="songList" border style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="50"
          ></el-table-column>
          <el-table-column prop="name" label="歌名" width=""> </el-table-column>
          <el-table-column prop="artists[0].name" label="歌手" width="">
          </el-table-column>
          <el-table-column prop="album.name" label="专辑" width="180">
          </el-table-column>
          <el-table-column prop="duration" label="时长" width="120">
          </el-table-column>
          <el-table-column prop="" label="功能">
            <template slot-scope="scope">
              <i
                v-if="isPay != scope.row.id"
                class="el-icon-video-play"
                style="font-size: 22px"
                @click="playMusic(scope.row.id, scope.row.name)"
              ></i>

              <i
                v-else
                class="el-icon-video-pause"
                style="font-size: 22px"
                @click="audioPause()"
              ></i>

              <i
                class="el-icon-star-off"
                style="font-size: 22px"
                @click="LikeMusic(scope.row.id)"
              ></i>
              <i
                class="el-icon-circle-plus-outline"
                style="font-size: 22px"
                @click="MoreMusic(scope.row.id)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChangeMusic"
          background
          layout="prev, pager, next"
          :total="count"
          :current-page="page"
        >
        </el-pagination>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div
            v-for="(item, index) in playlists"
            :key="index"
            class="item"
            @click="gotoMusicPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" :onerror="errorImage"  alt="" />
              <span class="iconfont icon-play">
                <i class="el-icon-video-play"></i
              ></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
        <el-pagination
          @current-change="handleCurrentChangeMusicList"
          background
          layout="prev, pager, next"
          :total="count"
          :current-page="MusicListpage"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div
            v-for="(item, index) in mv"
            :key="index"
            class="item"
            @click="gotoMusicMv(item.id)"
          >
            <div class="img-wrap">
              <!-- 封面 -->
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"
                ><i class="el-icon-video-play"></i
              ></span>

              <div class="num-wrap">
                <!-- <div class="iconfont icon-play">
                  <i class="el-icon-video-play"></i>
                </div> -->
                <!-- 播放次数 -->
                <div class="num">{{ item.playCount }}</div>
              </div>

              <!-- 持续时间 -->
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <!-- mv名 -->
              <div class="name">{{ item.name }}</div>
              <!-- 歌手名 -->
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
        <el-pagination
          @current-change="handleCurrentChangeMusicMV"
          background
          layout="prev, pager, next"
          :total="count"
          :current-page="MVpage"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //错误图片
       errorImage: 'this.src="' + require('../assets/404.jpg') + '"'  ,
      // tab切换时 会改变的数据
      activeIndex: "songs",
      // 保存 查询歌曲
      songList: [],
      // 保存歌单的字段
      playlists: [],
      // 保存mv的字段
      mv: [],
      // 搜索结果的总数
      count: 0,
      //判断播放按钮
      isPay: true,
      //页数
      page: 1,
      //返回的数据量
      limit: 10,

      MusicListpage: 1,
      //返回的数据量
      MusicListlimit: 10,

      MVpage: 1,
      //返回的数据量
      MVlimit: 8,
    };
  },
  // 生命周期钩子 回调函数
  created() {
    this.getSearchMusicdata();
  },
  //页面监听事件判断 三个可切换的 页面  歌曲 歌单 mv
  //这样写很麻烦，同意的是请求三次地址 不如给三个单击的方法去判断
  //为了展示项目的多样性，用了监听器
  watch: {
    async activeIndex() {
      let type = 1;
      // 获取个数
      let limit = 10;
      // 根据样式的name 监听事件
      switch (this.activeIndex) {
        case "songs":
          type = 1;
          limit = 10;
          break;
        case "lists":
          type = 1000;
          limit = 10;
          break;
        case "mv":
          type = 1004;
          limit = 8;
          break;
        default:
          break;
      }
      const { data: res } = await this.$http.get("search", {
        params: {
          keywords: this.$route.query.q,
          type, // type:type,
          // 获取的数据量
          limit, // limit: limit}}
          // offset: (this.page-1) * this.limit
        },
      });
      if (res.code != 200) {
        return this.$message.error("error:请检查网络 ");
      } else if (res.msg != null) {
        return this.$message.error("error:该歌手已经被屏蔽！请理智听歌");
      } else {
        if (type == 1) {
          // 歌曲
          this.songList = res.result.songs;
          // 计算歌曲时间
          for (let i = 0; i < this.songList.length; i++) {
            let min = parseInt(this.songList[i].duration / 1000 / 60);
            let sec = parseInt((this.songList[i].duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            // console.log(min + '|' + sec)
            this.songList[i].duration = min + ":" + sec;
          }
          // 保存总数
          this.count = res.result.songCount;
        }
        // 获取 歌单
        else if (type == 1000) {
          // 歌单的逻辑
          this.playlists = res.result.playlists;
          // 总数
          this.count = res.result.playlistCount;

          // 处理 播放次数
          for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].playCount > 100000) {
              this.playlists[i].playCount =
                parseInt(this.playlists[i].playCount / 10000) + "万";
            }
          }
        } else {
          // 保存mv数据
          this.mv = res.result.mvs;
          // 总数
          this.count = res.result.mvCount;

          // 处理数据
          for (let i = 0; i < this.mv.length; i++) {
            // 时间
            let min = parseInt(this.mv[i].duration / 1000 / 60);
            let sec = parseInt((this.mv[i].duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.mv[i].duration = min + ":" + sec;

            // 播放次数
            if (this.mv[i].playCount > 100000) {
              this.mv[i].playCount =
                parseInt(this.mv[i].playCount / 10000) + "万";
            }
          }
        }
      }
    },
  },
  methods: {
    async handleCurrentChangeMusic(val) {
      // 保存页面 重新获取数据
      this.page = val;
      this.getSearchMusicdata();
    },
    async handleCurrentChangeMusicList(val) {
      // 保存页面 重新获取数据
      this.MusicListpage = val;
      this.getSearchMusicListdata();
    },
    async handleCurrentChangeMusicMV(val) {
      // 保存页面 重新获取数据
      this.MVpage = val;
      this.getSearchMusicMVdata();
    },

    // 去mv详情页
    async gotoMusicMv(id) {
      await this.$router.push(`/PlayMusicMV?q=${id}`);
    },
    // 去歌单详情页
    async gotoMusicPlaylist(id) {
      // 跳转并携带数据即可
      await this.$router.push(`/PlayMusicList?q=${id}`);
    },

    async getSearchMusicdata() {
      const { data: res } = await this.$http.get("search", {
        params: {
          keywords: this.$route.query.q,
          type: 1,
          // 获取的数据量
          limit: 10,
          offset: (this.page - 1) * this.limit,
        },
      });
      if (res.code != 200) {
        return this.$message.error("error:请检查网络 ");
      } else if (res.msg != null) {
        return this.$message.error("error:该歌手被屏蔽！请理智听歌");
      } else {
        this.songList = res.result.songs;
        //这里没必要自己算，引入moment函数就好了，只是提供一种写法
        // 计算歌曲时间
        for (let i = 0; i < this.songList.length; i++) {
          let min = parseInt(this.songList[i].duration / 1000 / 60);
          let sec = parseInt((this.songList[i].duration / 1000) % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.songList[i].duration = min + ":" + sec;
        }
        // 保存总数
        this.count = res.result.songCount;
      }
    },

    async getSearchMusicListdata() {
      const { data: res } = await this.$http.get("/search", {
        params: {
          keywords: this.$route.query.q,
          type: 1000,
          // 获取的数据量
          limit: this.MusicListlimit,
          offset: (this.MusicListpage - 1) * this.MusicListlimit,
        },
      });
      if (res.code != 200) {
        return this.$message.error("error:请检查网络 ");
      } else {
        // 歌单的逻辑
        this.playlists = res.result.playlists;

        // 处理 播放次数
        for (let i = 0; i < this.playlists.length; i++) {
          if (this.playlists[i].playCount > 100000) {
            this.playlists[i].playCount =
              parseInt(this.playlists[i].playCount / 10000) + "万";
          }
        }
      }
    },

    async getSearchMusicMVdata() {
      const { data: res } = await this.$http.get("search", {
        params: {
          keywords: this.$route.query.q,
          type: 1004,
          // 获取的数据量
          limit: 8,
          offset: (this.MVpage - 1) * this.MVlimit,
        },
      });
      if (res.code != 200) {
        return this.$message.error("error:请检查网络 ");
      } else {
        // 保存mv数据
        this.mv = res.result.mvs;
        // 总数
        this.count = res.result.mvCount;

        // 处理数据
        for (let i = 0; i < this.mv.length; i++) {
          // 时间
          let min = parseInt(this.mv[i].duration / 1000 / 60);
          let sec = parseInt((this.mv[i].duration / 1000) % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.mv[i].duration = min + ":" + sec;

          // 播放次数
          if (this.mv[i].playCount > 100000) {
            this.mv[i].playCount =
              parseInt(this.mv[i].playCount / 10000) + "万";
          }
        }
      }
    },

    async playMusic(id, name = null) {
      this.isPay = id;
      const { data: res } = await this.$http.get("/song/url?id=" + id);
      if (res.code !== 200) {
        return this.$message.error(
          "error:获取歌曲地址失败，请检查版权...或者网络 "
        );
      } else {
        let url = res.data[0].url;
        // 设置给父组件的 播放地址
        // this.$parent.musicUrl = url;
        this.$parent.audioSrc(url);
        this.$parent.audioSong(name);
        this.$parent.audioPlay();
        // this.nowplay = res.data[0].id;
      }
    },
    //暂停播放
    async audioPause() {
      this.isPay = null;
      await this.$parent.audioPause();
    },
    LikeMusic() {
      return this.$message.warning("warning:该功能待更新，仅提供音乐试听");
    },
    MoreMusic() {
      return this.$message.warning("warning:该功能待更新，仅提供音乐试听");
    },
  },
};
</script>
