<template>
  <div class="A-page">
    <!-- <strong>{{ viObj }}</strong>
    <vue-friendly-iframe
      :src="example1Form.src"
      className="friendlyIframe"
      ref="friendlyIframe"
      crossorigin="anonymous"
    ></vue-friendly-iframe> -->
    <!-- <router-view></router-view> -->
    <!-- <table-tree></table-tree> -->
    <!-- <el-button
      type="primary"
      size="medium"
      @click="show"
    >新增</el-button>
    <el-table
      ref="table"
      :data="tableData"
    >
      <el-table-column
        prop="id"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="产品分类代码"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品分类描述"
      >
      </el-table-column>
    </el-table> -->
    <!-- <table-tree
      :isCheckBox="false"
      :tableTreeVisible="tableTreeVisible"
      @submit="onSubmit"
      @updateTableTreeVisible="tableTreeVisible = false"
    ></table-tree> -->
    所选值为： {{selectedValue.text}}
    <br /> <br />
    <root :folder="root"></root>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import TableTree from '../components/table-tree.vue';
import _ from 'lodash'
import Root from '../components/root'
import Bus from '../common/bus';
const FETCH_AFUN_ACTION = "modelA/fetchA";

export default {
  name: "A.page",
  components: {
    // TableTree,
    Root,
  },
  data () {
    return {
      msg: "Welcome to Your A App",
      obj: {
        aaa: "a test",
        bbb: 15
      },
      viObj: {},
      example1Form: {
        src: 'http://www.baidu.com'
      },
      tableTreeVisible: false,
      tableData: [],
      selectedValue: '1',
      root: [
        {
          text: 'Root Folder1',
          children: [{
            text: 'Sub Folder 1-1',
            children: [{
              text: 'Sub Folder 1-1-1',
            }],
          },
          {
            text: 'Sub Folder 1-2',
          }]
        },
        {
          text: 'Root Folder2',
          children: [{
            text: 'Sub Folder 2-1',
            children: [{
              text: 'Sub Folder 2-1-1',
              children: [{
                text: 'Sub Folder 2-1-1-1',
              }],
            },
            {
              text: 'Sub Folder 2-1-2',
            }]
          },
          {
            text: 'Sub Folder 2-2',
            children: [{
              text: 'Sub Folder 2-2-1',
              children: [{
                text: 'Sub Folder 2-2-1-1',
              },
              {
                text: 'Sub Folder 2-2-1-2',
              }]
            }]
          }, {
            text: 'Sub Folder 2-3',
            children: [{
              text: 'Sub Folder 2-3-1',
              children: [{
                text: 'Sub Folder 2-3-1-1',
              },
              {
                text: 'Sub Folder 2-3-1-2',
              }]
            }]
          }]
        },
        {
          text: 'Root Folder3',
        },
        {
          text: 'Root Folder4',
        },
        {
          text: 'Root Folder5',
        },
        {
          text: 'Root Folder6',
        },
        {
          text: 'Root Folder7',
        },
        {
          text: 'Root Folder8',
        },
      ]
    }
  },
  created () {
    this.init();
    Bus.$on('ClickRoot', val => {
      this.doSomthing(val)
    })
  },
  beforeDestroy () {
    Bus.$off('ClickRoot');
  },
  methods: {
    init () {
      this.postPageA(this.obj);
    },
    // doSomthing: _.throttle(function (val) { this.selectedValue = val }, 1),
    doSomthing (val) {
      this.selectedValue = val
    },
    postPageA (payload) {
      this.$store.dispatch(FETCH_AFUN_ACTION, payload);
    },
    onSubmit (val) {
      this.tableData = this.tableData.concat(val)
    },
    show () {
      this.tableTreeVisible = true
    },
  },
  computed: {
    ...mapState({
      pageAFromVuex: state => state.modelA.dataA
    })
  },
  watch: {
    pageAFromVuex (val) {
      this.viObj = val;
    }
  }
};
</script>

<style lang='scss' scoped>
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.A-page {
  width: 100%;
  height: 600px;
}
.friendlyIframe {
  width: 100%;
  height: 100%;
}
iframe {
  width: 100%;
  height: 100%;
}
</style>
