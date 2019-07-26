<template>
  <div class="home">
    <div>
      <a-row>
        <a-col :span="14">菜鸟驿站</a-col>
        <a-col :span="2">
          <a-button @click="loadAllPackages()">All</a-button>
        </a-col>
        <a-col :span="2">
          <a-button @click="filterByStatus(1)">已预约</a-button>
        </a-col>
        <a-col :span="2">
          <a-button @click="filterByStatus(2)">已取件</a-button>
        </a-col>
        <a-col :span="2">
          <a-button @click="filterByStatus(0)">未预约</a-button>
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="showModal">+添加</a-button>
          <a-modal
            :visible="visible"
            title="Create a new collection"
            okText="Create"
            @cancel="handleCancel()"
            @ok="handleCreate()"
          >
            <a-form layout="vertical" :form="form">
              <a-form-item label="运单号" v-model="addEntity.id">
                <a-input
                  v-decorator="[
              'id',
              { rules: [{ required: true, message: 'Please input the content!' }],}
            ]"
                />
              </a-form-item>

              <a-form-item label="收件人" v-model="addEntity.name">
                <a-input
                  v-decorator="[
              'name',
              { rules: [{ required: true, message: 'Please input the content!' }],}
            ]"
                />
              </a-form-item>

              <a-form-item label="电话" v-model="addEntity.phone">
                <a-input
                  v-decorator="[
              'phone',
              { rules: [{ required: true, message: 'Please input the content!' }],}
            ]"
                />
              </a-form-item>

              <a-form-item label="重量" v-model="addEntity.weight">
                <a-input
                  v-decorator="[
              'weight',
              { rules: [{ required: true, message: 'Please input the content!' }],}
            ]"
                />
              </a-form-item>
            </a-form>
          </a-modal>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-table bordered :dataSource="dataSource" :columns="columns">
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="确认收货?"
            @confirm="() => onConfirm(record)"
          >
            <a href="javascript:;">确认收货</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { constants } from "crypto";
export default {
  name: "home",
  components: {},
  created() {
    this.$store.dispatch("loadPackageList");
  },
  computed: {
    packages() {
      return this.$store.state.packages;
    },
    dataSource() {
      return this.$store.state.packages;
    }
  },
  methods: {
    loadAllPackages() {
      this.$store.dispatch("loadPackageList");
    },
    filterByStatus(status) {
      this.$store.dispatch("filterByStatus", status);
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleCreate() {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Received values of form: ", values);
        this.$store.dispatch("addPackage", values);
        form.resetFields();
        this.visible = false;
      });
    },
    showStatus(status) {
      return status === 0 ? "未取件" : status === 1 ? "已预约" : "已取件";
    },
  
    onConfirm(entity) {
      entity.status = 2;
      this.$store.dispatch("updatePackage", entity);
    }
  },
  data() {
    return {
      visible: false,
      form: this.$form.createForm(this),
      addEntity: { id: "", name: "", weight: "", phone: "", stauts: 0 },
      columns: [{
          title: '运单号',
          dataIndex: 'id',
          width: '10%',
          scopedSlots: {customRender: 'id'},
        }, {
          title: '收件人',
          dataIndex: 'name',
          width: '15%',
        }, {
          title: '电话',
          dataIndex: 'phone',
        }, {
          title: '状态',
          dataIndex: 'status',  
        }, {
          title: '预约时间',
          dataIndex: 'reserveTime',
        }, {
          title: '',
          dataIndex: 'operation',
          scopedSlots: {customRender: 'operation'},
        }],
    };
  }
};
</script>
