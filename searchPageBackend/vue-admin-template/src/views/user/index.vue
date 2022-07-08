<template>
  <div>
    <el-table
        ref="multipleTable"
        :data="userList"
        stripe
        height="670"
        max-height="670"
        @selection-change="handleSelectionChange"
        style="width: 100%">
      <el-table-column
          type="expand">
        <template slot-scope="scope">
          <el-form label-position="left">
            <el-form-item label="blankOrSelf">
              <span>{{ scope.row.blankOrSelf }}</span>
            </el-form-item>
            <el-form-item label="deleteAt">
              <span>{{ scope.row.deleteAt }}</span>
            </el-form-item>
            <el-form-item label="engine">
              <span>{{ scope.row.engine }}</span>
            </el-form-item>
            <el-form-item label="engineSort">
              <span>{{ scope.row.engineSort }}</span>
            </el-form-item>
            <el-form-item label="id">
              <span>{{ scope.row.id }}</span>
            </el-form-item>
            <el-form-item label="navigation">
              <span>{{ scope.row.navigation }}</span>
            </el-form-item>
            <el-form-item label="navigationSort">
              <span>{{ scope.row.navigationSort }}</span>
            </el-form-item>
            <el-form-item label="searchHistory">
              <span>{{ scope.row.searchHistory }}</span>
            </el-form-item>
            <el-form-item label="switchWallpaper">
              <span>{{ scope.row.switchWallpaper }}</span>
            </el-form-item>
            <el-form-item label="vague">
              <span>{{ scope.row.vague }}</span>
            </el-form-item>
            <el-form-item label="updateAt">
              <span>{{ scope.row.updateAt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="头像"
          width="100">
        <template slot-scope="scope">
          <img :src="scope.row.headLogo" style="width:30px;height: 30px">
        </template>
      </el-table-column>
      <el-table-column
          prop="nickname"
          label="昵称"
          width="150">
      </el-table-column>
      <el-table-column
          label="性别"
          width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.gender == 0 ? '男' : (scope.row.gender == 1 ? '女' : '保密') }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="passport"
          label="账户"
          width="150">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="150">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="200">
      </el-table-column>
      <el-table-column
          prop="createAt"
          label="创建时间"
          width="150">
      </el-table-column>
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column v-if="showButton" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              :disabled="showRemove(scope.row.id)"
          >编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click.native.prevent="deleteRow(scope.row.id, scope.$index, userList)"
              :disabled="showRemove(scope.row.id)">移除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column v-else>
        <template slot="header" slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click.native.prevent="deleteSelectedRow(userList)">移除选中
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination">
      <el-pagination
          :page-size="10"
          layout="prev, pager, next, jumper"
          background
          @current-change="handleCurrentChange"
          :total="total">
      </el-pagination>
    </div>

    <template>
      <el-dialog title="修改用户基本信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input v-model="form.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-switch
                v-if="form.gender !== 2"
                v-model="switchValue"
                active-text="男"
                inactive-text="女">
            </el-switch>
            <span v-else>保密</span>
          </el-form-item>
          <el-form-item label="账户" :label-width="formLabelWidth">
            <el-input v-model="form.passport" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmModify">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'User',
  data() {
    return {
      payload: {
        PageNum: 1,
        PageSize: 10
      },
      multipleSelection: [], // 存储多选的内容
      idListPayload: [],
      selectSingleId: -1,
      dialogFormVisible: false,
      form: {
        gender: true
      },
      formLabelWidth: '120px',
      switchValue: true,
    }
  },
  computed: {
    ...mapState('user', ['userList', 'total']),
    showButton() {
      return this.multipleSelection.length > 1 ? false : true
    }
  },
  mounted() {
    this.$store.dispatch('user/getUserList', this.payload)
  },
  methods: {
    handleCurrentChange($val) {
      const newPaylaod = {
        PageNum: $val,
        PageSize: 10
      }
      this.$store.dispatch('user/getUserList', newPaylaod)
    },
    handleEdit(userInfo) {
      this.form = userInfo

      this.switchValue = userInfo.gender == 0 ? true : false

      this.dialogFormVisible = true
    },
    deleteRow(id, index, rows) {
      rows.splice(index, 1); // 前端视觉上操作数据源进行删除
      // 实际调用后台接口，进行单个删除
      const payload = {
        "IdList": [id]
      }
      this.$store.dispatch('user/deleteUserList', payload)
    },
    deleteSelectedRow(userList) {
      // 必须要操作内置的userList，进行前端视觉上的删除
      userList.splice(0, userList.length)
      this.$store.dispatch('user/deleteUserList', this.idListPayload)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val

      if (val.length == 1) {
        this.selectSingleId = val[0].id
      } else {
        this.selectSingleId = -1
      }
      // console.log(this.multipleSelection)
      const arr = []
      // 拿到选中元素的id
      val.forEach(item => {
        const {id} = item
        arr.push(id)
      })
      this.idListPayload = {
        "IdList": arr
      }
    },
    showRemove(id) {
      return (id !== this.selectSingleId) ? true : false
    },
    confirmModify() {
      this.form.gender = this.switchValue == true ? 0 : 1

      const payload = this.form
      console.log(payload)

      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  width: 340px;

  margin: 0 auto;
}
</style>

