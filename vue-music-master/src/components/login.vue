<template>
  <div class="logboxmax">
    <div class="logbox">
      <el-card class="box-card">
        <el-form
          ref="loginuserlistref"
          :model="loginuserlist"
          label-width="80px"
        >
          <div class="logboximg">
            <img src="../assets/logo.png" />
          </div>

          <el-form-item label="手机号">
            <el-input v-model="loginuserlist.phone"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input
              v-model="loginuserlist.password"
              type="password"
            ></el-input>
            <span>登入网易云音乐，该接口不会获取隐私数据</span>
            <span>不登入无法获取完成Api数据！</span>
            <span>已经登录请忽视，后续再增加判断</span>
          </el-form-item>
        </el-form>

        <div class="btnbox">
          <el-button type="primary" @click="getlogin_userid">登入</el-button>
          <el-button>注册</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginuserlist: {
        phone: "",
        password: "",
      },
    };
  },
  created() {},
  methods: {
    async getlogin_userid() {
      const { data: res } = await this.$http.post("/login/cellphone", {
        phone: this.loginuserlist.phone,
        password: this.loginuserlist.password,
      });
      if (res.code !== 200) {
        return this.$message.error("error:登入失败哦 ");
      } else {
        this.$message({
          message: "success:登入成功",
          type: "success",
        });
        window.sessionStorage.setItem("userid", res.account.id);
        window.sessionStorage.setItem("token", res.token);
        this.$router.push("/");
        this.$router.push("/DiscoverMusic");
      }
    },
  },
};
</script>

<style>
.logboxmax {
  height: 100%;
  background-color: rgb(224, 84, 84);
}
.logbox {
  width: 400px;
  text-align: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(0, -50%);
}
.btnbox {
  text-align: center;
}
.logboximg {
  position: absolute;
  left: 50%;
  padding: 10px;
  transform: translate(-50%, -50%);
  top: -5px;
}
.logboximg img {
  width: 90px;
  border-radius: 50%;
  box-shadow: 0 0 10px;
  background-color: cornsilk;
}
.el-form {
  margin-top: 30px;
  margin-left: 10px;
}
</style>
