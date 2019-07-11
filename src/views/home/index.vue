<template>
  <div>
    <van-nav-bar class="biaoti" title="标题" fixed/>
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab title="首页">
        <!--
          van-pull-refresh组件，下拉刷新
          isLoading用来控制下拉刷新时的loading状态
          @refresh在下拉刷新时会被触发
         -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!--
            list 列表组件：主要提供上拉加载更多的功能
            loading用来控制加载中loading状态
            finished控制是否加载完毕
            @load加载更多的时候触发的事件，它自动会调用 onLoad 函数拿数据，以填充页面
            每次调用onload都会自动把loading设置为true
            我们需要在 onLoad 中拿到本次加载的数据以后，将 loading 设置为 false
           -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.biaoti {
  background: #3296fa;
}
// 深度作用选择器：https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8
.channel-tabs {
  margin-top: 50px;
}
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 48px;
}
.channel-tabs /deep/ .van-tabs__content {
  margin-bottom: 48px;
}
</style>
