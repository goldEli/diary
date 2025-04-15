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

### 构建项目

```bash
pnpm build
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