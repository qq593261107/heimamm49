<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" class="register" width="600px">
    <div slot="title" class="title">用户注册</div>
    <el-form :model="reForm" :rules="rules" ref="form" label-width="70px">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="localUrl+'/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="reForm.username" class="input"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="reForm.email" class="input"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="reForm.phone" class="input"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="reForm.password" class="input" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="reForm.code"></el-input>
          </el-col>
          <el-col :offset="1" :span="7" class="col">
            <img :src="codeUrl" @click="clickCode" class="img" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="reForm.rcode"></el-input>
          </el-col>
          <el-col :offset="1" :span="7">
            <el-button @click="getRcode">获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="btns">
      <el-button>取消</el-button>
      <el-button type="primary" @click="clickBtn">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import registerUser from "@/api/register.js";
export default {
  data() {
    return {
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      dialogFormVisible: false,
      reForm: {
        username: "",
        email: "",
        phone: "",
        password: "",
        avatar: "",
        code: "",
        rcode: ""
      },
      imageUrl: "",
      localUrl: process.env.VUE_APP_URL,
      rules: {
        username: [
          { required: true, message: "请输入昵称", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _em = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_em.test(value)) {
                callback();
              } else {
                callback("邮箱格式错误！");
              }
            },
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _phone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_phone.test(value)) {
                callback();
              } else {
                callback("请输入正确手机号");
              }
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "请输入6到12位密码", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入图片验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入正确图片验证码", trigger: "blur" }
        ],
        rcode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入正确手机验证码", trigger: "blur" }
        ],
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }]
      }
    };
  },
  // mounted(){
  //   alert(process.env.VUE_APP_URL);
  // },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/git";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res) {
      this.imageUrl = this.localUrl + "/" + res.data.file_path;
      this.reForm.avatar = res.data.file_path;
      this.$refs.form.validateField("avatar");
    },
    clickBtn() {
      this.$refs.form.validate(result => {
        console.log(result);
      });
    },
    clickCode() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + Date.now();
    },
    getRcode() {
      let _pass = true;
      this.$refs.form.validateField(["code", "phone"], error => {
        if (error != "") {
          _pass = false;
        }
      });
      if (_pass === false) {
        return;
      } else {
        registerUser({
          code:this.reForm.code,
          phone:this.reForm.phone
        }).then(res => {
          //成功回调
          this.$message.success(res.data.data.captcha + "")
          console.log(res);
        });
      }
    }
  }
};
</script>

<style lang="less">
.register {
  .btns {
    text-align: center;
  }
  .title {
    height: 53px;
    background: rgba(5, 185, 252, 1);
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(254, 254, 254, 1);
    line-height: 53px;
    text-align: center;
  }
  .el-dialog__header {
    padding: 0;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .img {
    // margin-left: 10px;
    width: 100%;
    height: 40px;
  }
}
</style>