<template>
  <div class="info">
    <el-form ref="form" :model="info" label-width="80px">
      <el-form-item v-for="list of addArr" v-model="info[selectValue]">
        <el-select v-model="selectValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="inputValue"
          placeholder="请输入内容"
          style="width:200px"
        ></el-input>
      </el-form-item>
    </el-form>
    <button @click="onClickAddOne">Add One</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectValue: "",
      inputValue: "",
      addArr: [],
      info: {
        qq: "",
        wx: "",
        yddh: "",
        dzyx: "",
        qtLxfs: ""
      },
      options: [
        {
          value: "qq",
          label: "QQ"
        },
        {
          value: "wx",
          label: "微信"
        },
        {
          value: "yddh",
          label: "移动电话"
        },
        {
          value: "dzyx",
          label: "电子邮箱"
        },
        {
          value: "qtLxfs",
          label: "其他联系方式"
        }
      ]
    };
  },
  methods: {
    onClickAddOne() {
      this.addArr.push({});
      if (this.selectValue) {
        this.info[this.selectValue] = this.inputValue;
      }
    },
    onChange(e) {}
  }
};
</script>

<style lang="scss" scoped></style>
