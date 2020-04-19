<template>
  <el-dialog :visible.sync="dialogFormVisible" :fullscreen="true" class="addQuestion">
    <div slot="title" class="title">新增题库测试</div>
    <el-form class="form" :model="form" label-width="80px" ref="form" :rules="rules">
      <el-form-item label="学科" prop="subject">
        <el-select v-model="form.subject" placeholder="请选择学科">
          <el-option
            v-for="(item, index) in subjectList"
            :key="index"
            :value="item.id"
            :label="item.name"
            v-show="item.status ==1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option v-for="(item, key,index) in stepObj" :key="index" :label="item" :value="+key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise">
        <el-select v-model="form.enterprise" placeholder="请选择企业">
          <el-option
            v-for="(item, index) in businessList"
            :key="index"
            :label="item.name"
            :value="item.id"
            v-show="item.status ==1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-cascader
          v-model="form.city"
          :options="options"
          :props="{value:'label'}"
          placeholder="请选择城市"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="(item, key,index) in typeObj" :key="index" :label="+key">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio v-for="(item, key,index) in diffcultyObj" :key="index" :label="+key">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <hr />
      <el-form-item label="试题标题" prop="title" class="quesTitle">
        <quillEditor
          v-model="form.title"
          :options="{placeholder:'请在这里输入...'}"
          @change="editorChange('title')"
        ></quillEditor>
      </el-form-item>
      <!-- 单选多选简答组件抽离 -->
      <el-form-item
        :label="typeObj[form.type]"
        :prop="{1:'single_select_answer',2:'multiple_select_answer',3:'short_answer'}[form.type]"
      >
        <addSelect :form="form" @change="selectChange"></addSelect>
      </el-form-item>
      <hr class="hr" />
      <el-form-item label="解析视频">
        <uploadFile v-model="form.video" type="video"></uploadFile>
      </el-form-item>
      <hr />
      <el-form-item label="答案解析" prop="answer_analyze" class="quesTitle">
        <quillEditor
          v-model="form.answer_analyze"
          :options="{placeholder:'请在这里输入...'}"
          @change="editorChange('answer_analyze')"
        ></quillEditor>
      </el-form-item>
      <hr />
      <el-form-item label="试题备注" prop="remark" class="quesTitle">
        <el-input class="remarkInput" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="quseTion">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { regionData } from "element-china-area-data";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import addSelect from "./addSelect.vue";
import uploadFile from "./uploadFile.vue";
import { addQuestionData, editQuestionData } from "@/api/question.js";
export default {
  components: {
    quillEditor,
    addSelect,
    uploadFile
  },
  props: [
    "subjectList",
    "stepObj",
    "businessList",
    "typeObj",
    "diffcultyObj",
    "mode"
  ],
  data() {
    return {
      dialogFormVisible: false,
      options: regionData,
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择地区", trigger: "change" }], //城市
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        title: [{ required: true, message: "请输入标题", trigger: "change" }],
        single_select_answer: [
          { required: true, message: "请选择单选答案", trigger: "change" }
        ],
        multiple_select_answer: [
          { required: true, message: "请选择多选答案", trigger: "change" }
        ],
        answer_analyze: [
          { required: true, message: "请输入答案解析", trigger: "change" }
        ], //答案解析
        short_answer: [
          { required: true, message: "请输入简答答案", trigger: "change" }
        ],
        remark: [
          { required: true, message: "请输入试题备注", trigger: "change" }
        ]
      },
      form: {
        subject: "",
        step: "",
        enterprise: "",
        city: [], //城市
        difficulty: 1,
        type: 1,
        title: "",
        single_select_answer: "",
        multiple_select_answer: [],
        answer_analyze: "", //答案解析
        short_answer: "", //简答答案
        video: "",
        remark: "",
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ]
      }
    };
  },
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == true) {
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    }
  },
  methods: {
    quseTion() {
      console.log(this.form.select_options);
      this.$refs.form.validate(result => {
        // console.log(result);
        if (result) {
          if (this.mode == "add") {
            addQuestionData(this.form).then(() => {
              this.$message.success("添加成功！");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          }else{
            let _query = JSON.parse(JSON.stringify(this.form))
            _query.city = _query.city.join(",")
            editQuestionData(_query).then(()=>{
              this.$message.success("修改成功！");
              this.dialogFormVisible = false;
              this.$parent.search();
            })
          }
        }
      });
    },
    editorChange(edit) {
      this.$refs.form.validateField(edit);
    },
    selectChange() {
      this.$refs.form.validateField([
        "single_select_answer",
        "multiple_select_answer",
        "short_answer"
      ]);
    }
  }
};
</script>

<style lang="less">
.addQuestion {
  .el-form-item__label {
    text-align: left;
  }

  .title {
    color: #fff;
    padding-left: 15px;
    height: 54px;
    line-height: 54px;
    background-color: rgb(4, 188, 250);
  }
  .footer {
    text-align: center;
  }
  .form {
    width: 832px;
    margin: 0 auto;
  }
  .quill-editor {
    margin-top: 60px;
    margin-left: -80px;
  }
  .quesTitle {
    margin-top: 30px;
  }
  .hr {
    margin-bottom: 20px;
  }
  .remarkInput {
    margin-top: 50px;
  }
  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus,
  .el-message-box__input input.invalid,
  .el-message-box__input input.invalid:focus {
    border-color: #dcdfe6;
  }
}
</style>