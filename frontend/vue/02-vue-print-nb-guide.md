# 【功能实现】Vue项目实现打印功能 - vue-print-nb使用指南

> 本文将介绍如何在Vue项目中使用vue-print-nb插件实现网页打印功能，包括安装配置、基本使用、自定义样式等多个方面的实现方法。

**相关链接：**
- GitHub仓库：[vue-print-nb](https://github.com/Power-kxLee/vue-print-nb)
- 在线Demo：[vue-print-nb demo](https://power-kxlee.github.io/vue-print-nb/)

## 一、基础配置

### 1.1 安装插件
```bash
# npm安装
npm install vue-print-nb --save

# yarn安装
yarn add vue-print-nb
```

### 1.2 注册插件
```javascript
// main.js
import Vue from 'vue'
import Print from 'vue-print-nb'

Vue.use(Print)
```

## 二、基本使用

### 2.1 指令方式
```vue
<template>
  <div>
    <!-- 打印整个div -->
    <div v-print="'#printArea'">
      <button>打印</button>
    </div>
    
    <div id="printArea">
      <h1>打印内容</h1>
      <p>这里是需要打印的内容</p>
    </div>
  </div>
</template>
```

### 2.2 选项配置
```vue
<template>
  <div>
    <div v-print="printOptions">
      <button>打印配置</button>
    </div>
    
    <div id="printContent">
      <h1>标题</h1>
      <table>
        <tr>
          <th>列1</th>
          <th>列2</th>
        </tr>
        <tr>
          <td>数据1</td>
          <td>数据2</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      printOptions: {
        id: 'printContent',
        popTitle: '打印文档',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
        beforeOpenCallback() {
          console.log('打印窗口即将打开')
        },
        openCallback() {
          console.log('打印窗口已打开')
        },
        closeCallback() {
          console.log('打印窗口已关闭')
        }
      }
    }
  }
}
</script>
```

## 三、样式处理

### 3.1 打印样式
```vue
<template>
  <div>
    <div v-print="printOptions">
      <button>打印</button>
    </div>
    
    <div id="printArea">
      <div class="print-content">
        <h1>打印内容</h1>
        <p>正文内容</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 普通样式 */
.print-content {
  padding: 20px;
}

/* 打印样式 */
@media print {
  .print-content {
    padding: 0;
  }
  
  h1 {
    color: #333;
    font-size: 24px;
  }
  
  p {
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>
```

### 3.2 自定义模板
```vue
<template>
  <div>
    <div v-print="printOptions">
      <button>打印</button>
    </div>
    
    <div id="printTemplate">
      <div class="header">
        <img src="logo.png" alt="Logo">
        <h2>{{company}}</h2>
      </div>
      <div class="content">
        <table>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.value}}</td>
          </tr>
        </table>
      </div>
      <div class="footer">
        <p>打印时间：{{printTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: '示例公司',
      data: [
        { name: '项目1', value: '内容1' },
        { name: '项目2', value: '内容2' }
      ],
      printTime: new Date().toLocaleString(),
      printOptions: {
        id: 'printTemplate',
        preview: false,
        excludeStyles: ['display']
      }
    }
  }
}
</script>

<style>
@media print {
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .content table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .content td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .footer {
    margin-top: 20px;
    text-align: right;
    font-size: 12px;
  }
}
</style>
```

## 四、高级功能

### 4.1 打印前数据处理
```vue
<script>
export default {
  methods: {
    handlePrint() {
      // 数据处理
      this.formatData()
      
      // 调用打印
      this.$print(this.printOptions)
    },
    
    formatData() {
      this.data = this.data.map(item => ({
        ...item,
        value: `￥${item.value}`
      }))
    }
  }
}
</script>
```

### 4.2 分页处理
```vue
<style>
@media print {
  /* 强制分页 */
  .page-break {
    page-break-after: always;
  }
  
  /* 避免元素被分页 */
  .no-break {
    page-break-inside: avoid;
  }
  
  /* 设置页边距 */
  @page {
    margin: 2cm;
  }
}
</style>
```

## 五、常见问题解决

### 5.1 样式问题
1. 打印样式不生效：
```javascript
// 确保样式被正确引入
printOptions: {
  excludeStyles: false,
  importStyle: true
}
```

2. 图片不显示：
```javascript
// 确保图片加载完成
async beforeOpenCallback() {
  await this.loadImages()
},

methods: {
  loadImages() {
    return new Promise(resolve => {
      const images = document.querySelectorAll('img')
      let loadedImages = 0
      
      images.forEach(img => {
        if (img.complete) {
          loadedImages++
        } else {
          img.onload = () => {
            loadedImages++
            if (loadedImages === images.length) {
              resolve()
            }
          }
        }
      })
      
      if (loadedImages === images.length) {
        resolve()
      }
    })
  }
}
```

### 5.2 打印预览
```vue
<template>
  <div>
    <div v-print="previewOptions">
      <button>预览打印</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previewOptions: {
        id: 'printArea',
        preview: true,
        previewTitle: '打印预览',
        modal: true
      }
    }
  }
}
</script>
```

## 六、总结

vue-print-nb 提供了一个简单而强大的打印解决方案，主要优点包括：
1. 使用简单，支持指令和方法两种方式
2. 提供丰富的配置选项
3. 支持自定义样式和模板
4. 提供完整的生命周期钩子

在实际使用中，需要注意以下几点：
1. 合理使用打印样式媒体查询
2. 处理好异步数据和图片加载
3. 注意分页和布局问题
4. 做好打印预览测试

通过本文提供的方法和最佳实践，可以在Vue项目中实现完善的打印功能。建议在开发过程中充分测试不同场景下的打印效果，确保最终的打印结果符合预期。
