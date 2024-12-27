# 【MySQL进阶】高级SQL技巧，让你的数据库性能翻倍！

> 本文将介绍一系列MySQL高级SQL技巧，包括子查询优化、复杂连接、窗口函数等，帮助你编写更高效的SQL语句。

## 一、高效子查询

### 1.1 EXISTS vs IN
```sql
-- 使用IN的查询（性能较差）
SELECT * FROM orders 
WHERE customer_id IN (
    SELECT id FROM customers 
    WHERE country = 'China'
);

-- 使用EXISTS的查询（性能更好）
SELECT * FROM orders o 
WHERE EXISTS (
    SELECT 1 FROM customers c 
    WHERE c.id = o.customer_id 
    AND c.country = 'China'
);
```

### 1.2 相关子查询优化
```sql
-- 查找每个部门工资最高的员工
-- 方法1：使用相关子查询（性能较差）
SELECT * FROM employees e1 
WHERE salary = (
    SELECT MAX(salary) 
    FROM employees e2 
    WHERE e2.department_id = e1.department_id
);

-- 方法2：使用JOIN（性能更好）
SELECT e.* 
FROM employees e
JOIN (
    SELECT department_id, MAX(salary) as max_salary 
    FROM employees 
    GROUP BY department_id
) t ON e.department_id = t.department_id 
AND e.salary = t.max_salary;
```

## 二、高级连接技巧

### 2.1 多表连接优化
```sql
-- 优化前：多次JOIN
SELECT o.order_id, c.name, p.product_name 
FROM orders o 
JOIN customers c ON o.customer_id = c.id 
JOIN order_items oi ON o.order_id = oi.order_id 
JOIN products p ON oi.product_id = p.id;

-- 优化后：使用索引和合适的连接顺序
SELECT /*+ JOIN_ORDER(o, oi, p, c) */ 
    o.order_id, c.name, p.product_name 
FROM orders o 
JOIN order_items oi ON o.order_id = oi.order_id 
JOIN products p ON oi.product_id = p.id 
JOIN customers c ON o.customer_id = c.id;
```

### 2.2 LEFT JOIN优化
```sql
-- 查找没有订单的客户
-- 优化前
SELECT c.* 
FROM customers c 
LEFT JOIN orders o ON c.id = o.customer_id 
WHERE o.order_id IS NULL;

-- 优化后：使用NOT EXISTS
SELECT c.* 
FROM customers c 
WHERE NOT EXISTS (
    SELECT 1 
    FROM orders o 
    WHERE o.customer_id = c.id
);
```

## 三、窗口函数应用

### 3.1 排名函数
```sql
-- 按部门给员工薪资排名
SELECT 
    name,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dense_rank,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as row_num
FROM employees;

-- 查找每个部门薪资前3的员工
WITH RankedEmployees AS (
    SELECT 
        name,
        department,
        salary,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
    FROM employees
)
SELECT * FROM RankedEmployees 
WHERE rank <= 3;
```

### 3.2 移动计算
```sql
-- 计算销售额的移动平均
SELECT 
    date,
    amount,
    AVG(amount) OVER (
        ORDER BY date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as moving_avg_7days,
    SUM(amount) OVER (
        ORDER BY date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as cumulative_sum
FROM sales;
```

## 四、高级分组技巧

### 4.1 GROUPING SETS
```sql
-- 多维度分组分析
SELECT 
    COALESCE(category, 'All Categories') as category,
    COALESCE(region, 'All Regions') as region,
    SUM(sales) as total_sales
FROM sales_data
GROUP BY GROUPING SETS (
    (category, region),
    (category),
    (region),
    ()
);
```

### 4.2 ROLLUP和CUBE
```sql
-- 使用ROLLUP进行层级统计
SELECT 
    year,
    quarter,
    month,
    SUM(sales) as total_sales
FROM sales_data
GROUP BY year, quarter, month WITH ROLLUP;

-- 使用CUBE进行全维度统计
SELECT 
    category,
    region,
    product,
    SUM(sales) as total_sales
FROM sales_data
GROUP BY CUBE(category, region, product);
```

## 五、条件表达式

### 5.1 CASE WHEN高级用法
```sql
-- 动态分组
SELECT 
    order_id,
    amount,
    CASE 
        WHEN amount < 1000 THEN 'Small'
        WHEN amount < 5000 THEN 'Medium'
        ELSE 'Large'
    END as order_size,
    COUNT(*) OVER (
        PARTITION BY 
            CASE 
                WHEN amount < 1000 THEN 'Small'
                WHEN amount < 5000 THEN 'Medium'
                ELSE 'Large'
            END
    ) as size_count
FROM orders;

-- 条件聚合
SELECT 
    department,
    SUM(CASE WHEN gender = 'M' THEN salary ELSE 0 END) as male_salary,
    SUM(CASE WHEN gender = 'F' THEN salary ELSE 0 END) as female_salary,
    AVG(CASE WHEN age < 30 THEN salary END) as young_avg_salary
FROM employees
GROUP BY department;
```

## 六、高级更新和删除

### 6.1 多表更新
```sql
-- 基于其他表的数据更新
UPDATE products p
JOIN inventory i ON p.product_id = i.product_id
SET p.status = 
    CASE 
        WHEN i.quantity = 0 THEN 'Out of Stock'
        WHEN i.quantity < 10 THEN 'Low Stock'
        ELSE 'In Stock'
    END
WHERE i.last_updated > DATE_SUB(NOW(), INTERVAL 1 DAY);
```

### 6.2 带有子查询的删除
```sql
-- 删除重复数据，保留最新记录
DELETE FROM customers 
WHERE id NOT IN (
    SELECT id FROM (
        SELECT MAX(id) as id
        FROM customers
        GROUP BY email
    ) t
);
```

## 七、性能优化技巧

### 7.1 使用EXPLAIN分析
```sql
-- 分析查询执行计划
EXPLAIN FORMAT=JSON
SELECT c.name, COUNT(o.order_id) as order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE c.created_at > '2023-01-01'
GROUP BY c.id
HAVING order_count > 5;
```

### 7.2 索引优化
```sql
-- 创建复合索引
CREATE INDEX idx_customer_order 
ON orders(customer_id, order_date, status);

-- 使用索引提示
SELECT /*+ INDEX(orders idx_customer_order) */
    customer_id, 
    COUNT(*) as order_count
FROM orders 
WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31'
    AND status = 'completed'
GROUP BY customer_id;
```

## 八、最佳实践

1. 查询优化原则：
   - 只查询需要的列
   - 使用适当的索引
   - 避免SELECT *
   - 限制结果集大小

2. 子查询使用建议：
   - 优先使用JOIN而不是子查询
   - 必要时使用EXISTS替代IN
   - 使用派生表优化复杂查询

3. 索引使用技巧：
   - 在WHERE和JOIN条件中的列建立索引
   - 考虑列的选择性
   - 避免过度建立索引

4. 性能监控：
   - 定期检查慢查询日志
   - 使用EXPLAIN分析查询计划
   - 监控服务器资源使用情况

## 总结

通过本文的学习，你应该掌握了：
1. 高效的子查询编写方法
2. 复杂连接的优化技巧
3. 窗口函数的高级应用
4. 条件表达式的灵活运用
5. 性能优化的实用技巧

记住，编写高效的SQL不仅要考虑语法的正确性，更要注重查询的性能。建议在实际应用中多使用EXPLAIN分析查询计划，找出性能瓶颈并优化。

如果你在使用这些SQL技巧时遇到问题，欢迎在评论区讨论！
