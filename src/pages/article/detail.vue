<template>
  <layout>
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-input v-model="form.thumb"></el-input>
        </el-form-item>
        <el-form-item label="">
          <img v-if="form.thumb" :src="form.thumb" class="pic">
        </el-form-item>
        <el-form-item label="分类" size="mini">
          <el-radio-group v-model="form.category">
            <el-radio border :label="category.value" v-for="category in categories" :key="category.value">{{category.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签" v-show="form.category" size="mini">
          <el-checkbox-group v-model="form.tag">
            <el-checkbox border v-for="tag in tags" :key="tag._id" :label="tag._id" name="type">{{tag.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态" size="mini">
          <el-radio-group v-model="form.state">
            <el-radio border label="draft">草稿</el-radio>
            <el-radio border label="published">发布</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容">
          <el-input disabled type="textarea" v-model="form.content" @click.native="openEditor"></el-input>
        </el-form-item>
        <el-form-item label="样式">
          <el-input v-model="form.style" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="脚本">
          <el-input v-model="form.script" type="textarea"></el-input>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="create" v-if="!isEdit">立即创建</el-button>
          <el-button type="primary" @click="edit" v-if="isEdit">立即更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </layout>
</template>

<script>
import Layout from '@/components/layout'
import Stackedit from 'stackedit-js'
import { mapGetters } from 'vuex'
import axios from 'axios'
import debounce from 'lodash/debounce'

export default {
  name: 'article-detail',
  computed: {
    isEdit () {
      return this.$route.params._id !== 'new'
    },
    ...mapGetters([
      'categories'
    ])
  },
  watch: {
    'form.category': function (newValue, oldValue) {
      if (oldValue) {
        this.form.tag = []
      }
      this.getTags()
    }
  },
  data () {
    return {
      tags: [],
      form: {
        title: '',
        description: '',
        thumb: '',
        category: '',
        tag: [],
        state: 'draft',
        content: '',
        style: '',
        script: ''
      }
    }
  },
  methods: {
    async edit () {
      const res = await axios({
        method: 'patch',
        url: `/api/article/${this.$route.params._id}`,
        data: {
          title: this.form.title,
          description: this.form.description,
          thumb: this.form.thumb,
          category: this.form.category,
          tag: this.form.tag,
          state: this.form.state,
          content: this.form.content,
          style: this.form.style,
          script: this.form.script
        }
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      if (res) {
        this.$router.replace('/article/list')
      }
    },
    async create () {
      const res = await axios({
        method: 'post',
        url: '/api/article/create',
        data: {
          title: this.form.title,
          description: this.form.description,
          thumb: this.form.thumb,
          category: this.form.category,
          tag: this.form.tag,
          state: this.form.state,
          content: this.form.content,
          style: this.form.style,
          script: this.form.script
        }
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      if (res) {
        this.$router.replace('/article/list')
      }
    },
    getTags: debounce(async function () {
      const res = await axios.get('/api/tag/list', {
        params: {
          category: this.form.category,
          pageSize: 99999
        }
      })
        .catch(err => {
          this.$message.error(err.response.data)
        })

      this.tags = res.data.result.list
    }, 500),
    openEditor () {
      if (!this.form.title) {
        this.$message.warning('请输入标题')
        return
      }

      if (!this.stackedit) {
        this.stackedit = new Stackedit()

        this.stackedit.on('fileChange', file => {
          this.form.content = file.content.text
        })
      }

      this.stackedit.openFile({
        name: this.title,
        content: {
          text: this.form.content
        }
      })
    },
    async getArticle () {
      const res = await axios.get(`/api/article/admin/${this.$route.params._id}`)
        .catch(err => {
          this.$message.error(err.response.data)
        })

      const {
        title,
        description,
        thumb,
        category,
        tag,
        state,
        content,
        style,
        script
      } = res.data.result

      this.form.title = title
      this.form.description = description
      this.form.thumb = thumb
      this.form.category = category
      this.form.tag = tag.map(item => item._id)
      this.form.state = state
      this.form.content = content
      this.form.style = style
      this.form.script = script
    }
  },
  mounted () {
    if (this.isEdit) {
      this.getArticle()
    }
  },
  components: {
    Layout
  }
}
</script>

<style lang="scss">
.pic {
  width: 178px;
  height: 178px;
  display: inline-block;
  object-fit: contain;
}
</style>
