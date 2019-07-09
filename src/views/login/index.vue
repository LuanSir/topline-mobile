<template>
  <div>
    <van-nav-bar class="nav-bar" title="登录" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        class="phone"
        clearable
        left-icon="friends-o"
        label="用户名"
        placeholder="请输入手机号"
      />
      <!-- <van-field v-model="user.code" type="password" label="验证码" placeholder="请输入验证码" required /> -->
      <van-field
        v-model="user.code"
        class="pwd"
        center
        clearable
        left-icon="phone-o"
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div>
      <van-button class="btn" type="info" @click.prevent="handleLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
// 引入axios
// import axios from 'axios'
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      // const res = await axios({
      //   method: 'POST',
      //   url: 'http://toutiao.course.itcast.cn/app/v1_0/authorizations',
      //   data: this.user
      // })
      // console.log(res)

      try {
        const data = await login(this.user)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  background: #3296fa;
}
.phone {
  font-size: 16px;
}
.pwd {
  font-size: 16px;
}
.btn {
  width: 100%;
  font-size: 16px;
}
</style>
