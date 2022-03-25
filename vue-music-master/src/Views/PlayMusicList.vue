<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl" :onerror="errorImage" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <img class="avatar" :src="creator.avatarUrl" :onerror="errorImage" alt="" />

          <span class="name">{{ creator.nickname }}/</span>
          <span class="time">{{ playlist.createTime | filterDatas }}</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 分类标签 -->
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <!-- 简介 -->
          <span class="desc">
            {{ playlist.description }}
          </span>
        </div>
      </div>
    </div>

    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane label="歌曲列表" name="song">
        <el-table :data="tracks" style="width: 100%">
          <el-table-column label="图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.al.picUrl" :onerror="errorImage" style="height: 50px" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="歌曲名称" width="180">
          </el-table-column>
          <el-table-column prop="ar[0].name" label="作者" width="180">
          </el-table-column>
          <el-table-column prop="name" label="专辑" width="180">
          </el-table-column>

          <el-table-column label="发布时间" width="180">
            <template slot-scope="scope">
              <span> {{ scope.row.publishTime | filterDatas }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="" label="功能" width="120">
            <template slot-scope="scope">
              <!-- <i
                :class="
                  scope.row.id == nowplay
                    ? (playStatus = 'el-icon-video-pause')
                    : (playStatus = 'el-icon-video-play')
                "
                style="font-size: 30px"
                @click="playMusic(scope.row.id)"
              ></i> -->
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
      </el-tab-pane>

      <el-tab-pane label="评论" name="songcomment">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">
            精彩评论
            <span class="number">({{ hotCount }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div v-for="(item, index) in hotComment" :key="index" class="item">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl" :onerror="errorImage" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <!-- 昵称 -->
                  <span class="name">{{ item.user.nickname }}:</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 评论的回复 -->
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name"
                    >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | filterDatas }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number">( {{ total }} )</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" :onerror="errorImage" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name"
                    >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | filterDatas }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import moment from "moment";
export default {
  //时间戳过滤器
  filters: {
    filterDatas(value) {
      if (value == 0) {
        return "未获取到数据";
      } else {
        return moment(value).format("YYYY-MM-DD");
      }
    },
  },

  data() {
    return {
      //404图片
      errorImage: 'this.src="' + require("../assets/404.jpg") + '"',
      tabs: "song",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 歌单详情数据
      //  歌曲列表
      tracks: [],
      playlist: {},
      // 歌单详情数据 下的二级数据集合 如果不定义avatarUrl 字段会报错
      creator: [],
      // 热门评论
      hotComment: [],
      // 热门评论的个数
      hotCount: 0,
      // 普通评论
      comments: [],
      //正在播放
      isPay: null,
      // playStatus: "play",
      // nowplay: "",
      //  boolui: false,
    };
  },

  created() {
    // 获取歌单详情
    this.playlisttrackall();
    //获取热门评论
    this.commenthot();
    // 获取 最新评论
    this.commentplaylist();
  },
  methods: {
    async playlisttrackall() {
      //从发现音乐的页面中 通过playMusic方法的this.$router传递，同时通过this.$router接收
      const { data: res } = await this.$http.get("/playlist/detail", {
        params: {
          id: this.$route.query.q,
        },
      });
      if (res.code !== 200) {
        return this.$message.error(
          "error:获取歌单详细失败了，请检查版权...网络404 "
        );
      } else {
        this.playlist = res.playlist;
        this.creator = res.playlist.creator;
        this.tracks = res.playlist.tracks;
      }
    },

    // 获取热门评论
    async commenthot() {
      const { data: res } = await this.$http.get("/comment/hot", {
        params: { id: this.$route.query.q, type: 2 },
      });
      if (res.code !== 200) {
        return this.$message.error(
          "error:获取热门评论失败了，请检查版权...或者网络 "
        );
      } else {
        this.hotComment = res.hotComments;
        // 保存个数
        this.hotCount = res.total;
      }
    },
    //获取最新评论
    async commentplaylist() {
      const { data: res } = await this.$http.get(
        "/comment/playlist?id=" + this.$route.query.q
      );
      if (res.code !== 200) {
        return this.$message.error(
          "error:获取最新评论失败了，请检查版权...或者网络 "
        );
      } else {
        // 总个数
        this.total = res.total;
        // 评论数据
        this.comments = res.comments;
      }
    },
    //播放音乐
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
    //获取页码
    async handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val;
      // 重新获取数据
      const { data: res } = await this.$http.get(
        "/comment/playlist?id=" +
          this.$route.query.q +
          "&limit=10&offset=" +
          (this.page - 1) * 10
      );
      if (res.code !== 200) {
        return this.$message.error("error:获取页码失败请检查网络 ");
      } else {
        this.total = res.total;
        // 评论数据
        this.comments = res.comments;
      }
    },
  },
};
</script>

<style></style>
