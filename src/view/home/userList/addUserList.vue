<template>
  <el-dialog :visible.sync="dialogFormVisible" width="447px">
    <div slot="title" class="addUserList">新增用户</div>
    <el-form label-width="70px" :model="form" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select placeholder="请选择角色" v-model="form.role_id">
          <el-option
            :label="value"
            :value="+key"
            v-for="(value,key,index ) in $store.state.roleObj"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select placeholder="请选择状态" v-model="form.status">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="addUserListBtn">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUserList, editUserList } from "@/api/userList.js";
export default {
  props: ["mode"],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
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
          { required: true, message: "请输入电话", trigger: "blur" },
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
        role_id: [{ required: true, message: "请选择角色", trigger: "change" }]
      }
    };
  },
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    }
  },
  methods: {
    addUserListBtn() {
      this.$refs.form.validate(result => {
        // console.log(result);
        if (result) {
          if (this.mode == "add") {
            addUserList(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          } else {
            editUserList(this.form).then(() => {
              this.$message.success("修改成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addUserList {
  text-align: center;
  color: #fff;
  background-color: rgb(14, 159, 249);
  height: 53px;
  line-height: 53px;
}
</style>