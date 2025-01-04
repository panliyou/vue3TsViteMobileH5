<template>
  <div class="register_box">
    <div class="web_title">会员注册</div>
    <div class="form_box">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="registerForm.name"
            name="姓名"
            label="姓名"
            placeholder="姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
          />
          <van-field
            v-model="registerForm.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field name="radio" label="性别">
            <template #input>
              <van-radio-group v-model="registerForm.sex" direction="horizontal">
                <van-radio :name="1">男</van-radio>
                <van-radio :name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="registerForm.birth"
            is-link
            readonly
            name="datePicker"
            label="生日"
            placeholder="点击选择生日"
            @click="showPicker = true"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>

    <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
      <van-date-picker
        :model-value="pickerValue"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { showToast } from "vant";
import { memberRegisterApi } from "@/api/home";

const count = ref(0);
const checked = ref("1");
const showPicker = ref(false);
const pickerValue = ref([]);
const registerForm = ref({
  name: "",
  phone: "",
  sex: 1,
  birth: "",
});
const registerFormRef = ref(null);
const onSubmit = () => {
  if (!registerForm.value.name) return showToast("请填写名字!");
  if (!registerForm.value.phone) return showToast("请填写手机号!");
  // let params = registerForm.value
  let params = {
    username: "123456a",
    password: "e10adc3949ba59abbe56e057f20f883e",
  };
  memberRegisterApi(params).then((res) => {
    console.log("注册接口走了res=>", res);
  });
};

const onConfirm = ({ selectedValues }) => {
  pickerValue.value = selectedValues;
  registerForm.value.birth = selectedValues.join("/");
  showPicker.value = false;
  console.log(4545455445,registerForm.value.birth);
  
};
</script>

<style scoped lang="scss">
.register_box {
  color: #888;
  background: #f7f8fa;

  .web_title {
    text-align: center;
    font-size: 16px;
    line-height: 50px;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    background: #fff;
    margin-bottom: 20px;
  }
}
</style>
