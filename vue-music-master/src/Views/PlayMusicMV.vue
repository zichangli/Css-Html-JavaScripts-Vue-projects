<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <!-- //controlsList=“nodownload” 隐藏下载按钮 -->
        <video  autoplay controls :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <!-- 头像 -->
            <img :src="icon" alt="" />
          </div>
          <!-- 歌手名 -->
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <!-- 标题 -->
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：{{ mvInfo.time | filterDatas }}</span>
          <!-- 播放次数 -->
          <span class="number" style="font-size:5px" >播放：{{ mvInfo.playCount }}次</span>
          <!-- 描述 -->
          <p class="desc">
            {{ mvInfo.desc }}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">
          精彩评论<span class="number">({{ hotCount }})</span>
        </p>

        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in hotComments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
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
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论<span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in comments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl"   alt=""/>
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
        :page-size="5"
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div v-for="(item, index) in simiMvs" :key="index" class="item">
            <div class="img-wrap">
              <img :src="item.cover" alt="" @click="playMusicMv(item.id)" />
              <span class="iconfont icon-play" @click="playMusicMv(item.id)">
                <i class="el-icon-video-play"></i
              ></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num" style="font-size:5px">播放:{{ item.playCount }}次</div>
              </div>
              <span class="time">{{ item.duration |filterDatatime}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  filters: {
    filterDatas(value) {
      if (value == 0) {
        return "未获取到数据";
      } else {
        return moment(value).format("YYYY-MM-DD");
      }
    },
    filterDatatime(value) {
      if (value == 0) {
        return "未获取到数据";
      } else {
        return moment(value).format("mm:ss");
      }
    },
  },
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // mv地址
      url: "",
      // 相关mv
      simiMvs: [],
      // mv的信息
      mvInfo: {},
      // 头像
      icon: "",
      //最新评论
      comments: {},
      //精彩评论
      hotComments: {},
      //用户信息
      user: {},
      total: 0,
      hotCount: 0,
    };
  },
  created() {
    //获取视频地址
    this.getMVUrl();
    //获取相关MV
    this.getsimimv();

    // 获取 mv的信息
    this.getmvdetail();
    // 获取评论数据
    this.getCommentmv();
  },
  methods: {
    // 获取mv播放地址
    async getMVUrl() {
      const { data: res } = await this.$http.get(
        "/mv/url?id=" + this.$route.query.q
      );
      if (res.code !== 200) {
        return this.$message.error("error:获取失败 ");
      } else {
        this.url = res.data.url;
      }
    },

    // 获取 相关的mv
    async getsimimv() {
      const { data: res } = await this.$http.get(
        "/simi/mv?mvid=" + this.$route.query.q
      );
      if (res.code !== 200) {
        return this.$message.error("error:获取失败 ");
      } else {
        this.simiMvs = res.mvs;
      }
    },

    async getmvdetail() {
      const { data: res } = await this.$http.get(
        "/mv/detail?mvid=" + this.$route.query.q
      );
      if (res.code !== 200) {
        return this.$message.error("error:获取失败 ");
      } else {
        this.mvInfo = res.data;
        const { data: res1 } = await this.$http.get(
          "artists?id=" + this.mvInfo.artists[0].id
        );
        this.icon = res1.artist.picUrl;
      }
    },
    async getCommentmv() {
      const { data: res } = await this.$http.get(
        "/comment/mv?id=" + this.$route.query.q + "&method=10&offset=0"
      );
      if (res.code !== 200) {
        return this.$message.error("error:获取视频评论失败 ");
      } else {
        this.comments = res.comments;
        this.hotComments = res.hotComments;
        this.hotCount = res.total;
        this.total = res.total;
      }
    },

    //跳转去新MV页面数据
    async playMusicMv(id) {
      if (id == "") {
        return await this.$message.error(
          "error:获取MV失败，请检查版权...或者网络 "
        );
      } else {
        // 去搜索页 携带数据
          await this.$router.push("/");
        await this.$router.push("/PlayMusicMV?q=" + id);
      }
    },
    //翻页事件
    async handleCurrentChange(val) {
      // 保存页码
      this.page = val;
      // 重新获取数据
      const { data: res } = await this.$http.get(
        "/comment/mv?id=" +
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
