<template>
    <div class="app-container">
        <!-- 查询条件和按钮 -->
        <div class="filter-container">
            <el-button @click="addDept" style="height: 36px;width: 100px;background-color: #12b8f6;border:none;color: #FFF;">添加部门</el-button>
        </div>
        <div class="filter-container" style="border: solid #999 1px;height: auto;width: 1000px;">
            <!-- 部门列表 -->
            <el-table :data="list" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <span v-for="user in props.row.users">
                                <el-form-item label="姓名">
                                    <span style="cursor:pointer;color:#1d90e6;" @click="clickUserName(user)">{{ user.userRealName }}</span>
                                </el-form-item>
                                <el-form-item label="工号">
                                    <span>{{ user.jobNum }}</span>
                                </el-form-item>
                                <el-form-item label="手机号">
                                    <span>{{ user.mobphone }}</span>
                                </el-form-item><br />
                            </span>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="部门名称" prop="depeName"></el-table-column>
                <el-table-column label="部门经理" prop="branchLeader"></el-table-column>
                <el-table-column prop="deptCode" align="center" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="updateDept(scope.row)">修改</el-button>
                        <el-button size="small" type="danger" @click="deleteDept(scope.row.deptCode)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div align="center">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40,2]"
                    :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
            <!-- 添加新部门dialog -->
            <el-dialog  v-el-drag-dialog title="添加部门" :visible.sync="addDeptDialog" :before-close="addDeptDialogClose">
                <el-form :model="addDeptForm" :rules="deptFormRules" ref="addDeptForm" label-width="15%" size="30%">
                    <el-form-item label="部门名称" prop="depeName">
                        <el-input v-model="addDeptForm.depeName" placeholder="请输入部门名称" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-form-item label="部门经理" prop="branchLeader">
                        <el-input v-model="addDeptForm.branchLeader" placeholder="请输入部门经理名称" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-form-item label="部门描述" prop="deptDesc">
                        <el-input v-model="addDeptForm.deptDesc" placeholder="请输入部门描述" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-form-item prop="deptRoot" label="父部门">
                        <el-select clearable class="filter-item" v-model="addDeptForm.deptRoot" placeholder="请选择父部门" >
                            <el-option v-for="item in listRoot" :key="item.deptCode" :label="item.depeName" :value="item.deptCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="branchLevel" label="部门级别">
                        <el-select clearable class="filter-item" v-model="addDeptForm.branchLevel" placeholder="请选择部门级别" >
                            <el-option v-for="item in listBranchlevel" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="addDeptForm.remark" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-button style='margin-bottom:20px;margin-left:35%;' type="primary" icon="document" @click="submitaddDeptForm('addDeptForm')">提交</el-button>
                </el-form>
            </el-dialog>
            <!-- 修改部门dialog -->
            <el-dialog  v-el-drag-dialog title="修改部门" :visible.sync="updateDeptDialog" :before-close="updateDeptDialogClose">
                <el-form :model="updateDeptForm" :rules="deptFormRules" ref="updateDeptForm" label-width="15%" size="30%">
                    <el-form-item label="部门名称" prop="depeName">
                        <el-input v-model="updateDeptForm.depeName" placeholder="请输入部门名称" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-form-item label="部门级别" prop="branchLevel">
                        <el-input v-model="updateDeptForm.branchLevel" placeholder="请输入部门级别" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-form-item label="部门经理" prop="branchLeader">
                        <el-input v-model="updateDeptForm.branchLeader" placeholder="请输入部门经理名称" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-form-item label="部门描述" prop="deptDesc">
                        <el-input v-model="updateDeptForm.deptDesc" placeholder="请输入部门描述" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-form-item prop="deptRoot" label="父部门">
                        <el-select clearable class="filter-item" v-model="updateDeptForm.deptRoot" placeholder="请选择父部门" >
                            <el-option v-for="item in listRoot" :key="item.deptCode" :label="item.depeName" :value="item.deptCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="branchLevel" label="部门级别">
                        <el-select clearable class="filter-item" v-model="updateDeptForm.branchLevel" placeholder="请选择部门级别" >
                            <el-option v-for="item in listBranchlevel" :key="item.key" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="updateDeptForm.remark" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-button style='margin-bottom:20px;margin-left:35%;' type="primary" icon="document" @click="submitUpdateDeptForm('updateDeptForm')">提交</el-button>
                </el-form>
            </el-dialog>
            <!-- 修改员工dialog -->
            <el-dialog  v-el-drag-dialog title="修改员工" :visible.sync="updateUserDialog" :before-close="updateUserDialogClose">
                <el-form :model="updateUserForm" :rules="userFormRules" ref="updateUserForm" label-width="15%" size="30%">
                    <el-form-item label="姓名" prop="userRealName">
                            <el-input disabled v-model="updateUserForm.userRealName" placeholder="请输入姓名" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="branchCode">
                        <el-select clearable class="filter-item" v-model="updateUserForm.branchCode" placeholder="请选择部门">
                            <el-option v-for="item in  listBranch" :key="item.deptCode" :label="item.depeName" :value="item.deptCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="员工工号" prop="jobNum">
                        <el-input disabled v-model="updateUserForm.jobNum" placeholder="请输入员工工号" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobphone">
                        <el-input disabled v-model="updateUserForm.mobphone" style='width: 50%;'></el-input>
                    </el-form-item>
                    <el-button style='margin-bottom:20px;margin-left:35%;' type="primary" icon="document" @click="submitUpdateUserForm('updateUserForm')">提交</el-button>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { selectUserById, updateUser } from "@/api/user";
