<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login_logo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titlelist">|</span>
        <span class="titleName2">用户登录</span>
      </div>

      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input
            v-model="form.user"
            class="inputUser"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            class="inputWord"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            :show-password="true"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input
                class="inputCap"
                prefix-icon="el-icon-key"
                v-model="form.code"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img src alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary">登录</el-button>
          <br>
          <el-button class="my-btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>


<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        user: "",
        password: "",
        code: ""
      },
      checked: false
    };
  }
};
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .my-btn {
      width: 394px;
      height: 40px;
      background: rgba(20, 147, 250, 1);
      border-radius: 4px;
    //   margin-top: 28px;
    }.my-btn:nth-child(3) {
       margin-top: 26px;
      
    }
    .inputUser {
      width: 394px;
      height: 42px;
      //   background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(204, 207, 213, 1);
      border-radius: 4px;
      margin-top: 29px;
    }

    .inputWord {
      width: 394px;
      height: 42px;
      //   background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(204, 207, 213, 1);
      border-radius: 4px;
      //   margin-top: 25px;
      //   margin-bottom: 26px;
    }

    .title {
      .titleName {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        padding: 0 15px;
      }
      .titlelist {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
      .titleName2 {
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        padding-left: 15px;
      }
    }

    .inputCap {
      width: 284px;
      height: 42px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(204, 207, 213, 1);
      border-radius: 4px;
    }
  }
}
</style>