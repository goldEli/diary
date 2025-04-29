# 日记管理工具

一个简洁优雅的在线日记管理工具，帮助你记录每一天的点点滴滴。

## 功能特点

- 📝 简洁的写作界面
- 📅 按日期组织日记
- 🔄 实时保存
- 📱 响应式设计，支持多端访问
- 💾 本地CSV文件存储，数据安全可控

## 技术栈

- **前端框架**: Next.js 15
- **UI组件**: Radix UI
- **样式方案**: TailwindCSS
- **数据存储**: CSV文件系统
- **开发语言**: TypeScript

## 开发指南

### 环境要求

- Node.js 18+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

启动后访问 http://localhost:3000

## 部署说明

```bash
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://docker.imgdb.de",
    "https://docker-0.unsee.tech",
    "https://docker.hlmirror.com",
    "https://cjie.eu.org"
    ]
}
EOF
```

### Linux服务器准备
1. 安装必要依赖
```bash
sudo apt update
sudo apt install -y nodejs pnpm docker docker-compose
sudo apt install -y docker docker-compose
```

2. 克隆项目
```bash
git clone https://github.com/your-repo/diary.git
cd diary
```

3. 安装项目依赖
```bash
pnpm install
```

### 维护与日志
1. 查看应用日志
```bash
docker-compose logs -f
# 或
pm2 logs diary
```

2. 查看系统资源使用
```bash
docker stats
# 或
top
```

3. 备份数据
```bash
cp -r data/ data_backup_$(date +%Y%m%d)
```

4. 清理旧日志
```bash
pm2 flush
# 或
find /var/log/ -name "diary*" -mtime +30 -delete
```

### 构建项目

```bash
pnpm build
```

### Docker部署

#### 首次部署

1. 构建镜像
```bash
docker-compose build
```

2. 启动服务
```bash
docker-compose up -d
```

3. 查看服务状态
```bash
docker-compose ps
```

4. 查看日志
```bash
docker-compose logs -f
```

5. 停止服务
```bash
docker-compose down
```

#### 代码更新后重新部署

1. 停止并移除现有容器
```bash
docker-compose down
```

2. 拉取最新代码
```bash
git pull
```

3. 重新构建镜像
```bash
docker-compose build --no-cache
```

4. 启动新服务
```bash
docker-compose up -d
```

5. 验证部署
```bash
# 查看容器状态
docker-compose ps

# 查看应用日志
docker-compose logs -f
```

### 使用PM2部署

1. 全局安装PM2
```bash
npm install -g pm2
```

2. 启动应用
```bash
pm2 start ecosystem.config.js
```

3. 查看应用状态
```bash
pm2 status
```

4. 查看日志
```bash
pm2 logs diary
```

5. 停止应用
```bash
pm2 stop diary
```

6. 重启应用
```bash
pm2 restart diary
```

### 数据存储

日记数据以CSV格式存储在 `data` 目录下，按年份命名（如 `diaries_2025.csv`）。请确保该目录具有适当的读写权限。

## 许可证

MIT