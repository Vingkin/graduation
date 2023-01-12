<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="模块">
            <el-select size="small" v-model="moduleValue" placeholder="请选择" @change="getCourseByModule">
              <el-option
                v-for="item in moduleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键点">
            <el-select size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位/用途">
            <el-select size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="等级">
            <el-select size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型">
            <el-select size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难易度">
            <el-select size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-table
          @row-click="getQuestion"
          :data="courseList"
          :max-height="screenHeight"
          stripe style="width: 100%">

          <el-table-column type="index" label="序号"
                           width="50"></el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="question" label="问题"></el-table-column>
        </el-table>


      </el-col>
      <el-col :span="12">
        <el-col style="min-height: 30px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span v-if="course.ans_num === 1">题目 {{ course.id }}</span>
              <span v-else>题目 {{ course.id }}</span>
            </div>
            <div v-if="course.ans_num === 1" class="text item">
              <el-tag>单选</el-tag>
              {{ course.question }}
            </div>
            <div v-else class="text item">
              <el-tag type="warning">多选</el-tag>
              {{ course.question }}
            </div>
          </el-card>
        </el-col>
        <el-col style="min-height: 30px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>答案</span>
            </div>
            <div v-if="course.ans_num === 1" class="text item">
              <el-radio v-model="radioAns" label="1">A {{ course.opt_a }}</el-radio>
              <br/>
              <el-radio v-model="radioAns" label="2">B {{ course.opt_b }}</el-radio>
              <br/>
              <el-radio v-model="radioAns" label="3">C {{ course.opt_c }}</el-radio>
              <br/>
              <el-radio v-model="radioAns" label="4">D {{ course.opt_d }}</el-radio>
              <br/>
              <el-radio v-model="radioAns" label="5">E {{ course.opt_e }}</el-radio>
              <br/>
              <el-radio v-model="radioAns" label="6">F {{ course.opt_f }}</el-radio>
            </div>
            <div v-else class="text item">
              <el-checkbox-group v-model="ansList">
                <el-checkbox label="1">A {{ course.opt_a }}</el-checkbox>
                <br/>
                <el-checkbox label="2">B {{ course.opt_b }}</el-checkbox>
                <br/>
                <el-checkbox label="3">C {{ course.opt_c }}</el-checkbox>
                <br/>
                <el-checkbox label="4">D {{ course.opt_d }}</el-checkbox>
                <br/>
                <el-checkbox label="5">E {{ course.opt_e }}</el-checkbox>
                <br/>
                <el-checkbox label="6">F {{ course.opt_f }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import courseApi from '@/api/course'

export default {
  data() {
    return {
      screenHeight: document.body.clientHeight - 200,
      count: 0, // 列表个数
      moduleOptions: [{
        value: '品牌或其它',
        label: '品牌/其它'
      }, {
        value: '空调L2入门测试理论题库',
        label: '空调L2入门测试理论题库'
      }, {
        value: '2019空调技师认证理论题库',
        label: '2019空调技师认证理论题库'
      }],
      moduleValue: '',
      ansList: [], // 多选题答案
      radioAns: 0, // 单选题答案，1表示A，2表示B以此类推，到时候前端完成这部分开发
      course: {}, // 对应一个课程
      total: 0, // 总记录数
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '', // select选中的值，到时候对于不同的select需要不同的value
      courseList: []
    }
  },
  created() {
    this.getCourseList()
  },
  methods: {
    load() {
      if (this.count + 1 <= this.total) {
        this.count += 1
    }
  },
    // 根据模块进行查询
    getCourseByModule(module) {
      courseApi.getCourseByModule(module)
        .then(result => {
          this.courseList = result.data
          this.total = this.courseList.length
        })
    },
    getCourseList() {
      courseApi.getAll().then(result => {
        // console.log(result)
        this.courseList = result.data
        this.total = this.courseList.length
      }).catch(error => {
        console.log(JSON.stringify(error))
      })

    },
    // 点击题目获得具体题目与答案
    getQuestion(row) {
      this.course = row
      console.log(this.course)
      this.ansList = []
      if (this.course.ans_num > 1) {
        if (this.course.ans_a === '正确') {
          this.ansList.push('1')
        }
        if (this.course.ans_b === '正确') {
          this.ansList.push('2')
        }
        if (this.course.ans_c === '正确') {
          this.ansList.push('3')
        }
        if (this.course.ans_d === '正确') {
          this.ansList.push('4')
        }
        if (this.course.ans_e === '正确') {
          this.ansList.push('5')
        }
        if (this.course.ans_f === '正确') {
          this.ansList.push('6')
        }
      } else {
        if (this.course.ans_a === '正确') {
          this.radioAns = '1'
        } else if (this.course.ans_b === '正确') {
          this.radioAns = '2'
        } else if (this.course.ans_c === '正确') {
          this.radioAns = '3'
        } else if (this.course.ans_d === '正确') {
          this.radioAns = '4'
        } else if (this.course.ans_e === '正确') {
          this.radioAns = '5'
        } else if (this.course.ans_f === '正确') {
          this.radioAns = '6'
        }
      }

    }
  }
}
</script>

<style scoped>

</style>
