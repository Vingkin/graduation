<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="医院名称">
        <el-input v-model="searchObj.hosname" placeholder="医院名称"></el-input>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      </el-form-item>
      <span style="position: absolute; right: 10px;">
        <el-form-item>
          <el-button type="danger" icon="el-icon-delete" @click="batchDeleteHospitalSet()">批量删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addVisible = true">添加</el-button>
        </el-form-item>
      </span>

    </el-form>
    <el-table
      :data="list"
      stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="hosname" label="医院名称"></el-table-column>
      <el-table-column prop="hoscode" label="医院编号"></el-table-column>
      <el-table-column prop="apiUrl" label="api基础路径" width="180"></el-table-column>
      <el-table-column prop="contactsName" label="联系人姓名"></el-table-column>
      <el-table-column prop="contactsPhone" label="联系人手机"></el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1" size="mini"
                     @click="lockHospitalSet(scope.row.id, scope.row.status ^ 1)">
            可用
          </el-button>
          <el-button v-else type="warning" size="mini" @click="lockHospitalSet(scope.row.id, scope.row.status ^ 1)">
            不可用
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="info" size="mini" icon="el-icon-edit" @click="getHospitalSetById(scope.row.id)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"/>
    <el-dialog title="添加医院设置" :visible.sync="addVisible" width="450px">
      <el-form label-width="100px">
        <el-form-item label="医院名称">
          <el-input style="width: 300px" v-model="addHospitalSet.hosname"/>
        </el-form-item>
        <el-form-item label="医院编号">
          <el-input style="width: 300px" v-model="addHospitalSet.hoscode"/>
        </el-form-item>
        <el-form-item label="api基础路径">
          <el-input style="width: 300px" v-model="addHospitalSet.apiUrl"/>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input style="width: 300px" v-model="addHospitalSet.contactsName"/>
        </el-form-item>
        <el-form-item label="联系人手机">
          <el-input style="width: 300px" v-model="addHospitalSet.contactsPhone"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更新医院设置" :visible.sync="editVisible" width="450px">
      <el-form label-width="100px">
        <el-form-item label="医院名称">
          <el-input style="width: 300px" v-model="hospitalSet.hosname"/>
        </el-form-item>
        <el-form-item label="医院编号">
          <el-input style="width: 300px" v-model="hospitalSet.hoscode"/>
        </el-form-item>
        <el-form-item label="api基础路径">
          <el-input style="width: 300px" v-model="hospitalSet.apiUrl"/>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input style="width: 300px" v-model="hospitalSet.contactsName"/>
        </el-form-item>
        <el-form-item label="联系人手机">
          <el-input style="width: 300px" v-model="hospitalSet.contactsPhone"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateHospitalSet()">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import hospitalSet from '@/api/hospitalset'

export default {
  data() {
    return {
      addHospitalSet: {},
      editVisible: false,
      hospitalSet: {},
      formLabelWidth: '120px',
      addVisible: false,
      current: 1,
      limit: 3,
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 医院设置列表方法
    getList(page = 1) {
      this.current = page
      hospitalSet.getHospitalSetList(this.current, this.limit, this.searchObj)
        .then(response => { // response就是接口返回数据
          this.list = response.data.records
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 删除
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospitalSet.deleteHospitalSet(id)
          .then(result => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getList()
          })
      })
    },
    // 批量删除
    batchDeleteHospitalSet() {
      this.$confirm('此操作将永久删除这些记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        let idList = []
        // 将multipleSelection中的id取出
        for (let i = 0; i < this.multipleSelection.length; i++) {
          idList.push(this.multipleSelection[i].id)
        }
        hospitalSet.batchDeleteHospitalSet(idList)
          .then(result => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getList()
          })
      })
    },
    // 用于获取选择复选框的id值
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    // 锁定和解锁
    lockHospitalSet(id, status) {
      hospitalSet.lockHospitalSet(id, status)
        .then(result => {
          // 页面刷新
          this.getList(this.current)
        })
    },
    // 添加医院设置
    addOrUpdate() {
      this.addVisible = false
      hospitalSet.saveHospitalSet(this.addHospitalSet)
        .then(result => {
          // 提示
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getList(this.current)
        })
    },
    // 通过id获取医院设置
    getHospitalSetById(id) {
      this.editVisible = true
      hospitalSet.getHospitalSetById(id)
        .then(result => {
          this.hospitalSet = result.data
        })
    },
    // 更新医院设置
    updateHospitalSet() {
      this.editVisible = false
      hospitalSet.updateHospitalSet(this.hospitalSet)
        .then(result => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.getList(this.current)
        })
    }
  }
}
</script>

<style scoped>
.addform {
  width: 500px;
}
</style>
