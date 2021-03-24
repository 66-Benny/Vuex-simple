<template>
  <div class="root">
    <ul>
      <li
        v-for="(child) in folder"
        :key="child.text"
      >
        <span
          @click="showSubFolder(child)"
          :class="[hasSelected === child.text ? 'isSelected' : '']"
        >{{ child.text }}</span>
      </li>
      <root
        v-for="(child) in subFolder"
        :key="child.text"
        :folder="subFolder"
        :class="haveChild ? '' : 'center'"
      ></root>
    </ul>
  </div>
</template>

<script>
import Bus from '../common/bus';
export default {
  name: 'root',
  props: {
    folder: Array
  },
  data () {
    return {
      subFolder: [],
      hasSelected: '',
      haveChild: true,
    }
  },
  methods: {
    showSubFolder (folder) {
      if (folder.text === '暂无数据') {
        return
      }
      if (!folder.children) {
        this.haveChild = false
      }
      if (folder.children) {
        this.subFolder = folder.children
        this.haveChild = true
      }
      else {
        this.subFolder = [{ text: '暂无数据' }]
      }
      this.hasSelected = folder.text
      Bus.$emit('ClickRoot', folder)
    },
  },
};
</script>

<style scoped lang="scss">
.root {
  ul {
    width: 100%;
    padding: 1rem;
    margin-top: 30px;
    box-sizing: border-box;
    list-style: none;
    display: flex;
    position: fixed;
    left: 5%;
    li {
      word-wrap: break-word;
      cursor: pointer;
      margin-right: 30px;
      .isSelected {
        color: #3b55eb;
      }
    }
  }
  ul::after {
    content: "";
    display: inline-block;
    height: 1px;
    width: 100% !important;
    margin: 0 20px;
    background-color: #ccc;
    position: absolute;
    overflow: hidden;
    top: 2px;
    left: -2%;
    margin-bottom: 0px;
  }
  ul:last-child::after {
    width: 0;
  }
}
.center span {
  color: #ccc;
  position: absolute;
  right: 50%;
  cursor: default;
}
</style>
