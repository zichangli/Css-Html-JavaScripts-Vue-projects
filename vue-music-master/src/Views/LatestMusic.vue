<template>
  <div class="songs-container">
    <div class="itemset">
      <i class="el-icon-setting" @click="showdata = !showdata"></i>
    </div>

    <div class="tab-bar" v-show="showdata">
      <span class="item" @click="tag = 0" :class="{ active: tag == 0 }">
        全部
      </span>
      <span class="item" @click="tag = 7" :class="{ active: tag == 7 }">
        华语
      </span>
      <span class="item" @click="tag = 96" :class="{ active: tag == 96 }">
        欧美
      </span>
      <span class="item" @click="tag = 8" :class="{ active: tag == 8 }">
        日本
      </span>
      <span class="item" @click="tag = 16" :class="{ active: tag == 16 }">
        韩国
      </span>
    </div>

    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lists" :key="index" class="el-table__row" @click="playMusic(item.id,item.name)">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap" >
              <img :src="item.album.picUrl" alt="" />
              <!-- 播放按钮 -->
              <!-- <span
                @click="playMusic(item.id)"
                class="iconfont icon-play"
              ></span> -->
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <td>{{ item.album.artists["0"].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 歌曲列表
      lists: [],
      // 分类
      tag: "0",
      showdata: true,
    };
  },
  watch: {
    tag() {
      this.getList();
    },
  },
  created() {
    this.getList();
  },
  methods: {
   async setshow() {
      showdata = false;
    },
    async getList() {
      // 获取 最新音乐数据
      const { data: res } = await this.$http.get("/top/song?type=" + this.tag);
      if (res.code !== 200) {
        return this.$message.error("error:音乐数据失败 ");
      } else {
        this.lists = res.data;

         //使用热加载算法   
        // 处理时长 毫秒 转为 分秒
        for (let i = 0; i < this.lists.length; i++) {
          // 获取 总毫秒数
          let duration = this.lists[i].duration;
          // 假定 	350750 毫秒
          // 秒 350750/1000  350秒
          // 分 350 /60
          // 秒 350 % 60
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          let sec = parseInt((duration / 1000) % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }

          this.lists[i].duration = `${min}:${sec}`;
        }

      }
    },


    // 播放歌曲
   async playMusic(id,name=null) {
      const { data: res } = await this.$http.get("/song/url?id=" + id);
      if (res.code !== 200) {
        return this.$message.error("error:音乐数据失败 ");
      } else {
        let url = res.data[0].url;
         this.$parent.audioSrc(url);
        this.$parent.audioSong(name);
      }
    },
  },
};
</script>

<style></style>
