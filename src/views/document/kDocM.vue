<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="container">
        <span>已选中{{multipleSelection.length}}个文件/文件夹</span>
        <!--<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
          <el-button type="success" round style="margin-left: 6px;" icon="el-icon-upload2">上传文件</el-button>
        </el-upload>-->
        <!--<el-upload class="upload-demo" ref="upload" :action="uploadUrl" :file-list="fileList" :auto-upload="false" :on-success="uploadSuccess"
          :limit="5" :on-change="uploadChange" :on-exceed="handleExceed" :before-upload="beforUpload" drag>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">上传的文件不超过10M</div>
          </el-upload>-->
        <el-upload class="upload-demo" ref="upload" action="123" :file-list="fileList" :auto-upload="true" :on-success="uploadSuccess"
          :limit="5" :on-change="uploadChange" :on-exceed="handleExceed" :before-upload="beforUpload">
          <el-input v-model="fatherFolderName" style="width: 250px;" placeholder="输入文件夹名称选择文件自动上传"></el-input>
          <!--<el-button size="small" type="primary">上传附件</el-button>-->
          </el-upload>
          <el-button type="primary" style="margin-left: 6px;" icon="el-icon-document" @click="createFolder">新建文件夹</el-button>
          <!--<el-button type="primary" style="margin-left: 6px;" icon="el-icon-download" @click="downloadInstance">下载</el-button>-->
          <!--<el-button type="primary" style="margin-left: 6px;" icon="el-icon-rank">移动</el-button>-->
          <!--<el-button type="primary" style="margin-left: 6px;" icon="el-icon-share">分享</el-button>-->
          <!--<el-input v-model="input" style="width: 6px;" placeholder="请输入内容"></el-input>
                <el-button type="primary" style="margin-right: 6px;" icon="el-icon-search">搜索</el-button>-->
          <el-tooltip class="item" effect="light" content="搜索文件夹" placement="top">
            <el-input @keyup.enter.native="fetchData" style="width: 200px;" class="filter-item" placeholder="文件名搜索" v-model="listQuery.name"
            />
          </el-tooltip>
          <el-button class="filter-item" type="primary" style="margin-left: 6px;" icon="el-icon-search" @click="fetchData">搜索</el-button>
          <el-button class="filter-item" type="primary" style="margin-left: 6px;" icon="el-icon-search" @click="showOriginDirInstance">根目录</el-button>
      </div>
    </div>
    <el-table :data="list" style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="文件名" width="500">
        <template slot-scope="scope">
          <el-button @click="findCFolderAndFileInstance(scope.row)"><i v-if="typeof scope.row.totalTime =='undefined'" class="el-icon-news"></i>
            <i v-else class="el-icon-document"></i></el-button>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大小" width="220">
        <template slot-scope="scope">
          <!--<span v-if="scope.row.totaltime == undefined" style="margin-left: 10px">{{ scope.row.folderSpace }}</span>
          <span v-else style="margin-left: 10px">{{ scope.row.fileSize }}</span>-->
          <span style="margin-left: 10px">{{ scope.row.fileSize}}</span>
        </template>
      </el-table-column>
      <el-table-column label="格式" width="180">
        <template slot-scope="scope">
          <!--<span v-if="scope.row.totaltime == undefined" style="margin-left: 10px">{{ scope.row.folderType }}</span>
          <span v-else style="margin-left: 10px">{{ scope.row.fileExtendName }}</span>-->
          <span style="margin-left: 10px">{{ scope.row.fileExtendName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="crDate" label="创建时间">
      </el-table-column>
      <el-table-column prop="id" align="center" label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="updateFolder(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="deleteFolderOrFileInstance(scope.row)">删除</el-button>
          <el-button size="small" type="success" @click="downloadInstance(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40, 50]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
    </div>
    <!--
                新建文件夹dialog
            -->
    <el-dialog title="新建文件夹" :visible.sync="createFolderDialog" :before-close="createFolderDialogClose">
      <!--新建文件夹表单-->
      <el-form :model="createFolderForm" :rules="folderRules" ref="createFolderForm" label-width="15%" size="30%">
        <el-form-item label="文件夹名称" prop="name">
          <el-input v-model="createFolderForm.name" placeholder="请输入新建文件夹名称" style='width: 50%;'></el-input>
        </el-form-item>
        <el-form-item label="文件夹类型" prop="folderType" v-show = "false">
          <el-input v-model="createFolderForm.folderType"  style='width: 50%;'></el-input>
        </el-form-item>
        <el-form-item label="父文件夹名称" prop="pFolderName">
          <el-input v-model="createFolderForm.pFolderName" placeholder="请输入父文件夹名称" style='width: 50%;'></el-input>
        </el-form-item>
        <el-button style='margin-bottom:20px;margin-left:35%;' type="primary" icon="document" @click="submitcreateFolderForm('createFolderForm')">提交</el-button>
      </el-form>
    </el-dialog>
    <!--
                修改文件夹dialog
            -->
    <el-dialog title="修改文件夹" :visible.sync="updateFolderDialog" :before-close="updateFolderDialogClose">
      <!--新建文件夹表单-->
      <el-form :model="updateFolderForm" :rules="folderRules" ref="updateFolderForm" label-width="15%" size="30%">
        <el-form-item label="文件夹名称" prop="name">
          <el-input v-model="updateFolderForm.name" placeholder="请输入新建文件夹名称" style='width: 50%;'></el-input>
        </el-form-item>
        <!--<el-form-item label="父文件夹id" prop="pFolderId">
          <el-input v-model="updateFolderForm.pFolderId" placeholder="请输入父文件夹id" style='width: 50%;'></el-input>
        </el-form-item>
        <el-form-item label="逻辑删除标志" prop="delFlg">
          <el-input v-model="updateFolderForm.delFlg" placeholder="逻辑删除标志" style='width: 50%;'></el-input>
        </el-form-item>-->
        <el-button style='margin-bottom:20px;margin-left:35%;' type="primary" icon="document" @click="submitupdateFolderForm('updateFolderForm')">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  /* eslint-disable */
  import Tinymce from "@/components/Tinymce";
  import MdInput from "@/components/MDinput";
  import { getToken } from "@/utils/auth";
  import { folderList, findCFolder, createFolder, showOriginDir, findCFile, updateFolder, newVideo } from '@/api/document/eDoc'
  import { deleteFolder, deleteFile } from '@/api/document/eDoc'
  import { download } from '@/api/document/eDoc'
  //数据模板
  const folderTemp = {
    name: null,
    folderType: "company",
    delFlg: null,
    pFolderName: null
  };
  const noticeTemp = {
    fileUrl: []
  };
  export default {
    name: "tinymce-demo",
    components: {
      Tinymce, MdInput
    },
    data() {
      var validateNum = (rule, value, callback) => {
        if (!/^[0-9]*$/.test(value)) {
          callback(new Error("输入不合法"));
        } else {
          callback();
        }
      };
      return {
        // uploadUrl:
        // "http://localhost:8200/service/doc/upload?token=" + this.getToken(),
        downloadUrl: "http://localhost:8200/service/doc/download?token=" + this.getToken(),
        fileList: [],
        fileLength: 0,
        fatherFolderName: null,
        multipleSelection: [],
        list: null,
        totalCount: 10,
        pagesize: 10,
        currentPage: 1,
        listLoading: true,
        listQuery: {
          folderType: "company",
          pageNum: 1,
          pageSize: 10
        },
        createFolderDialog: false, //新建文件夹dialog
        createFolderForm: Object.assign({}, folderTemp), //需要新建的文件夹表单属性
        updateFolderDialog: false, //修改文件夹dialog
        updateFolderForm: Object.assign({}, folderTemp), //需要修改的文件夹表单属性
        //表单验证
        folderRules: {
          name: [
            { required: false, message: "请输入新建文件夹名称", trigger: "blur" }
          ], //新建文件夹名称
          folderType: [
            { required: false, message: "请填入父文件夹id", trigger: "change" }
          ], //父文件夹id
          delFlg: [
            { required: false, message: "输入数量", trigger: "change" }
            //{ validator: validateNum, trigger: "blur" }
          ], //商品数量
          pFolderName: [
            { required: false, message: "请填入父文件夹名称", trigger: "change" }
          ] //父文件夹name
        },
      }
    },
    created() {
      this.fetchData();
      this.showOriginDirInstance();
    },
    methods: {
      // uploadUrl() {
      //   var url = "http://localhost:8200/service/doc/upload?token=" + this.getToken() + "&fatherFolderName=" + this.fatherFolderName;
      //   return url;
      // },
      test() {
        if (this.fileLength > 0) {
          this.$refs.upload.clearFiles();
        }
      },
      fetchData() {
        //页面初期加载
        this.listLoading = true
        this.listQuery.pageNum = this.currentPage
        this.listQuery.pageSize = this.pagesize
        console.log(this.listQuery.name)
        //console.log(this.listQuery.folderType)

        folderList(this.listQuery).then(response => {
          console.log("response")
          console.log(response)
          this.listLoading = false;
          const data = response.data.responseData;
          this.list = data.list;
          this.totalCount = data.total;
          console.log(this.listQuery.name)
          // console.log(this.pageNum)
          //console.log(data)   
          //console.log(listQuery.pageNum)
          //console.log(data.list)
        });
      },
      showOriginDirInstance() {
        this.listQuery.pageNum = this.currentPage
        this.listQuery.pageSize = this.pagesize
        //debugger
        showOriginDir(this.listQuery).then(response => {
          const data = response.data.responseData;
          this.list = data.list;
          this.totalCount = data.total;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleEdit(index, row) {
        // eslint-disable-next-line
        console.log(index, row);
      },
      handleDelete(index, row) {
        // eslint-disable-next-line
        console.log(index, row);
      },
      //每页显示数据量变更
      handleSizeChange(val) {
        this.pagesize = val;
        this.fetchData();
      },

      //页码变更
      handleCurrentChange(val) {
        this.currentPage = val;
        this.fetchData();
      },
      findCFolderInstance(id) {
        //debugger
        var ff = { 'id': id }
        findCFolder(ff).then(response => {
          const data = response.data.responseData;
          this.list = data.list;
          this.totalCount = data.total;
          // console.log(id);
          console.log("----------------------------");
          console.log(data);
        })
      },
      findCFileInstance(id) {
        //debugger
        var ff = { 'id': id }
        findCFile(ff).then(response => {
          const data = response.data.responseData;
          this.list = data.list;
          this.totalCount = data.total;
          // console.log(id);
          console.log("----------------------------");
          console.log(data);
        })
      },
      //搜索所有的子文件和子文件夹
      findCFolderAndFileInstance(row) {
        var ff = { 'id': row.id }
        //debugger
        if (typeof row.totalTime != "undefined") {
          //判断 如果是文件，不进行操作，并提示
          alert("这是一个文件呀");
          return
        }
        else {
          findCFolder(ff).then(response => {
            const data = response.data.responseData;
            this.list = data.list;
            this.totalCount = data.total;
            findCFile(ff).then(response => {
              const data = response.data.responseData;
              this.list1 = data.list;
              this.totalCount = data.total;
              this.list = this.list.concat(this.list1);
              console.log(this.list, "122222222");
            })
          })
        }
      },

      // 提交新建文件夹表单
      submitcreateFolderForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("确认添加", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                createFolder(this.createFolderForm).then(response => {
                  this.listLoading = false;
                  if (response.data.statusCode == 200) {
                    this.$notify({
                      title: "成功",
                      message: "添加成功",
                      type: "success",
                      duration: 2000
                    });
                    this.createFolderDialog = false;
                    this.$refs[formName].resetFields();
                    //this.fetchData();
                    this.showOriginDirInstance();
                    console.log(response, "1231231231231");
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
    * 添加dialog关闭事件
    */
      createFolderDialogClose(done) {
        this.createFolderDialog = false;
        this.$refs["createFolderForm"].resetFields();
      },
      createFolder() {
        //给能赋默认值的先赋上
        //this.createFolderForm.saleFlg = "1";
        this.createFolderDialog = true;
      },
      // 提交修改文件夹表单
      submitupdateFolderForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$confirm("确认添加", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                updateFolder(this.updateFolderForm).then(response => {
                  this.listLoading = false;
                  if (response.data.statusCode == 200) {
                    this.$notify({
                      title: "成功",
                      message: "修改成功",
                      type: "success",
                      duration: 2000
                    });
                    this.updateFolderDialog = false;
                    this.$refs[formName].resetFields();
                    //this.fetchData();
                    this.showOriginDirInstance();
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
                  message: "取消修改"
                });
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      /**
    * 更新dialog关闭事件
    */
      updateFolderDialogClose(done) {
        this.updateFolderDialog = false;
        this.$refs["updateFolderForm"].resetFields();
      },
      /**
      * 点击更新按钮事件
      */
      updateFolder(row) {
        this.updateFolderForm = row;
        this.updateFolderDialog = true;
        console.log(this.updateFolderForm)
      },
      //删除文件夹
      deleteFolderOrFileInstance(row) {
        var ff = { 'id': row.id }
        // const ids = new Array();
        // this.multipleSelection.forEach(function (item) {
        //   ids.push(item.id);
        // });
        // if (ids.length == 0) {
        //   ids.push(row.id);
        // }
        this.$confirm("确认删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (typeof row.totalTime != "undefined") {
              deleteFile(ff).then(response => {
                if (response.data.statusCode == 200) {
                  this.$notify({
                    title: "成功",
                    message: "删除成功",
                    type: "success",
                    duration: 2000
                  });
                  // this.fetchData();
                  this.showOriginDirInstance();
                } else {
                  this.$notify({
                    title: "失败",
                    message: "删除失败",
                    type: "info",
                    duration: 2000
                  });
                }
              });
              //判断 如果是文件，进行删除文件的操作
            }
            else {
              //如果是文件夹，删除文件夹操作
              deleteFolder(ff).then(response => {
                if (response.data.statusCode == 200) {
                  this.$notify({
                    title: "成功",
                    message: "删除成功",
                    type: "success",
                    duration: 2000
                  });
                  // this.fetchData();
                  this.showOriginDirInstance();
                } else {
                  this.$notify({
                    title: "失败",
                    message: "删除失败",
                    type: "info",
                    duration: 2000
                  });
                }
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除"
            });
          });
      },
      //删除文件夹
      deleteFolder(data) {
        const ids = new Array();
        this.multipleSelection.forEach(function (item) {
          ids.push(item.id);
        });
        if (ids.length == 0) {
          ids.push(data);
        }
        this.$confirm("确认删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteFolder(ids).then(response => {
              if (response.data.statusCode == 200) {
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                  duration: 2000
                });
                // this.fetchData();
                this.showOriginDirInstance();
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
      //上传文件
      getToken() {
        return getToken();
      },
      uploadChange(file, fileList, fatherFolderName) {
        console.log(file.size)
        console.log(fatherFolderName)
        if (file.size > this.uploadLimit) {
          this.$message({
            type: "error",
            message: "上传文件大小超过" + this.uploadLimit / 1024 / 1024 + "MB!"
          });
          this.$refs.upload.clearFiles();
        }
        this.fileLength = file.length;
      },
      handleExceed() {
        this.$message.error("只能选择五个文件!");
      },
      beforUpload(file, fatherFolderName) {
        console.log(file.size);
        console.log(fatherFolderName);
        if (file.size > this.uploadLimit) {
          // this.$refs.upload.abort(file)
          this.$message({
            type: "error",
            message: "上传文件大小超过" + this.uploadLimit / 1024 / 1024 + "MB!"
          });
          //this.beyondLimit = true;
          return false;
        } else {
          //this.beyondLimit = false;
        }
        let fd = new FormData()
        fd.append('file', file)
        fd.append('fatherFolderName', this.fatherFolderName)
        // console.log(fd)
        newVideo(fd).then(res => {
          console.log(res)
        })
        return true
      },
      uploadSuccess(response) {
      },
      // newSubmitForm() {
      //   this.$refs.newupload.submit()
      // },
      // downloadInstance(row){
      //   var ff = { 'id': row.id }
      //   download(ff).then(response => {
      //     const data = response.data.responseData;
      //     // console.log(id);
      //     console.log("----------------------------");
      //     console.log(data);
      //   })
      // }
      downloadInstance(row) {
        var downloadUrl = "http://localhost:8200/service/doc/download?token=" + this.getToken()+ "&id=" + row.id ; 
	        var inputValue1 = 'xxxx'; 
	        var form = $('<form></form>');       
	        form.attr('style', 'display:none');        
	        form.attr('target', '_blank');      //设置_blank后，下载会在新窗口打开，同时保留原来的窗口   
	        form.attr('method', 'post');       
	        form.attr('action', downloadUrl);
	        var input = $('<input type="text" name="XXX" id="param1" />'); // 可以使用input来提交数据             
	        input.attr('value', inputValue1);  //在input中放入需要传入的数据
	        form.append(input);   
	        $(document.body).append(form);  
	        form.submit(); 
      }
    }
  }

</script>