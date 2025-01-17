<template>
  <div class="auth_box">
    <van-popup v-model:show="authPopShow" :style="{ padding: '64px' }">
      <div class="auth_tip_box">
        <div class="tip_text">申请获得以下权限</div>
        <div class="tip_text">获得你的公开信息(昵称、头像等)</div>
        <van-button round block type="primary" @click="authLogin">确认授权</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { showToast } from "vant";
import { showLoadingToast } from "vant";
import router from "@/router/index";

const authPopShow = ref<boolean>(true);

// const appId = ref<String>("wx727345ffe052691e");
// const appId = ref<String>("wx22ad20bea9ccbbeb");
const appId = ref<String>("wxe520244476e4bdfb");

const authLogin = () => {
  router.push({ path: "/register" });
  return;
  let local = "http://www.chao365.xyz/register";
  local = encodeURIComponent(local);
  let url =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    appId.value +
    "&redirect_uri=" +
    local +
    "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  window.location.href = url;
};

//从url中获取指定参数的值
// const getUrlName = (paramName: any) => {
//   const url = window.location.href;
//   const regex = new RegExp(`${paramName}=([^&]*)`);
//   const match = regex.exec(url);
//   if (match) {
//     return match[1];
//   } else {
//     return null;
//   }
// };

//删除URL中指定search参数,会将参数值一起删除，返回没有该参数的完整url
// const deUrlParam = (url: any, params: any) => {
//   /**
//    * 删除URL中指定search参数,会将参数值一起删除
//    * @param {string} url 地址字符串
//    * @param {array} aParam 要删除的参数key数组，如['name','age']
//    * @return {string} 返回新URL字符串
//    */
//   for (var index = 0; index < params.length; index++) {
//     var item = params[index];
//     var fromIndex = url.indexOf(item + "="); //必须加=号，避免参数值中包含item字符串
//     if (fromIndex !== -1) {
//       // 通过url特殊符号，计算出=号后面的的字符数，用于生成replace正则
//       var startIndex = url.indexOf("=", fromIndex);
//       var endIndex = url.indexOf("&", fromIndex);
//       var hashIndex = url.indexOf("#", fromIndex);
//       var reg = undefined;
//       if (endIndex !== -1) {
//         // 后面还有search参数的情况
//         var num = endIndex - startIndex;
//         reg = new RegExp(item + "=.{" + num + "}");
//         url = url.replace(reg, "");
//       } else if (hashIndex !== -1) {
//         // 有hash参数的情况
//         var num = hashIndex - startIndex - 1;
//         reg = new RegExp("&?" + item + "=.{" + num + "}");
//         url = url.replace(reg, "");
//       } else {
//         // search参数在最后或只有一个参数的情况
//         reg = new RegExp("&?" + item + "=.+");
//         url = url.replace(reg, "");
//       }
//     }
//   }
//   var noSearchParam = url.indexOf("=");
//   if (noSearchParam === -1) {
//     url = url.replace(/\?/, ""); // 如果已经没有参数，删除？号
//   }
//   return url;
// };
</script>

<style scoped lang="scss">
.auth_box {
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
