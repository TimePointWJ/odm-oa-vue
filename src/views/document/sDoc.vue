<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="container">
        <span>已选中{{multipleSelection.length}}个文件/文件夹</span>
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
  import { showShareOriginDir, findShareCFolder,findCFile } from '@/api/document/eDoc'
  //数据模板
  const folderTemp = {
    name: null,
    folderType: "share",
    delFlg: null,
    pFolderName: null
  };
  const noticeTemp = {
    fileUrl: []
  };
  export default {
    data() {
      return {
        multipleSelection: [],
        list: null,
        totalCount: 10,
        pagesize: 10,
        currentPage: 1,
        listLoading: true,
        listQuery: {
          folderType: "share",
          remark: "pretendShare",
          pageNum: 1,
          pageSize: 10
        },
      }
    },
    created() {
      this.showOriginDirInstance();
    },
    methods: {
      showOriginDirInstance() {
        this.listQuery.pageNum = this.currentPage
        this.listQuery.pageSize = this.pagesize
        //debugger
        showShareOriginDir(this.listQuery).then(response => {
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
        this.showOriginDirInstance();
      },

      //页码变更
      handleCurrentChange(val) {
        this.currentPage = val;
        this.showOriginDirInstance();
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
          findShareCFolder(ff).then(response => {
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
    }
  }

</script>