<template>
  <div>
    <el-row>
      <el-upload
          drag
          action=""
          multiple
          :auto-upload="false"
          :show-file-list="false"
          :on-change="fileOnChange"
          accept=".pdf,.PDF"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">將PDF拖到這邊</div>
      </el-upload>
    </el-row>
    <el-row v-if="fileList.length" justify="center">
      <el-col :span="12" :offset="6">
        <el-card class="box-card">
          <draggable v-model="fileList">
            <div v-for="(file,index) in fileList" :key="index" class="item">
              <el-row type="flex" justify="space-between">
                <el-col :span="20">
                  <div class="list-item">{{ file.name }}</div>
                </el-col>
                <el-col class="delete-btn" :span="4">
                  <el-button icon="el-icon-delete" size="mini" type="danger" round
                             @click="removeFile(file.uid)"></el-button>
                </el-col>
              </el-row>
            </div>
          </draggable>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="fileList.length">
      <el-divider/>
      <el-button round @click="startMerge" type="primary" :disabled="merging" :loading="merging">開始合併</el-button>
    </el-row>


  </div>

</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {draggable},
  name: 'Home',
  data() {
    return {
      fileList: [],
      merging: false
    }
  },
  methods: {
    fileOnChange(file, fileList) {
      if (file.name.endsWith('.pdf') || file.name.endsWith('.PDF')) {

        this.fileList = fileList
      } else {
        this.$message.error('只接受pdf格式!!')
        this.fileList.splice(this.fileList.findIndex(item => item.file), 1)
      }

    },
    removeFile(uid) {
      this.fileList.splice(this.fileList.findIndex(item => item.uid === uid), 1)
    },
    startMerge() {
      const fileList = []
      this.fileList.forEach(file => fileList.push(file.raw.path))

      window.api.send('start-merge', fileList)

      this.merging = true

      window.api.receive('stop-merge', result => {
        this.$message.success(result.message)
        this.merging = false
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.item {
  text-align: left;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.item:hover {
  background: #dcdfe6;
  cursor: grab;
}

.list-item {
  margin: 4px 0 0 20px;
}

>>> .el-card__body {
  padding: 2px;
}

.delete-btn {
  text-align: right;
  margin: auto;
}


</style>
