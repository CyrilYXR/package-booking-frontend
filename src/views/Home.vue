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
      <table>
        <tr>
          <td>运单号</td>
          <td>收件人</td>
          <td>电话</td>
          <td>状态</td>
          <td>预约时间</td>
          <td>操作</td>
        </tr>
        <tr v-for="packageData in packages" :key="packageData.id">
          <td>{{packageData.id}}</td>
          <td>{{packageData.name}}</td>
          <td>{{packageData.phone}}</td>
          <td>{{showStatus(packageData.status)}}</td>
          <td>{{packageData.reserveTime}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { constants } from 'crypto';
export default {
  name: "home",
  components: {},
  created() {
    this.$store.dispatch("loadPackageList");
  },
  computed: {
    packages() {
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
    showModal () {
      this.visible = true;
    },
    handleCancel  () {
      this.visible = false;
    },
    handleCreate () {
      const form = this.form
      form.validateFields((err, values) => {
        if (err) {
          console.log(err)
          return;
        }
        console.log('Received values of form: ', values);
        this.$store.dispatch('addPackage',values);
        form.resetFields();
        this.visible = false;
      });
    },
    showStatus(status){
      return status === 0 ? "未取件" : status === 1 ? "已预约" : "已取件"
    }
  },
  data(){
    return{
      visible: false,
      form: this.$form.createForm(this),
      addEntity: {'id':'','name':'','weight':'','phone':'','stauts':0},
    }
  }
};
</script>
