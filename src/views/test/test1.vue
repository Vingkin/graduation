<template>
  <div class="app-container" >
    <el-table
      @row-click="getQuestion"
      :data="courseList"
      stripe style="width: 100%" >

      <el-table-column type="index" label="序号"
                       width="50"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="question" label="问题"></el-table-column>
    </el-table>

  </div>
</template>

<script>
import courseApi from '@/api/course'

export default {
  data() {
    return {

      courseList: []
    }
  },
  created() {
    this.getCourseList()
  },
  methods: {
    getCourseList() {
      // this.current = page
      courseApi.getAll().then(result => {
        this.courseList = result.data
        console.log('yes')
      }).catch(error => {
        console.log(JSON.stringify(error))
      })

    },
    // 点击题目获得具体题目与答案
    getQuestion(row) {

    }
  }
}
</script>

<style scoped>

</style>
