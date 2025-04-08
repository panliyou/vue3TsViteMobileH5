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
import {constant} from '@/utils/constant'

const authPopShow = ref<boolean>(true);

const authLogin = () => {
  let local = "http://www.chao365.xyz";
  local = encodeURIComponent(local);
  let url =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
     constant.appId +
    "&redirect_uri=" +
    local +
    "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  window.location.href = url;
};

const weixinCode = ref<any>('');

onMounted (()=> {
    weixinCode.value = getUrlName("code");
    
  console.log('register授权链接上携带的code的值=>' + weixinCode.value);

  if (weixinCode.value) {
    router.push({ path: "/register",query:{code:weixinCode.value} });
  }
})

const getUrlName = (paramName: any) => {
  const url = window.location.href;
  const regex = new RegExp(`${paramName}=([^&]*)`);
  const match = regex.exec(url);
  if (match) {
    return match[1];
  } else {
    return null;
  }
};
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
