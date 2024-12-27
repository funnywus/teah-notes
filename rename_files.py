import os
import json
import re

def extract_routes_from_config():
    """从 config.mjs 中提取所有路由"""
    config_path = '.vitepress/config.mjs'
    routes = {}
    
    with open(config_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # 找到所有 link: '...' 的模式
        matches = re.finditer(r"link:\s*'([^']+)'", content)
        for match in matches:
            route = match.group(1)
            # 只处理实际的文章路由，忽略目录路由
            if route.endswith('/') or route == '#':
                continue
            # 将路由转换为文件路径
            file_path = route.lstrip('/')
            if not file_path.endswith('.md'):
                file_path += '.md'
            routes[file_path] = True
    
    return routes

def rename_files(routes):
    """重命名文件以匹配路由"""
    base_dir = '.'
    changes = []
    
    for root, _, files in os.walk(base_dir):
        for file in files:
            if not file.endswith('.md') or file == 'index.md':
                continue
                
            rel_dir = os.path.relpath(root, base_dir)
            if rel_dir == '.':
                rel_dir = ''
            
            current_path = os.path.join(rel_dir, file)
            # 跳过 node_modules
            if 'node_modules' in current_path:
                continue
                
            # 检查当前文件是否需要重命名
            for route_path in routes:
                if route_path.startswith(rel_dir + '/') and route_path != current_path:
                    route_filename = os.path.basename(route_path)
                    current_number = re.match(r'(\d+)-', file)
                    route_number = re.match(r'(\d+)-', route_filename)
                    
                    # 如果文件内容相似但编号不同，添加到更改列表
                    if (current_number and route_number and 
                        file.replace(current_number.group(1), '') == 
                        route_filename.replace(route_number.group(1), '')):
                        changes.append((
                            current_path,
                            route_path,
                            f"将 {current_path} 重命名为 {route_path}"
                        ))
                        break
    
    return changes

def apply_changes(changes):
    """应用更改"""
    print("\n找到以下需要重命名的文件：")
    for i, (old, new, desc) in enumerate(changes, 1):
        print(f"{i}. {desc}")
    
    if not changes:
        print("没有找到需要重命名的文件。")
        return
        
    confirm = input("\n是否应用这些更改？(y/n): ")
    if confirm.lower() == 'y':
        for old, new, _ in changes:
            try:
                # 确保目标目录存在
                os.makedirs(os.path.dirname(new), exist_ok=True)
                # 重命名文件
                os.rename(old, new)
                print(f"已重命名: {old} -> {new}")
            except Exception as e:
                print(f"重命名 {old} 时出错: {e}")
    else:
        print("操作已取消。")

def main():
    print("开始检查文件...")
    routes = extract_routes_from_config()
    changes = rename_files(routes)
    apply_changes(changes)

if __name__ == '__main__':
    main()
