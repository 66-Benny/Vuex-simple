<template>
  <el-dialog
    :visible.sync="visible"
    width="60%"
    append-to-body
    :lock-scroll="false"
    :title="title"
  >
    <div class="main">
      <el-row>
        <el-col
          :span="4"
          class="selectProduct"
        >
          <span>产品线</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="24"
          class="tableTree"
        >
          <el-table
            ref="table"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 96%;margin-bottom: 20px;"
            row-key="psCode"
            border
            :indent="50"
            :highlight-current-row="!isCheckBox"
            :select-on-indeterminate="false"
            @select="select"
            @select-all="selectAll"
            @selection-change="selectionChange"
            @current-change="handleCurrentChange"
            :default-expand-all="false"
            :accordion="true"
            :tree-props="{children: 'children',hasChildren: 'hasChildren'}"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
            <el-table-column
              type="selection"
              width="55"
              v-if="isCheckBox"
            >
            </el-table-column>
            <el-table-column
              prop="psCode"
              label="产品分类代码"
              v-if="isCheckBox"
            >
            </el-table-column>
            <el-table-column
              prop="psCode"
              label="产品分类代码"
              v-if="!isCheckBox"
            >
              <template
                slot-scope="scope"
                v-if="!isCheckBox"
              >
                <el-radio
                  v-model="selectArr"
                  :label="scope.row"
                ><i></i>{{scope.row.psCode}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="psName"
              label="产品分类描述"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="8"
          :offset="8"
          class="buttonGrop"
        >
          <el-button
            type="primary"
            size="medium"
            @click="onSubmit"
          >添加</el-button>
          <el-button
            size="medium"
            @click="cancelAll"
          >取消</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>

</template>
<script>
import _ from 'lodash'
import axios from '@/libs/axios'
export default {
  name: 'table-tree',
  props: {
    title: {
      type: String,
      default: '设备分类'
    },
    isCheckBox: { // 是否为多选，true：多选，false：单选
      type: Boolean,
      default: false
    },
    tableTreeVisible: { // 弹出层显示隐藏
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hasChildren: true,
      selectedOptionsValue: { // 下拉框所选值
        text: '',
        value: ''
      },
      options: [], // 下拉框数据
      selectArr: [], // 被选中的值
      tableData: [] // table 数据
    }
  },
  created () {

  },
  computed: {
    visible: { // dialog 显示隐藏
      get () { return this.tableTreeVisible },
      set (val) {
        this.$emit('updateTableTreeVisible', val)
      }
    }
  },
  methods: {
    // 下拉框所选值变化
    onChangeSelectOptions () {
      this.getList()
    },
    select (selection, row) {
      if (selection.some(el => { return row.psCode === el.psCode })) {
        console.log(selection)
        this.childrenRecursiveChange(row, true)
      } else {
        this.childrenRecursiveChange(row, false)
        this.parentsRecursiveChange(selection, row, false)
      }
    },
    childrenRecursiveChange (row, status) {
      if (row.children) {
        row.children.map(j => {
          this.toggleSelection(j, status)
          if (j.children) this.childrenRecursiveChange(j, status)
        })
      }
    },
    parentsRecursiveChange (selection, row, status) {
      let parentIds = this.getJsonParents(this.tableData, row.psCode)
      if (parentIds && parentIds.length) {
        selection.map(el => {
          if (parentIds.includes(el.psCode)) {
            this.toggleSelection(el, status)
          }
        })
      }
    },
    selectAll (selection) {
      // tabledata第一层只要有在selection里面就是全选
      const isSelect = selection.some(el => {
        const tableDataIds = this.tableData.map(j => j.psCode)
        return tableDataIds.includes(el.psCode)
      })
      // tableDate第一层只要有不在selection里面就是全不选
      const isCancel = !this.tableData.every(el => {
        const selectIds = selection.map(j => j.psCode)
        return selectIds.includes(el.psCode)
      })
      if (isSelect) {
        selection.map(el => {
          this.childrenRecursiveChange(el, true)
        })
      }
      if (isCancel) {
        this.tableData.map(el => {
          this.childrenRecursiveChange(el, false)
        })
      }
    },
    selectionChange (selection) {
      selection.map(item => {
        item.version =
          this.selectedOptionsValue.text
      })
      this.selectArr = selection
      this.removechildListTag(selection)
    },
    toggleSelection (row, select) {
      if (row) {
        this.$nextTick(() => {
          this.$refs.table && this.$refs.table.toggleRowSelection(row, select)
        })
      }
    },
    cancelAll () {
      this.visible = false
      this.$refs.table.clearSelection()
      this.selectArr = []
      this.tableData = []
      this.options = []
      this.selectedOptionsValue = ''
    },
    onSubmit () {
      this.$emit('submit', this.selectArr)
      this.cancelAll()
    },
    findParentNodeId (jsonData, nodeId) {
      let result
      if (!jsonData || !jsonData.children) {
        return result
      }
      for (let i = 0; i < jsonData.children.length; i++) {
        let item = jsonData.children[i]
        if (item.id == nodeId) {
          result = jsonData.id
          return result
        } else if (item.children && item.children.length > 0) {
          result = this.findParentNodeId(item, nodeId)
          if (result) {
            return result
          }
        }
      }
      return result
    },
    getJsonParents (array, nodeId) {
      let str = []
      if (!array || array.length == 0) return null
      for (let i = 0; i < array.length; i++) {
        let parentId = this.findParentNodeId(array[i], nodeId)
        if (!parentId) continue
        else {
          handler(array[i], nodeId)
        }
        return str
      }
      function handler (json, nodeId) {
        let parentId = this.findParentNodeId(json, nodeId)
        if (parentId) {
          str.unshift(parentId)
          handler(json, parentId)
        } else {

        }
      }
    },
    handleCurrentChange (selection) {
      selection.version = this.selectedOptionsValue.text
      this.selectArr = selection
    },
    removechildListTag (selection) {
      selection.map((item, index) => {
        if (item.children) {
          _.remove(this.selectArr, function (n) {
            return n.children
          })
        }
      })
    },
    getList () {
      axios.request({
        serviceId: 'parts',
        url: `/getAllPartsType?proclassCode=${this.selectedOptionsValue.value}`,
        method: 'get'
      }).then(res => {
        let list = res || []
        this.tableData = list
      })
    }
  },
  watch: {
    'selectedOptionsValue.value': {
      handler () {
        if (this.visible) {
          this.getList()
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang='scss' scoped>
.main {
  .selectProduct {
    margin: 0px 0 5px 25px;
    font-weight: bold;
    .search {
      margin-top: 15px;
    }
  }
  .tableTree {
    margin: 20px 0 5px 25px;
  }
  .buttonGrop {
    text-align: center;
    margin-bottom: 10px;
  }
}
.el-dialog__wrapper {
  /deep/ .el-dialog {
    overflow: scroll;
    margin-top: 15vh;
    width: 60%;
    max-height: 600px;
    .el-dialog__body {
      padding: 10px 20px;
      .el-table__expand-icon {
        display: inline-block;
        width: 20px;
        line-height: 20px;
        height: 20px;
        text-align: center;
        margin-right: 3px;
      }
    }
  }
}
.has-gutter .el-table-column--selection div {
  display: none;
}
</style>
