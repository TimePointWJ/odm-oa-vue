<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="container">
        <span>已选中{{multipleSelection.length}}个文件/文件夹</span>
        <!--<el-upload class="upload-demo" ref="upload" action="123" :file-list="fileList" :auto-upload="true" :on-success="uploadSuccess"
          :limit="5" :on-change="uploadChange" :on-exceed="handleExceed" :before-upload="beforUpload">
          <el-input v-model="fatherFolderName" style="width: 250px;" placeholder="输入文件夹名称选择文件自动上传"></el-input>
          </el-upload>-->
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
          <span style="margin-left: 10px">{{ scope.row.fileSize}}</span>
        </template>
      </el-table-column>
      <el-table-column label="格式" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fileExtendName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="crDate" label="创建时间">
      </el-table-column>
      <el-table-column prop="id" align="center" label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="downloadInstance(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40, 50]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
    </div>
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
      }
    },
    created() {
      this.fetchData();
      this.showOriginDirInstance();
    },
    methods: {
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

        folderList(this.listQuery).then(response => {
          console.log("response")
          console.log(response)
          this.listLoading = false;
          const data = response.data.responseData;
          this.list = data.list;
          this.totalCount = data.total;
          console.log(this.listQuery.name)
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