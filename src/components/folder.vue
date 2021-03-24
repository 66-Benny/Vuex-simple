<template>
  <div>
    <li class="folder">
      <span @click="showSubFolder(folder)">{{ folder.text }}</span>
    </li>
    <ul
      class="subFolders"
      v-if="hasSubFolder"
    >
      <folder
        v-for="(child,index) in folder.children"
        :key="index"
        :folder="child"
        v-show="hasSubFolder"
      ></folder>
    </ul>
  </div>

</template>
<script>

export default {
  name: "folder",
  props: {
    folder: Object
  },
  data () {
    return {
      hasSubFolder: false,
      folderText: ''
    }
  },
  methods: {
    showSubFolder (folder) {
      this.folderText = folder.text
      if (folder.children) {
        this.hasSubFolder = true
      }
    }
  }
};

</script>
<style scoped lang="scss">
li {
  margin-right: 15px;
}
ul.subFolders {
  border: 1px solid #ccc;
  width: 70%;
  padding: 1rem;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  display: flex;
  position: fixed;
  left: 0;
}
</style>