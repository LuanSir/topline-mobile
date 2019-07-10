<template>
  <div>
    <van-nav-bar class="nav-bar" title="登录" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        v-validate="'required'"
        name="mobile"
        :error-message="errors.first('mobile')"
        class="phone"
        clearable
        left-icon="friends-o"
        label="用户名"
        placeholder="请输入手机号"
      />
      <!-- <van-field v-model="user.code" type="password" label="验证码" placeholder="请输入验证码" required /> -->
      <van-field
        v-model="user.code"
        v-validate="'required'"
        name="code"
        :error-message="errors.first('code')"
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
  created () {
    this.configMessage()
  },
  methods: {
    // 登录
    async handleLogin () {
      try {
        this.$validator.validate().then(async valid => {
          // 如果验证没通过就什么都不做
          if (!valid) {
            return
          }
          // 表单验证通过，提交表单数据
          const data = await login(this.user)
          // 通过提交mutation更新vuex容器中的数据
          this.$store.commit('setUser', data)
        })
      } catch (err) {
        console.log(err)
        console.log('登录失败')
      }
    },
    // 表单验证提示信息
    configMessage () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          },
          code: {
            required: () => '验证码不能为空'
          }
        }
      }
      this.$validator.localize('zh_CN', dict)
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
