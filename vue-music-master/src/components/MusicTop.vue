<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <img
          width="140px"
          height="45px"
          class="icon-wrapper_img"
          src="../assets/music.png"
        />
      </div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <!-- 搜索框 -->
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="inputValue"
          @keyup.enter="toResult"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
      <div class="right-box-img">
        <img src="../assets/listCover.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      // 输入的内容
      inputValue: "",
    };
  },
  methods: {
    async toResult() {
      // 非空判断
      if (this.inputValue == "") {
        // 提示用户
        this.$message.warning("请输入内容");
      } else {
        // 去搜索页 携带数据
        await this.$router.push("/");
        await this.$router.push("/searchMusic?q=" + this.inputValue);
        // await this.$router.go(0);
      }
    },
  },
};
</script>

<style scoped></style>
