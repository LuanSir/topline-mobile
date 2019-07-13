<template>
  <div>
    <van-nav-bar class="biaoti" title="标题" fixed />
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab v-for="channelItem in channels" :key="channelItem.id" :title="channelItem.name">
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
            v-model="channelItem.upPullLoading"
            :finished="channelItem.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="articleItem in channelItem.articles"
              :key="articleItem.art_id"
              :title="articleItem.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      channels: [] // 储存频道列表
    }
  },
  computed: {
    // 当前激活的频道
    activeChannel () {
      return this.channels[this.active]
    }
  },
  created () {
    // 在生命周期开始的时候直接获取频道信息
    this.loadChannels()
  },
  methods: {
    // 获取频道
    async loadChannels () {
      // 获取容器中存储的用户登录信息，如果有就说明已经登录
      const { user } = this.$store.state
      let channels = []
      // 如果已经登录
      if (user) {
        // 获取用户自己的频道列表
        const data = await getChannels()
        // 把获取到的频道列表放到要显示的频道列表中
        channels = data.channels
      } else {
        // 如果未登录
        // 如果有本地存储数据，就使用本地存储数据中的channels，如果没有就请求拿到推荐的频道列表
        // 获取本地存储数据
        const localChannels = JSON.parse(
          window.localStorage.getItem('channels')
        )
        if (localChannels) {
          channels = localChannels
        } else {
          const data = await getChannels()
          // console.log(data)
          channels = data.channels
        }
      }
      // 修改channels，将这个数据结构修改为满足我们使用的需求
      // 遍历每一个频道，
      // 每个频道中的控制当前频道的下拉刷新 loading 状态、当前频道的上拉加载更多的 loading 状态、当前频道数据是否加载完毕
      // 都由各自的频道单独管理
      channels.forEach(item => {
        item.articles = [] // 用来存储当前列表的文章
        item.timestamp = Date.now() // 存储下一页数据额时间戳
        item.downPullLoading = false // 用来控制当前频道的下拉刷新 loading 状态
        item.upPullLoading = false // 用来控制当前频道的上拉加载更多 loading 状态
        item.upPullFinished = false // 用来控制当前频道数据是否加载完毕
      })
      this.channels = channels
    },
    // 上拉列表加载更多触发的方法
    async onLoad () {
      console.log('onload')
      let data = []
      data = await this.loadArticles()
      // 异步更新数据
      // pre_timestamp下一页的页码
      // results文章列表
      // 解决初始化的时候没有最新推荐数据的问题,没有最新数据，那就加载上一次最新数据
      if (data.pre_timestamp && !data.results.length) {
        this.activeChannel.timestamp = data.pre_timestamp
        // 加载下一页数据
        data = await this.loadArticles()
      }
      // 数据加载好以后，将pre_timestamp更新到当前频道中用于加载下下页数据
      this.activeChannel.timestamp = data.pre_timestamp
      // 将文章数据更新到频道中（注意：是 push 追加，不是覆盖）
      this.activeChannel.articles.push(...data.results)
      // 数据加载完毕，取消上拉 loading
      this.activeChannel.upPullLoading = false
      console.log(data)

      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
    // 下拉列表刷新触发的方法,如果有新数据，则重置列表数据
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },

    // 获取列表的文章数据
    async loadArticles () {
      // 获取当前激活的频道的ID
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticles({
        channelId,
        timestamp, // 用于请求当前频道下一页数据的时间戳
        withTop: 1
      })
      return data
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
