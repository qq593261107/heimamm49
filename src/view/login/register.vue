<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" class="register" width="600px">
    <div slot="title" class="title">用户注册</div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false
    };
  }
};
</script>

<style lang="less">
.register {
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
}
</style>