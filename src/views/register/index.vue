<template>
  <div class="register_box">
    <van-nav-bar title="会员注册" />
    <div class="form_box">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <!-- <van-field
            v-model="registerForm.name"
            name="姓名"
            label="姓名"
            placeholder="姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
          /> -->
          <van-field
            v-model="registerForm.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <!-- <van-field name="radio" label="性别">
            <template #input>
              <van-radio-group v-model="registerForm.sex" direction="horizontal">
                <van-radio :name="1">男</van-radio>
                <van-radio :name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field> -->
          <!-- <van-field
            v-model="registerForm.birth"
            is-link
            readonly
            name="datePicker"
            label="生日"
            placeholder="点击选择生日"
            @click="showPicker = true"
          /> -->
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>

    <!-- <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
      <van-date-picker
        :model-value="pickerValue"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { showToast } from "vant";
import { showLoadingToast } from "vant";
import { memberRegisterApi } from "@/api/home";
import router from "@/router/index";

const authBtnShow = <boolean>true;

// const appId = ref<String>("wx727345ffe052691e");
// const appId = ref<String>("wx22ad20bea9ccbbeb");
const appId = ref<String>("wxe520244476e4bdfb");

const getUrlName = (paramName: any) => {
  const url = window.location.href;
  const regex = new RegExp(`${paramName}=([^&]*)`);
  const match = regex.exec(url);
  if (match) {
    return match[1];
  } else {
    return "";
  }
};

//删除URL中指定search参数,会将参数值一起删除，返回没有该参数的完整url
const deUrlParam = (url: any, params: any) => {
  /**
   * 删除URL中指定search参数,会将参数值一起删除
   * @param {string} url 地址字符串
   * @param {array} aParam 要删除的参数key数组，如['name','age']
   * @return {string} 返回新URL字符串
   */
  for (var index = 0; index < params.length; index++) {
    var item = params[index];
    var fromIndex = url.indexOf(item + "="); //必须加=号，避免参数值中包含item字符串
    if (fromIndex !== -1) {
      // 通过url特殊符号，计算出=号后面的的字符数，用于生成replace正则
      var startIndex = url.indexOf("=", fromIndex);
      var endIndex = url.indexOf("&", fromIndex);
      var hashIndex = url.indexOf("#", fromIndex);
      var reg = undefined;
      if (endIndex !== -1) {
        // 后面还有search参数的情况
        var num = endIndex - startIndex;
        reg = new RegExp(item + "=.{" + num + "}");
        url = url.replace(reg, "");
      } else if (hashIndex !== -1) {
        // 有hash参数的情况
        var num = hashIndex - startIndex - 1;
        reg = new RegExp("&?" + item + "=.{" + num + "}");
        url = url.replace(reg, "");
      } else {
        // search参数在最后或只有一个参数的情况
        reg = new RegExp("&?" + item + "=.+");
        url = url.replace(reg, "");
      }
    }
  }
  var noSearchParam = url.indexOf("=");
  if (noSearchParam === -1) {
    url = url.replace(/\?/, ""); // 如果已经没有参数，删除？号
  }
  return url;
};

const count = ref(0);
const checked = ref("1");
const showPicker = ref<Boolean>(false);
const pickerValue = ref([]);
const registerForm = ref({
  //   name: "",
  phone: "",
  code: "",
  //   sex: 1,
  //   birth: "",
});

const registerFormRef = ref(null);

onMounted(() => {
  registerForm.value.code = getUrlName("code");
  if (registerForm.value.code) {
    router.push({ path: "/" });
  }
});

const onSubmit = () => {
  //   if (!registerForm.value.name) return showToast("请填写名字!");
  if (!registerForm.value.phone) return showToast("请填写手机号!");
  // let params = registerForm.value
  let params = registerForm.value;

  const toast = showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration: 30000,
  });

  memberRegisterApi(params)
    .then((res) => {
      toast.close();
    })
    .catch((err) => {
      setTimeout(() => {
        toast.close();
        showToast(err.Error || "系统错误!");
      }, 1000);
    });
};

// const onConfirm = ({ selectedValues }: any) => {
//   pickerValue.value = selectedValues;
//   registerForm.value.birth = selectedValues.join("/");
//   showPicker.value = false;
// };
</script>

<style scoped lang="scss">
.register_box {
  color: #888;
  background: #f7f8fa;
  min-height: 100vh;

  .web_title {
    text-align: center;
    font-size: 16px;
    line-height: 50px;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    background: #fff;
    margin-bottom: 20px;
  }

  .form_box {
    margin-top: 20px;
  }

  .auth_tip_box {
    .tip_text {
      font-size: 14px;
      text-align: center;
      margin-bottom: 5px;
    }
    .van-button {
      margin-top: 15px;
    }
  }
}
</style>
