<template>
  <div class="subject">
    <el-card>
      <el-form label-width="90px" :inline="true" :model="form" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="subjectInput" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="subjectInput" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="subjectInput" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" class="subjectSel" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="subjectCard">
      <el-table :data="tableData">
        <!-- whidth可以设置宽度 -->
        <el-table-column label="序号" width="50px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="学科编号" prop="rid" width="170px"></el-table-column>
        <el-table-column label="学科名称" prop="name" width="200px"></el-table-column>
        <el-table-column label="简称" prop="short_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="270px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)">{{scope.row.status==1?'禁用':'启用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="subjectPagination">
        <el-pagination
          background
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[2, 4, 5, 10]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addSubject ref="reference" :mode="mode" @add="search"></addSubject>
  </div>
</template>

<script>
import addSubject from "./addSubject.vue";
import { getSubject, setSubjectStatus, delSubjectData } from "@/api/subject.js";
export default {
  components: {
    addSubject
  },
  data() {
    return {
      mode: "",
      pagination: {
        currentPage: 1, // 当前页
        pageSize: 2, // 每页条数
        total: 2 // 总数
      },
      form: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    setStatus(id) {
      setSubjectStatus({ id: id }).then(() => {
        this.search();
      });
    },
    getData() {
      let _pageInfo = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getSubject(_pageInfo).then(res => {
        console.log(res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    sizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      this.pagination.currentPage = 1;
      this.getData();
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
      this.form = {
        rid: "",
        name: "",
        username: "",
        status: ""
      };
      this.search();
    },
    del(id) {
      this.$confirm("是否删除此条数据?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delSubjectData({ id: id }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.search();
        });
      });
    },
    add() {
      this.mode = "add";
      this.$refs.reference.dialogFormVisible = true;
      this.$refs.reference.form = {
        rid: "",
        name: "",
        username: "",
        status: ""
      };
    },
    edit(row) {
      this.mode = "edit";
      this.$refs.reference.form = JSON.parse(JSON.stringify(row));
      this.$refs.reference.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.subject {
  .subjectCard {
    margin-top: 20px;
  }
  .subjectInput {
    width: 100px;
  }
  .subjectSel {
    width: 149px;
  }
  .subjectPagination {
    margin-top: 30px;
    text-align: center;
  }
}
</style>