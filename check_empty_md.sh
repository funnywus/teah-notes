#!/bin/bash

# 遍历所有的 .md 文件
find . -name "*.md" -type f | while read -r file; do
    # 跳过 node_modules 目录
    if [[ $file == *"node_modules"* ]]; then
        continue
    fi
    
    # 跳过 index.md 文件
    if [[ $file == */index.md ]]; then
        continue
    fi

    # 获取文件内容，去除空行和只包含空格的行
    content=$(grep -v '^\s*$' "$file")
    
    # 检查文件是否只包含这些标题
    if [[ $(echo "$content" | grep -v '^#' | grep -v '^\s*$' | wc -l) -eq 0 ]] && \
       [[ $(echo "$content" | grep '^# ' | wc -l) -eq 1 ]] && \
       [[ $(echo "$content" | grep '^## 简介' | wc -l) -le 1 ]] && \
       [[ $(echo "$content" | grep '^## 主要内容' | wc -l) -le 1 ]] && \
       [[ $(echo "$content" | grep '^## 实践步骤' | wc -l) -le 1 ]] && \
       [[ $(echo "$content" | grep '^## 注意事项' | wc -l) -le 1 ]] && \
       [[ $(echo "$content" | grep '^## 总结' | wc -l) -le 1 ]]; then
        echo "$file"
    fi
done
