<template>
  <div class="app-container">
    <!--// 导出数据字典-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="importData">导入</el-button>
      </el-form-item>
      <el-form-item>
        <a href="http://localhost:8202/admin/cmn/dict/exportData" target="_blank">
          <el-button type="primary">导出</el-button>
        </a>
      </el-form-item>
    </el-form>
    <el-table
      :data="dictList"
      :load="getChildrens"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%"
      row-key="id"
      border
      lazy>
      <el-table-column label="名称" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编码" width="220">
        <template slot-scope="{row}">
          <span>{{ row.dictCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="值" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="导入" :visible.sync="importDialogVisible" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8202/admin/cmn/dict/importData'"
            class="upload-demo">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="importDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import dict from '@/api/dict'

export default {
  data() {
    return {
      importDialogVisible: false,
      dictList: [] // 数据字典列表数组
    }
  },
  created() {
    this.getDictList(1)
  },
  methods: {
    // 获得数据字典列表
    getDictList(id) {
      dict.dictList(id)
        .then(result => {
          this.dictList = result.data
        })
    },
    // 查询下面层级的内容
    getChildrens(tree, treeNode, resolve) {
      dict.dictList(tree.id)
        .then(result => {
          resolve(result.data)
        })
    },
    importData() {
      this.importDialogVisible = true
    },
    // 上传成功调用的方法
    onUploadSuccess() {
      this.importDialogVisible = false
      this.getDictList(1)
    }
  }
}
</script>

<style scoped>

</style>
