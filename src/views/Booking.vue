<template>
  <div class="booking">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="15">
        <p class="height-100">
          <a-form layout="vertical" :form="form" @submit="handleSubmit">
            <a-form-item
              :label-col="{
            xs: {span: 24},
            sm: {span: 8},
          }"
              :wrapper-col="{
            xs: {span: 24},
            sm: {span: 16},
          }"
              label="运单号"
              v-model="entity.id"
            >
              <a-input
                v-decorator="[
              'id',
              { rules: [{ required: true, message: 'Please input the content!' }],}
            ]"
              />
            </a-form-item>

            <a-form-item
              :label-col="{
            xs: {span: 24},
            sm: {span: 8},
          }"
              :wrapper-col="{
            xs: {span: 24},
            sm: {span: 16},
          }"
              label="取件时间"
              v-model="entity.reserveTime"
            >
              <a-date-picker
                v-decorator="['reserveTime', { rules: [{ required: true, message: 'Please input the content!' }]}]"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                style="width: 700px;margin-right: 400px;"
              />
            </a-form-item>
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form>
        </p>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  name: "booking",
  data() {
    return {
      form: this.$form.createForm(this),
      entity: {}
    };
  },
  methods: {
    handleSubmit() {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          console.log(err);
          return;
        }
        this.$store.dispatch("updatePackage", values);
        form.resetFields();
        this.visible = false;
      });
    }
  }
};
</script>
