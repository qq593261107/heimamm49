<template>
  <div class="addSelect">
    <div v-if="form.type ==1">
      <div v-for="(item, index) in form.select_options" :key="index" class="item">
        <el-radio
          class="radioItem"
          v-model="form.single_select_answer"
          :label="item.label"
          @change="selectChang"
        >{{item.label}}</el-radio>
        <el-input v-model="item.text"></el-input>
        <div>
          <uploadFile v-model="item.image"></uploadFile>
        </div>
      </div>
    </div>
    <div v-if="form.type ==2">
      <div v-for="(item, index) in form.select_options" :key="index" class="item">
        <el-checkbox
          class="radioItem"
          v-model="form.multiple_select_answer"
          :label="item.label"
          @change="selectChang"
        >{{item.label}}</el-checkbox>
        <el-input v-model="item.text"></el-input>
        <div>
          <uploadFile v-model="item.image"></uploadFile>
        </div>
      </div>
    </div>
    <div v-if="form.type ==3">
      <el-input type="textarea" rows="10" v-model="form.short_answer" @change="selectChang"></el-input>
    </div>
  </div>
</template>

<script>
import uploadFile from "./uploadFile.vue";
export default {
  components: {
    uploadFile
  },
  props: ["form"],
  methods:{
    selectChang(){
      this.$emit('change')
    }
  }
};
</script>

<style lang="less">
.addSelect {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .radioItem {
      padding-top: 10px;
    }
  }
}
</style>