# Vue 3 新特性详解

Vue 3 带来了许多重要的新特性和性能改进。本文将详细介绍最受欢迎的特性。

## 一、Composition API

### 1.1 基本使用
```js
import { ref, reactive, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const user = reactive({
      name: 'Tom',
      age: 18
    })

    // 计算属性
    const doubleCount = computed(() => count.value * 2)

    // 方法
    const increment = () => {
      count.value++
    }

    // 生命周期钩子
    onMounted(() => {
      console.log('组件已挂载')
    })

    // 返回需要在模板中使用的数据和方法
    return {
      count,
      user,
      doubleCount,
      increment
    }
  }
}
```

### 1.2 优势
1. 更好的代码组织
2. 更好的类型推导
3. 更好的代码复用
4. 更小的打包体积

## 二、Teleport 组件

用于将组件的内容渲染到 DOM 树的其他位置。

```vue
<template>
  <div>
    <h1>主页面内容</h1>
    <teleport to="body">
      <!-- 这里的内容会被渲染到 body 标签下 -->
      <div class="modal">
        <h2>模态框标题</h2>
        <p>模态框内容</p>
      </div>
    </teleport>
  </div>
</template>
```

## 三、Fragments

Vue 3 支持多根节点组件：

```vue
<template>
  <header>Header</header>
  <main>Main Content</main>
  <footer>Footer</footer>
</template>
```

## 四、响应式系统升级

### 4.1 Proxy 替代 Object.defineProperty
```js
// Vue 3 的响应式系统
const proxy = new Proxy(target, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    trigger(target, key)
    return true
  }
})
```

### 4.2 ref 和 reactive
```js
// ref 用于基本类型
const count = ref(0)
console.log(count.value) // 0

// reactive 用于对象
const state = reactive({
  count: 0,
  list: []
})
console.log(state.count) // 0
```

## 五、生命周期钩子变化

Vue 3 的生命周期钩子需要手动导入：

```js
import { 
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted 
} from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    
    onUpdated(() => {
      console.log('updated!')
    })
  }
}
```

## 六、性能优化

### 6.1 静态树提升
```vue
<template>
  <div>
    <h1>这个标题不会改变</h1>
    <p>{{ dynamicContent }}</p>
  </div>
</template>
```

### 6.2 Patch Flag 优化
```vue
<template>
  <div>
    <span>静态文本</span>
    <span :id="dynamicId">带有动态属性</span>
    <span>{{ dynamicText }}</span>
  </div>
</template>
```

## 七、TypeScript 支持

Vue 3 是用 TypeScript 重写的，提供了更好的类型支持：

```typescript
interface User {
  name: string
  age: number
}

const user = reactive<User>({
  name: 'Tom',
  age: 18
})
```

## 八、新的组件

### 8.1 Suspense
```vue
<template>
  <Suspense>
    <template #default>
      <async-component />
    </template>
    <template #fallback>
      <loading-component />
    </template>
  </Suspense>
</template>
```

### 8.2 自定义渲染器
```js
import { createRenderer } from '@vue/runtime-core'

const { render } = createRenderer({
  patchProp,
  insert,
  remove,
  createElement
  // ...更多选项
})
```

## 九、更好的 Tree-Shaking

Vue 3 支持更好的 tree-shaking，可以大幅减小打包体积：

```js
// 按需导入
import { ref, computed } from 'vue'
```

## 十、Composition API vs Options API

### 10.1 Options API
```js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  }
}
```

### 10.2 Composition API
```js
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const increment = () => {
      count.value++
    }
    
    const doubleCount = computed(() => count.value * 2)
    
    return {
      count,
      increment,
      doubleCount
    }
  }
}
```

## 总结

Vue 3 的新特性主要围绕以下几个方面：
1. 更好的性能（Proxy、静态树提升、Patch Flag）
2. 更好的代码组织（Composition API）
3. 更好的 TypeScript 支持
4. 更小的打包体积（Tree-shaking）
5. 新的组件和功能（Teleport、Fragments、Suspense）

这些特性使得 Vue 3 在开发体验、性能和可维护性方面都有了显著提升。
