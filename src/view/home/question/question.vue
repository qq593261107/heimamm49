<template>
  <div class="question">
    <el-card>
      <el-form label-width="60px" :model="form" ref="form">
        <el-row>
          <el-col :span="5">
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
          </el-col>
          <el-col :span="5">
            <el-form-item label="阶段" prop="step">
              <el-select v-model="form.step" placeholder="请选择阶段">
                <el-option
                  v-for="(item, key,index) in stepObj"
                  :key="index"
                  :label="item"
                  :value="+key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
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
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select v-model="form.type" placeholder="请选择题型">
                <el-option
                  v-for="(item, key,index) in typeObj"
                  :key="index"
                  :label="item"
                  :value="+key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="难度" prop="diffculty">
              <el-select v-model="form.diffculty" placeholder="请选择难度">
                <el-option label="简单" :value="1"></el-option>
                <el-option label="一般" :value="2"></el-option>
                <el-option label="困难" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="作者" prop="username">
              <el-input v-model="form.username" class="questionUsername"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option label="禁用" :value="0"></el-option>
                <el-option label="启用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button class="btn" type="primary" @click="search">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="questionTable" :border="true">
        <el-table-column label="序号">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="题目">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">{{typeObj[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span :class="{att:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads"></el-table-column>
        <el-table-column label="操作" width="260px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'启用':"禁用"}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="questionPagination">
        <el-pagination
          background
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addQuestion
      ref="addQuestion"
      :subjectList="subjectList"
      :stepObj="stepObj"
      :businessList="businessList"
      :typeObj="typeObj"
      :diffcultyObj="diffcultyObj"
      :mode="mode"
    ></addQuestion>
  </div>
</template>

<script>
import { getSubject } from "@/api/subject.js";
import { getBusinessDate } from "@/api/business.js";
import {
  getQuestionData,
  setQuestionData,
  delQuestionData
} from "@/api/question.js";
import addQuestion from "./addQuestion.vue";
export default {
  components: {
    addQuestion
  },
  data() {
    return {
      mode: "add",
      pagination: {
        currentPage: 1,
        pageSize: 3,
        total: 10
      },
      form: {
        subject: "",
        step: "",
        enterprise: "",
        type: "",
        diffculty: "",
        username: "",
        status: "",
        create_date: "",
        title: ""
      },
      stepObj: { 1: "初级", 2: "中级", 3: "高级" },
      typeObj: { 1: "单选", 2: "多选", 3: "简答" },
      diffcultyObj: { 1: "简单", 2: "一般", 3: "困难" },
      subjectList: [],
      businessList: [],
      questionTable: []
    };
  },
  created() {
    // 获取学科列表数据
    getSubject({}).then(res => {
      this.subjectList = res.data.items;
      window.console.log("学科:", res.data.items);
    });
    // 获取企业列表
    getBusinessDate({ limit: 1000 }).then(res => {
      this.businessList = res.data.items;
      window.console.log("企业列表:", res);
    });
    this.getData();
  },
  methods: {
    getData() {
      let _pageInfo = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getQuestionData(_pageInfo).then(res => {
        this.table = res.data.items;
        // 处理城市数据
        this.table.forEach(item => {
          item.city = item.city.split(",");
          item.multiple_select_answer = item.multiple_select_answer.split(",");
        });
        console.log("题库列表", res);
        this.questionTable = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    sizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      this.search();
    },
    currentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.getData();
    },
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    add() {
      this.mode = "add";
      
      this.$refs.addQuestion.form = {
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
      };
      this.$refs.addQuestion.dialogFormVisible = true;
    },
    setStatus(id) {
      setQuestionData({ id: id }).then(() => {
        this.$message.success("状态修改成功");
        this.getData();
      });
    },
    del(id) {
      this.$confirm("是否删除此条数据?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delQuestionData({ id: id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
    edit(row) {
      this.mode = "edit";
      this.$refs.addQuestion.form = JSON.parse(JSON.stringify(row));
      this.$refs.addQuestion.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.question {
  .questionUsername {
    width: 217px;
  }
  .questionPagination {
    text-align: center;
    margin-top: 30px;
  }
  .att {
    color: red;
  }
}
</style>