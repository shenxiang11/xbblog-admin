<template>
  <layout>
    <el-card class="box-card">
      <el-table
        :data="articles"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
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
          label="标签"
          width="220">
          <template slot-scope="scope">
            <el-tag size="mini" v-for="tag in scope.row.tag" :key="tag._id">{{tag.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120">
          <template slot-scope="scope">
            {{scope.row.state}}
          </template>
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
  </layout>
</template>

<script>
import Layout from '@/components/layout'
import axios from 'axios'

export default {
  name: 'article-list',
  data () {
    return {
      pagination: {},
      articles: []
    }
  },
  methods: {
    toEdit (article) {
      this.$router.push(`/article/${article._id}`)
    },
    async deleteTag (tag) {
      await axios({
        method: 'delete',
        url: `/api/article/${tag._id}`
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      this.getArticles()
    },
    handleCurrentChange (page) {
      this.$router.push(`/article/list/${page}`)
    },
    async getArticles () {
      const res = await axios.get('/api/article/list/admin', {
        params: {
          pageSize: 8,
          currentPage: this.$route.params.page
        }
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      this.articles = res.data.result.list
      this.pagination = res.data.result.pagination
    }
  },
  mounted () {
    this.getArticles()
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
