<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换 地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '全部' }"
              @click="area = '全部'"
            >
              全部
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '内地' }"
              @click="area = '内地'"
            >
              内地
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '港台' }"
              @click="area = '港台'"
            >
              港台
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '欧美' }"
              @click="area = '欧美'"
            >
              欧美
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '日本' }"
              @click="area = '日本'"
            >
              日本
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '韩国' }"
              @click="area = '韩国'"
            >
              韩国
            </span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '全部' }"
              @click="type = '全部'"
            >
              全部
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '官方版' }"
              @click="type = '官方版'"
            >
              官方版
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '原声' }"
              @click="type = '原声'"
            >
              原声
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '现场版' }"
              @click="type = '现场版'"
            >
              现场版
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '网易出品' }"
              @click="type = '网易出品'"
            >
              网易出品
            </span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '上升最快' }"
              @click="order = '上升最快'"
            >
              上升最快
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最热' }"
              @click="order = '最热'"
            >
              最热
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最新' }"
              @click="order = '最新'"
            >
              最新
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <img :src="item.cover" alt="" @click="playMusicMv(item.id)" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">播放:{{ item.playCount }}次</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
            <div class="mvs_time"><p> {{ item.duration | filterDatatime }}</p></div>
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
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  filters: {
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
      limit: 8,
      // 地区
      area: "全部",
      // 类型
      type: "全部",
      // 排序
      order: "上升最快",
      // 查询的结果
      list: [],
    };
  },
  // 侦听器
  watch: {
    area() {
      // 返回第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },
    type() {
      // 返回第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },
    order() {
      // 返回第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },
  },
  created() {
    // 获取数据
    this.getList();
  },
  methods: {
    // 获取列表数据
    async getList() {
      const { data: res } = await this.$http.get(
        "/mv/all?area=" +
          this.area +
          "&type=" +
          this.type +
          "&order=" +
          this.order +
          "&limit=" +
          this.limit +
          "&offset=" +
          (this.page - 1) * this.limit
      );
      if (res.code !== 200) {
        return this.$message.error("error:音乐数据失败 ");
      } else {
        this.list = res.data;
        // 处理次数
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].playCount > 100000) {
            this.list[i].playCount =
              parseInt(this.list[i].playCount / 10000) + "万";
          }
        }
        // 保存总条数
        // 接口问题 有count 就赋值
        if (res.data.count) {
          this.total = res.count;
        }
      }
      // 页码改变的回调函数
    },
    async handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      // 保存页面 重新获取数据
      this.page = val;
      this.getList();
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
  },
};
</script>

<style></style>
