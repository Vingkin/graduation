<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-input v-model="keyWord" placeholder="请输入用户名"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData">清空</el-button>
    </el-form>

    <!-- banner列表 -->
    <el-table v-loading="listLoading" :data="list"
              border
              fit
              highlight-current-row>

      <el-table-column
        label="序号"
        width="60"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="phone" label="电话号码"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column prop="role" label="角色" width="90"/>

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <!--<router-link :to="'/hospital/show/'+scope.row.id">-->
          <el-button v-if="scope.row.role === '管理员'" type="info" size="mini"
                     @click="changeRole(scope.row.id, scope.row.role)">设为用户
          </el-button>
          <el-button v-else type="warning" size="mini" @click="changeRole(scope.row.id, scope.row.role)">设为管理
          </el-button>
          <!--</router-link>-->
          <!--<router-link :to="'/user/list/'+scope.row.hoscode">-->
          <el-button type="danger" size="mini" @click="isDelete(scope.row.id, scope.row.username)">删除</el-button>
          <!--</router-link>-->
          <!--<el-button v-if="scope.row.status == 1" type="primary" size="mini" @click="updateStatus(scope.row.id, 0)">下线-->
          <!--</el-button>-->
          <!--<el-button v-if="scope.row.status == 0" type="danger" size="mini" @click="updateStatus(scope.row.id, 1)">上线-->
          <!--</el-button>-->
        </template>

      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import userApi from '../../api/user'

export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null,
      total: 0,
      page: 1,
      limit: 10,
      keyWord: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    isDelete(id, username) {
      this.$confirm('此操作将永久删除用户 ' + username + ' ，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.deleteUser(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changeRole(id, role) {
      if (role === '管理员') {
        userApi.setMember(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: response.message
            })
            this.fetchData(this.page)
          }).catch(error => {
          this.$message({
            type: 'error',
            message: error.message
          })
          this.fetchData(this.page)
        })
      } else {
        userApi.setAdmin(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: response.message
            })
            this.fetchData(this.page)
          }).catch(error => {
          this.$message({
            type: 'error',
            message: error.message
          })
          this.fetchData(this.page)
        })
      }
    },
    resetData() {
      this.keyWord = ''
    },
    // 删除用户
    deleteUser(id) {
      userApi.deleteById(id)
        .then(response => {
          this.$message({
            type: 'info',
            message: response.data
          })
          this.fetchData(this.page)
        }).catch(error => {
        this.$message({
          type: 'info',
          message: error
        })
      })
    },
    // 医院列表
    fetchData(page = 1) {
      this.page = page
      userApi.queryAllUser(this.page, this.limit, this.keyWord)
        .then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
    },
    changeSize(size) {
      this.limit = size
      this.fetchData(1)
    }
  }
}
</script>

<style scoped>

</style>
