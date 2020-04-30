<template>
  <div
    id="table-wrapper"
    v-loading="getTableDataLoading"
    element-loading-text="加载中"
  >
    <div class="emptyImage" v-if="tableData.data.list.length < 1">
      <span>还没有查到任何记录</span>
    </div>
    <div
      id="table-scroll"
      :style="{ 'overflow-x': getTableDataLoading ? 'hidden' : 'auto' }"
    >
      <table border="0" cellpadding="0" cellspacing="0" class="customTable">
        <thead>
          <tr>
            <th v-if="tableData.data.list.length > 0">序号</th>
            <th
              v-for="heading in tableHeader.data"
              :key="heading.key"
              v-if="tableData.data.list.length > 0"
            >
              {{ heading.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="table"
            v-for="(row, index) in tableData.data.list"
            :key="row.key"
          >
            <td>{{ getTableIndex(index) }}</td>
            <td
              v-for="heading in tableHeader.data"
              :key="heading.row"
              :class="{
                alignLeft: heading.key.indexOf('L0L1') != -1,
                alignRight: heading.key.indexOf('R0R1') != -1
              }"
            >
              {{ row[heading.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "tableRow",
  props: [
    "tableHeader",
    "tableData",
    "getTableDataLoading",
    "pageNum",
    "pageSize"
  ],
  data() {
    return {
      showTooltip: false
    };
  },
  methods: {
    // 获取table序号
    getTableIndex(index) {
      return index + (this.pageNum - 1) * this.pageSize + 1;
    }
  }
};
</script>

<style lang="scss" scoped>
#table-wrapper {
  position: relative;
  min-height: 300px;
  margin-bottom: 7px;
  margin-top: 15px;
  .emptyImage {
    background-image: url("../assets/empty.png");
    background-size: 300px;
    background-repeat: no-repeat;
    background-position: 50%;
    text-align: center;
    height: 240px;
    position: relative;
    span {
      font-size: 14px;
      width: 100%;
      color: #666;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  #table-scroll {
    table.customTable {
      width: auto;
      border: 1px solid #e9eff2;
      table-layout: fixed;
      word-wrap: break-word;
      overflow-x: auto;
      word-break: keep-all;
      text-align: center;
      white-space: normal;
      margin-bottom: 10px;
      th {
        background-color: #94b9cd;
        color: #ffffff;
        border-left: 1px solid #b0cbda;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 12px;
        max-width: 50%;
        width: 7%;
        &:first-child {
          border-left: 0;
        }
      }
      th:first-child {
        width: 1%;
      }
      tbody tr:nth-child(2n) {
        background-color: #f5fcff;
      }
      tbody {
        tr {
          td {
            text-align: center;
            border-bottom: 1px solid #e9eff2;
            word-wrap: break-word;
            padding: 0 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            &.product-name {
              border-right: 1px solid #e9eff2;
            }
            &:last-child {
              border-right: 0;
            }
          }
          &:last-child {
            td {
              border-bottom: 0;
            }
          }
        }
      }
      td {
        padding: 5px;
        border: none;
      }
      .table td {
        min-width: 40px;
        overflow: hidden;
        white-space: nowrap;
        padding: 5px 10px;
      }
      .table td:first-child {
        min-width: 10px;
      }
      .tooltop {
        cursor: pointer;
      }
      .alignLeft {
        text-align: left;
        text-align: -webkit-left;
        text-align: -moz-left;
        text-align: -o-left;
        text-align: -ms-left;
      }
      .alignRight {
        text-align: right;
        text-align: -webkit-right;
        text-align: -moz-right;
        text-align: -o-right;
        text-align: -ms-right;
      }
    }
  }
  /deep/ .circular {
    left: 0px;
  }
}
</style>
