<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login_logo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titlelist">|</span>
        <span class="titleName2">用户登录</span>
      </div>
      <!-- form表单 -->
      <el-form ref="form"  :model="form" :rules="rules">
        <el-form-item prop="phone">
          <el-input
            v-model="form.phone"
            class="inputPhone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="inputWord"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            :show-password="true"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input
                class="inputCode"
                prefix-icon="el-icon-key"
                v-model="form.code"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img src="@/assets/img/key.jpg" class="keyImg" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <el-link type="primary" class="link">用户协议</el-link>和
            <el-link type="primary" class="link">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" @click="loginBtn" type="primary">登录</el-button>
          <br />
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
        phone: "",
        password: "",
        code: "",
        checked: '',
      },
      
      rules:{
        phone:[
          {required:true,message:'请输入手机号',trigger:'blur'},
          {min:11,max:11,message:'请输入11位手机号',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:6,max:12,message:'请输入6到12位密码',trigger:'blur'}
        ],
        code:[
          {required:true,message:'请输入验证码',trigger:'blur'},
          {min:4,max:4,message:'请输入正确验证码',trigger:'blur'}
        ],
        checked:[
          {type: '',required:true,message:'请勾选协议',trigger:'change'},
        ],
      }
    };
  },
  methods:{
    loginBtn(){
      this.$refs.form.validate(valid=>{
        if(valid){
           this.$message.success("登录成功")
        }else{
          this.$message.error('登录失败');
        }
      });
    }
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
    }
    .my-btn:nth-child(1) {
      margin-bottom: 26px;
    }
    .inputPhone {
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

    .inputCode {
      width: 284px;
      height: 42px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(204, 207, 213, 1);
      border-radius: 4px;
    }
    .keyImg {
      margin-left: 10px;
      width: 120px;
      height: 42px;
    }

    .link{
      margin-top: -3px;
      margin-left: -3px;
    }
  }
}
</style>