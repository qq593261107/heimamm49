<template>
  <div class="business">
    <el-card>
      <el-form label-width="90px" :inline="true" :model="form" ref="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="businessInput" v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="businessInput" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="businessInput" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="addBusinessBtn">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="businessCard">
      <el-table :data="tableList">
        <!-- whidth可以设置宽度 -->
        <el-table-column label="序号" width="50px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="企业编号" prop="eid" width="170px"></el-table-column>
        <el-table-column label="企业名称" prop="name" width="200px"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">
            <span :class="{att:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="270px">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="primary"
              plain
              @click="setStatus(scope.row.id)"
            >{{scope.row.status==1?'禁用':'启用'}}</el-button>
            <el-button type="primary" plain @click="delBusiness(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="businessPagination">
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
    <addBusiness ref="addBusiness" :mode="mode"></addBusiness>
  </div>
</template>

<script>
import {
  getBusinessDate,
  delBusinessDate,
  setBusinessStatus
} from "@/api/business.js";
import addBusiness from "./addBusiness.vue";
export default {
  components: {
    addBusiness
  },
  data() {
    return {
      mode: "add",
      pagination: {
        currentPage: 1,
        pageSize: 3,
        total: 10
      },
      tableList: [],
      form: {
        eid: "",
        name: "",
        username: "",
        status: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    getData() {
      let _pageInfo = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getBusinessDate(_pageInfo).then(res => {
        if (res.code == 200) {
          this.tableList = res.data.items;
          this.pagination.total = res.data.pagination.total;
        }
        console.log(res);
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
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    addBusinessBtn() {
      this.mode = "add";
      this.$refs.addBusiness.dialogFormVisible = true;
      this.$refs.addBusiness.form = {
        eid: "",
        name: "",
        username: "",
        status: ""
      };
    },
    setStatus(id) {
      setBusinessStatus({ id: id }).then(() => {
        this.getData();
        this.$message.success("修改状态成功");
      });
    },
    delBusiness(id) {
      this.$confirm("是否删除此条数据?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delBusinessDate({ id: id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
    edit(row) {
      this.mode = "edit";
      this.$refs.addBusiness.form = JSON.parse(JSON.stringify(row));
      this.$refs.addBusiness.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.business {
  .businessInput {
    width: 150px;
  }
  .att {
    color: red;
  }
  .businessPagination {
    text-align: center;
    margin-top: 20px;
  }
  .businessCard {
    margin-top: 30px;
  }
}
</style>