module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}

// const path = require('path')
/*
  打包工具在构建的时候，对样式文件的转换都会来调用这个函数,.css/.less样式文件、.vue单文件组件
  我们可以在函数中针对不同的样式文件配置不同的转换规则
*/
// module.exports = (data) => {
//   console.log(data.file.dirname)
//   如果是node_modules/vant相关文件，则将rootValue设置为37.5，否则都设置为75
//   let rootValue = data.file.dirname.indexOf(`node_modules${path.sep}vant`) !== -1
//     ? 37.5
//     : 75

//   return {
//     plugins: {
//       autoprefixer: {},
//       'postcss-pxtorem': {
//         rootValue,
//         propList: ['*']
//       }
//     }
//   }
// }