import {
  paginationBranch,
  insertDept,
  updateDept,
  deleteDept
} from "@/api/branch";
// import { dictionaryList, branchList, rootList } from "@/api/common";
import elDragDialog from '@/directive/el-dragDialog'

// 员工数据模板
const userTemp = {
  id: null, // 序号
  branchCode: null, // 所属部门
  userName: null, // 用户名
  userRealName: null, // 用户真实名称
  userPass: null, // 用户密码
  telphone: null, // 座机
  userGw: null, // 员工岗位
  mobphone: null, // 手机号码
  zhiwu: null, // 默认职务
  isUse: null, // 是否可用
  mailbox: null, // 邮箱
  remark: null, // 员工职责
  files: null, // 附件
  userLeader: null, // 直属上级
  nickName: null, // 昵称
  jobNum: null, // 工号
  qq: null, // qq
  weixinnum: null, // 微信
  idCard: null, // 身份证
  nationality: null, // 籍贯
  nation: null, // 民族
  homeAddress: null, // 家庭住址
  gsPhone: null, // 公司电话
  birthday: null, // 生日
  entryDate: null, // 入职时间
  departureDate: null, // 离职时间
  marriage: null, // 婚姻状况
  children: null, // 子女
  jjlxr: null, // 紧急联系人
  jjlxrdh: null, // 紧急联系人电话
  contractSTime: null, // 劳动合同开始时间
  contractETime: null, // 劳动合同结束时间
  zzTime: null, // 转正时间
  hire: null, // 雇佣方式
  sex: null, // 性别
  socialInsurance: null, // 社保号码
  gjjid: null, // 公积金账号
  bankCard: null, // 银行卡
  bankName: null // 银行名称
};
//部门数据模板
const deptTemp = {
  deptCode: null, // 部门id
  depeName: null, // 部门名称
  branchLevel: null, // 部门级别
  deptRoot: null, // 父部门
  branchLeader: null, // 部门经理
  deptDesc: null, // 部门描述
  remark: null // 备注
};
export default {
  name: 'dragDialog-demo',
  directives: { elDragDialog },
  data() {
    return {
      list: null,
      listLoading: true,
      listBranch: [], //部门
      listRoot: [], //父部门
      totalCount: 0,
      pagesize: 10,
      currentPage: 1,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      branchlevelCodeType: '1001200', //部门级别数据字典code
      listBranchlevel: [], // 部们级别
      addDeptDialog: false, //添加部门dialog
      updateDeptDialog: false, //修改部门dialog
      updateUserDialog: false, //修改员工dialog
      addDeptForm: Object.assign({}, deptTemp), //添加部门表单
      updateDeptForm: Object.assign({}, deptTemp), //修改部门表单
      updateUserForm: Object.assign({}, userTemp), //修改员工表单
      deptFormRules: {
        depeName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ] //员工工号
      },
      userFormRules: {}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    /**
     * 初期化
     */
    fetchData() {
      this.listLoading = true;
      this.listQuery.pageNum = this.currentPage;
      this.listQuery.pageSize = this.pagesize;
      paginationBranch(this.listQuery).then(response => {
        const data = response.data.responseData;
        this.list = data.list;
        this.totalCount = data.total;
        this.listLoading = false;
      });
    },
    /**
     * 每页显示数据量变更
     */
    handleSizeChange(val) {
      this.pagesize = val;
      this.fetchData();
    },
    /**
     * 页码变更
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    /**
     * 修改-提交表单
     */
    submitUpdateDeptForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              updateDept(this.updateDeptForm).then(response => {
                this.listLoading = false;
                if (response.data.statusCode == 200) {
                  this.$notify({
                    title: "成功",
                    message: "提交成功",
                    type: "success",
                    duration: 2000
                  });
                  this.updateDeptDialog = false;
                  this.$refs[formName].resetFields();
                  this.fetchData();
                } else {
                  this.$notify({
                    title: "失败",
                    message: response.data.statusMsg,
                    type: "info",
                    duration: 2000
                  });
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消提交"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 添加-提交表单
     */
    submitaddDeptForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认添加", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              insertDept(this.addDeptForm).then(response => {
                this.listLoading = false;
                if (response.data.statusCode == 200) {
                  this.$notify({
                    title: "成功",
                    message: "添加成功",
                    type: "success",
                    duration: 2000
                  });
                  this.addDeptDialog = false;
                  this.$refs[formName].resetFields();
                  this.fetchData();
                } else {
                  this.$notify({
                    title: "失败",
                    message: response.data.statusMsg,
                    type: "info",
                    duration: 2000
                  });
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消添加"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 提交表单-修改员工
     */
    submitUpdateUserForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认提交", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              updateUser(this.updateUserForm).then(response => {
                this.listLoading = false;
                if (response.data.statusCode == 200) {
                  this.$notify({
                    title: "成功",
                    message: "提交成功",
                    type: "success",
                    duration: 2000
                  });
                  this.updateUserDialog = false;
                  this.$refs[formName].resetFields();
                  this.fetchData();
                } else {
                  this.$notify({
                    title: "失败",
                    message: response.data.statusMsg,
                    type: "info",
                    duration: 2000
                  });
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消提交"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 添加部门click事件
     */
    addDept() {
      this.addDeptDialog = true;
    },
    /**
     * 点击修改事件
     */
    updateDept(row) {
      this.updateDeptForm = row;
      this.updateDeptDialog = true;
    },
    /**
     * 点击删除事件
     */
    deleteDept(date) {
      const ids = new Array();
      if (ids.length == 0) {
        ids.push(date);
      }
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDept(ids).then(response => {
            if (response.data.statusCode == 200) {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
              this.fetchData();
            } else {
              this.$notify({
                title: "失败",
                message: "删除失败",
                type: "info",
                duration: 2000
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    /**
     * 点击员工姓名
     */
    clickUserName(user) {
      this.updateUserForm = user;
      this.updateUserDialog = true;
    },
    /**
     * 添加部门dialog关闭
     */
    addDeptDialogClose() {
      this.addDeptDialog = false;
      this.$refs["addDeptForm"].resetFields();
    },
    /**
     * 修改部门dialog关闭
     */
    updateDeptDialogClose() {
      this.updateDeptDialog = false;
      this.$refs["updateDeptForm"].resetFields();
    },
    /**
     * 修改员工dialog关闭
     */
    updateUserDialogClose() {
      this.updateUserDialog = false;
    }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 23%;
}
</style>
