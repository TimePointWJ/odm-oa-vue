<template>
  <div class="app-container">

    <el-tag style="margin-bottom:20px;">
      <a href="https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable" target="_blank">Documentation</a>
    </el-tag>

    <tree-table :data="data" :columns="columns" border></tree-table>

  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'

export default {
  name: 'treeTableDemo',
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: '文件名',
          value: 'name',
          width: 200
        },
        {
          text: '大小',
          value: 'filesize'
        },
        {
          text: '格式',
          value: 'fileextendname'
        },
        {
          text: '创建时间',
          value: 'crdate'
        }
      ],
      data: [
        {
          filesize: 0,
          name: '事件1',
          fileextendname: 50,
          crdate: '无'
        },
        {
          filesize: 1,
          name: '事件1',
          fileextendname: 100,
          crdate: '无',
          children: [
            {
              filesize: 2,
              name: '事件2',
              fileextendname: 10,
              crdate: '无'
            },
            {
              filesize: 3,
              name: '事件3',
              fileextendname: 90,
              crdate: '无',
              children: [
                {
                  filesize: 4,
                  name: '事件4',
                  fileextendname: 5,
                  crdate: '无'
                },
                {
                  filesize: 5,
                  name: '事件5',
                  fileextendname: 10,
                  crdate: '无'
                },
                {
                  filesize: 6,
                  name: '事件6',
                  fileextendname: 75,
                  crdate: '无',
                  children: [
                    {
                      filesize: 7,
                      name: '事件7',
                      fileextendname: 50,
                      crdate: '无',
                      children: [
                        {
                          filesize: 71,
                          name: '事件71',
                          fileextendname: 25,
                          crdate: 'xx'
                        },
                        {
                          filesize: 72,
                          name: '事件72',
                          fileextendname: 5,
                          crdate: 'xx'
                        },
                        {
                          filesize: 73,
                          name: '事件73',
                          fileextendname: 20,
                          crdate: 'xx'
                        }
                      ]
                    },
                    {
                      filesize: 8,
                      name: '事件8',
                      fileextendname: 25,
                      crdate: '无'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
