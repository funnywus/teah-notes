# 【React进阶】Hooks深入浅出 + 性能优化实战，彻底掌握React开发！

> 本文将深入讲解React Hooks的使用技巧和React应用的性能优化方案，包含大量实战示例和最佳实践，帮助你提升React开发水平。

## 一、React Hooks核心用法

### 1.1 useState：状态管理
```jsx
import React, { useState } from 'react';

function Counter() {
  // 基础用法
  const [count, setCount] = useState(0);
  
  // 函数式更新
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };
  
  // 对象状态
  const [user, setUser] = useState({ name: '', age: 0 });
  const updateUser = () => {
    setUser(prev => ({
      ...prev,
      name: 'John'
    }));
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <p>User: {user.name}</p>
      <button onClick={updateUser}>Update User</button>
    </div>
  );
}
```

### 1.2 useEffect：副作用处理
```jsx
import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 数据获取
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://api.example.com/user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // 空依赖数组，仅在组件挂载时执行

  // 清理副作用
  useEffect(() => {
    const subscription = someEventSource.subscribe();
    
    // 清理函数
    return () => {
      subscription.unsubscribe();
    };
  }, [someEventSource]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user data</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### 1.3 useCallback：函数记忆
```jsx
import React, { useCallback, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  // 使用useCallback记忆函数
  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  }, []); // 空依赖数组，函数永远不会改变

  const removeTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <TodoItems items={todos} onRemove={removeTodo} />
    </div>
  );
}
```

### 1.4 useMemo：值记忆
```jsx
import React, { useMemo, useState } from 'react';

function ExpensiveCalculation({ numbers }) {
  // 使用useMemo缓存计算结果
  const sum = useMemo(() => {
    console.log('Computing sum...');
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }, [numbers]); // 只在numbers改变时重新计算

  return <div>Sum: {sum}</div>;
}
```

## 二、自定义Hooks

### 2.1 封装通用逻辑
```jsx
// useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // 获取初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 监听更新
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// 使用示例
function App() {
  const [name, setName] = useLocalStorage('name', 'John');
  return (
    <input
      value={name}
      onChange={e => setName(e.target.value)}
    />
  );
}
```

## 三、性能优化技巧

### 3.1 React.memo：组件记忆
```jsx
import React, { memo } from 'react';

const TodoItem = memo(function TodoItem({ text, onRemove }) {
  console.log('TodoItem render');
  return (
    <li>
      {text}
      <button onClick={onRemove}>删除</button>
    </li>
  );
});

// 使用自定义比较函数
const MemoizedComponent = memo(MyComponent, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
```

### 3.2 懒加载和代码分割
```jsx
import React, { Suspense, lazy } from 'react';

// 懒加载组件
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 3.3 虚拟列表优化
```jsx
import React, { useState } from 'react';
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      Item {items[index]}
    </div>
  );

  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}
```

## 四、常见性能陷阱

### 4.1 依赖数组问题
```jsx
function BadExample() {
  const [count, setCount] = useState(0);
  
  // ❌ 错误：空依赖数组但使用了外部变量
  useEffect(() => {
    console.log(count);
  }, []);
  
  // ✅ 正确：包含所有依赖
  useEffect(() => {
    console.log(count);
  }, [count]);
}
```

### 4.2 过度使用useMemo
```jsx
function Example({ value }) {
  // ❌ 不必要的useMemo
  const simpleValue = useMemo(() => value + 1, [value]);
  
  // ✅ 直接计算即可
  const betterValue = value + 1;
  
  // ✅ 复杂计算才需要useMemo
  const expensiveValue = useMemo(() => {
    return someExpensiveCalculation(value);
  }, [value]);
}
```

## 五、实战最佳实践

### 5.1 状态管理模式
```jsx
// 使用useReducer管理复杂状态
import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +{state.step}
      </button>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({
          type: 'setStep',
          payload: Number(e.target.value)
        })}
      />
    </div>
  );
}
```

### 5.2 错误边界处理
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// 使用错误边界
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## 总结

通过本文的学习，你应该掌握了：
1. React Hooks的核心用法和注意事项
2. 如何创建和使用自定义Hooks
3. React应用的性能优化技巧
4. 常见性能陷阱的避免方法
5. 实战中的最佳实践

记住以下关键点：
- 合理使用依赖数组
- 避免过度优化
- 正确管理组件状态
- 实现适当的错误处理

如果你在React开发中遇到问题，欢迎在评论区讨论！
