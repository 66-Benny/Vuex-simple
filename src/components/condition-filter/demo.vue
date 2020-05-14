<template>
  <div class="showMore">
    <p class="baseTitle">基本查询条件：</p>
    <el-form
      :inline="true"
      :model.lazy="form"
      class="demo-form-inline"
      label-width="80px"
      ref="form"
    >
      <show-more :visible.sync="visible" :showMoreTittle="showMoreTittle">
        <template slot="base">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
              <el-option label="区域三" value="DL"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间1" prop="date">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动时间2" prop="date2">
            <el-date-picker
              v-model="form.date2"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker
          ></el-form-item>
        </template>
        <template slot="showMore">
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推-活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="活动性质" prop="size">
            <el-checkbox-group v-model="form.size">
              <el-checkbox-button
                label="美食/餐厅线上活动"
                name="type"
              ></el-checkbox-button>
              <el-checkbox-button
                label="地推活动"
                name="type"
              ></el-checkbox-button>
              <el-checkbox-button
                label="线下主题活动"
                name="type"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <template slot="tagList">
          <condition-filter
            :form="form"
            @closeItem="onCloseItem"
          ></condition-filter>
        </template>
      </show-more>
    </el-form>
  </div>
</template>

<script>
import showMore from "../show-more/index";
import conditionFilter from "../condition-filter/index";
import _format from "../../common/common";
export default {
  name: "demo",
  components: { showMore, conditionFilter },
  data() {
    return {
      showMoreTittle: "条件筛选：",
      visible: true,
      form: {
        name: "",
        region: "",
        date: "",
        date2: "",
        date3: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        size: []
      },
      tagList: {},
      fields: []
    };
  },
  methods: {
    onCloseItem(sourceItem, sourceKey, sourceValue) {
      this.$set(
        this.form,
        sourceKey,
        _format.removeValue(sourceItem, sourceKey, sourceValue, this.form)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.showMore {
  .baseTitle {
    font-size: 16px;
    font-weight: bold;
    color: #33517e;
  }
}
</style>
