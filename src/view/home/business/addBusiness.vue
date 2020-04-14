<template>
  <el-dialog :visible.sync="dialogFormVisible" width="600px">
    <div slot="title" class="addBusiness">{{mode=="add"?"新增企业":"编辑企业"}}</div>
    <el-form label-width="100px" :model="form" :rules="rules" ref="form">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="form.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="businessFooter">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="businessBtn">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addBusinessDate, editBusinessDate } from "@/api/business.js";
export default {
  props: ["mode"],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业名称", trigger: "blur" }]
      }
    };
  },
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        this.$refs.form.clearValidate();
      }
    }
  },
  methods: {
    businessBtn() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
            addBusinessDate(this.form).then(() => {
              // alert("新增成功");
              this.$message.success("添加成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          } else {
            editBusinessDate(this.form).then(() => {
              this.$message.success("编辑成功");
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
.addBusiness {
  text-align: center;
  color: #fff;
  background-color: rgb(14, 159, 249);
  height: 53px;
  line-height: 53px;
}
.el-dialog__header {
  padding: 0;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.businessFooter {
  text-align: center;
}
</style>