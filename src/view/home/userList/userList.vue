<template>
  <div class="userList">
    <el-card>
      <el-form label-width="90px" :inline="true" :model="form" ref="form">
        <el-form-item label="用户名称" prop="username">
          <el-input class="businessInput" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="businessInput" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select placeholder="请选择状态" v-model="form.role_id">
            <el-option
              :label="value"
              :value="key"
              v-for="(value,key,index ) in $store.state.roleObj"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="addUserList">新增新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="userListCard">
      <el-table :data="tableList" :border="true">
        <el-table-column label="序号" width="50px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="用户名" prop="username" width="170px"></el-table-column>
        <el-table-column label="电话" prop="phone" width="200px"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
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
            <el-button type="primary" plain @click="deluserList(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="userListPagination">
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
    <addUserList ref="addUserList" :mode="mode"></addUserList>
  </div>
</template>

<script>
import addUserList from "./addUserList.vue";
import { getUserList, setUserStatus, delUserList } from "@/api/userList.js";
export default {
  components: {
    addUserList
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
        username: "",
        email: "",
        role_id: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    search() {
      (this.pagination.currentPage = 1), this.getData();
    },
    getData() {
      let _pageInfo = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getUserList(_pageInfo).then(res => {
        console.log(res);
        this.tableList = res.data.items;
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
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    setStatus(id) {
      setUserStatus({ id: id }).then(() => {
        this.getData();
        this.$message.success("修改状态成功");
      });
    },
    deluserList(id) {
      this.$confirm("是否删除此条数据?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delUserList({ id: id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
    addUserList() {
      this.mode = "add";
      this.$refs.addUserList.dialogFormVisible = true;
      this.$refs.addUserList.form = {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      };
    },
    edit(row) {
      this.mode = "edit";
      this.$refs.addUserList.form = JSON.parse(JSON.stringify(row));
      this.$refs.addUserList.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.userList {
  .userListCard {
    margin-top: 30px;
  }
  .userListPagination {
    text-align: center;
    margin-top: 30px;
  }
  .att {
    color: red;
  }
}
</style>