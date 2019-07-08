<template>
  <div>
    <van-nav-bar class="nav-bar" title="登录" />
    <van-cell-group>
      <van-field v-model="user.mobile" required clearable label="用户名" placeholder="请输入手机号" />
      <!-- <van-field v-model="user.code" type="password" label="验证码" placeholder="请输入验证码" required /> -->
      <van-field v-model="user.code" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div>
      <van-button class="btn" type="info" @click.native="handleLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  background: #3296fa;
}
.btn {
  width: 100%;
}
</style>
