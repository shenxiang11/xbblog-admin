<template>
  <layout>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card class="box-card">
          <el-form label-position="top" ref="form" :model="form" label-width="80px" size="mini">
            <el-form-item label="标签名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="标签描述">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="所属分类">
              <el-radio-group v-model="form.category">
                <el-radio border :label="category.value" v-for="category in categories" :key="category.value">{{category.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-if="!editId" @click="create">新建</el-button>
              <el-button type="primary" v-if="editId" @click="update">更新</el-button>
              <el-button @click="exitEdit" v-if="editId">返回新建</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card">
          <el-table
            :data="tags"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="标签名称"
              width="120">
            </el-table-column>
            <el-table-column
              label="所属分类"
              width="120">
              <template slot-scope="scope">
                {{scope.row.category | category}}
              </template>
            </el-table-column>
            <el-table-column
              prop="description"
              label="标签描述">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteTag(scope.row)">删除</el-button>
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
      </el-col>
    </el-row>
  </layout>
</template>

<script>
import Layout from '@/components/layout'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'tag-list',
  computed: {
    ...mapGetters([
      'categories'
    ])
  },
  data () {
    return {
      editId: '',
      form: {
        name: '',
        description: '',
        category: ''
      },
      pagination: {},
      tags: []
    }
  },
  methods: {
    async deleteTag (tag) {
      this.exitEdit()

      await axios({
        method: 'delete',
        url: `/api/tag/${tag._id}`
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      this.getTags()
    },
    async update () {
      await axios({
        method: 'patch',
        url: `/api/tag/${this.editId}`,
        data: {
          name: this.form.name,
          description: this.form.description,
          category: this.form.category
        }
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      this.exitEdit()
      this.getTags()
    },
    async create () {
      await axios({
        method: 'post',
        url: '/api/tag/create',
        data: {
          name: this.form.name,
          description: this.form.description,
          category: this.form.category
        }
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      this.getTags()
    },
    exitEdit () {
      this.editId = ''
      this.form.name = ''
      this.form.description = ''
      this.form.category = ''
    },
    toEdit (tag) {
      this.editId = tag._id
      this.form.name = tag.name
      this.form.description = tag.description
      this.form.category = tag.category
    },
    handleCurrentChange (page) {
      this.$router.push(`/tag/list/${page}`)
    },
    async getTags () {
      const res = await axios.get('/api/tag/list', {
        params: {
          pageSize: 8,
          currentPage: this.$route.params.page
        }
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      this.tags = res.data.result.list
      this.pagination = res.data.result.pagination
    }
  },
  mounted () {
    this.getTags()
  },
  components: {
    Layout
  }
}
</script>

<style lang="scss">
</style>
