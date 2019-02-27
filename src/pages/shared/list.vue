<template>
  <layout>
    <el-card class="box-card">
      <p>
        <el-button type="primary" @click="showCreateForm">新增</el-button>
      </p>
      <el-table
        :data="shareds"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="分享标题"
          width="120">
        </el-table-column>
        <el-table-column
          prop="url"
          label="分享地址"
          width="120">
        </el-table-column>
        <el-table-column
          label="分类"
          width="120">
          <template slot-scope="scope">
            {{scope.row.category | category}}
          </template>
        </el-table-column>
        <el-table-column
          prop="thumb"
          label="缩略图"
          width="220">
        </el-table-column>
        <el-table-column
          prop="description"
          label="文章描述">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteShared(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 20px;">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose">

      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="分享标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="分享分类">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="请选择" value=""></el-option>
            <el-option label="代码" value="code"></el-option>
            <el-option label="思考" value="think"></el-option>
            <el-option label="健身" value="fitness"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分享地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="分享缩略图">
          <el-input v-model="form.thumb"></el-input>
        </el-form-item>
        <el-form-item label="分享描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!isEdit" type="primary" @click="createShared">立即创建</el-button>
          <el-button v-if="isEdit" type="primary" @click="edit">立即更新</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </layout>
</template>

<script>
import Layout from '@/components/layout'
import axios from 'axios'

export default {
  name: 'shared-list',
  data () {
    return {
      pagination: {},
      shareds: [],
      dialogVisible: false,
      isEdit: false,
      form: {
        title: '',
        category: '',
        description: '',
        url: '',
        thumb: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.isEdit = false
      this.form = {
        title: '',
        category: '',
        description: '',
        url: '',
        thumb: ''
      }
      this.dialogVisible = false
    },
    showCreateForm () {
      this.dialogVisible = true
    },
    createShared () {
      this.create()
    },
    toEdit (shared) {
      this.isEdit = true
      this.form = shared
      this.dialogVisible = true
    },
    async deleteShared (shared) {
      await axios({
        method: 'delete',
        url: `/api/shared/${shared._id}`
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      this.getShareds()
    },
    handleCurrentChange (page) {
      this.$router.push(`/shared/list/${page}`)
    },
    async getShareds () {
      const res = await axios.get('/api/shared/list', {
        params: {
          pageSize: 8,
          currentPage: this.$route.params.page
        }
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      this.shareds = res.data.result.list
      this.pagination = res.data.result.pagination
    },
    async edit () {
      const res = await axios({
        method: 'patch',
        url: `/api/shared/${this.form._id}`,
        data: {
          ...this.form
        }
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      if (res) {
        this.handleClose()
        this.getShareds()
      }
    },
    async create () {
      const res = await axios({
        method: 'post',
        url: '/api/shared/create',
        data: {
          ...this.form
        }
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      if (res) {
        this.handleClose()
        this.getShareds()
      }
    },
  },
  mounted () {
    this.getShareds()
  },
  components: {
    Layout
  }
}
</script>

<style lang="scss">
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
