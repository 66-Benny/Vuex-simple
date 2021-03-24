<template>
  <div class="dsr">
    <el-form
      ref="form"
      :model="dsr"
      label-width="80px"
    >
      <el-form-item
        v-for="(list, index) of addArr"
        :key="index"
      >
        <el-select
          v-model="addArr[index].key"
          placeholder="请选择"
          @change="onChangeSelect"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="addArr[index].value"
          placeholder="请输入内容"
          style="width:200px"
          @change="onChangeInput"
        ></el-input>
      </el-form-item>
    </el-form>
    <button @click="onClickAddOne">Add One</button>
  </div>
</template>

<script>
// 生产系统中-统计分析-省公司报表-统建省业务-统建省物流-物流指标查询

export default {
  data () {
    return {
      selectValue: "",
      inputValue: "",
      addArr: [],
      dsr: {
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
    onClickAddOne () {
      this.addArr.push({ key: "", value: "" });
    },
    onChangeSelect (value) {
      this.selectValue = value;
    },
    onChangeInput (value) {
      this.dsr[this.selectValue] = value;
    }
  }
  // 上投 1 3 1 3 = 8
  // 诺安和鑫 3 2 2 2 = 9
  // 诺安成长 2 1 3 1 = 7
};
</script>

<style lang="scss" scoped></style>
