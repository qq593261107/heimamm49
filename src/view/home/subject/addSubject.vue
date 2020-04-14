<template>
  <el-dialog :visible.sync="dialogFormVisible" width="600px">
    <div slot="title" class="addSubject">{{mode=="add"?"新增学科":"编辑学科"}}</div>
    <el-form label-width="100px" :model="form" :rules="rules" ref="form">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="subjectFooter">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="addSubjectBtn">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSubjectData, editSubjectData } from "@/api/subject.js";
export default {
  props: {
    mode: {
      type: String
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
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
    addSubjectBtn() {
      this.$refs.form.validate(result => {
        //   console.log(result);
        if (result) {
          if (this.mode == "add") {
            addSubjectData(this.form).then(() => {
              this.dialogFormVisible = false;
            //   this.$parent.search();
            this.$emit("add")
            });
          } else {
            editSubjectData(this.form).then(() => {
              this.dialogFormVisible = false;
              //   this.$parent.search();
              this.$emit("add")
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addSubject {
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
.subjectFooter {
  text-align: center;
}
</style>