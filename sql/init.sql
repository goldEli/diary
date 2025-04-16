-- Active: 1744807613263@@127.0.0.1@3306@diary
-- 创建数据库
CREATE DATABASE IF NOT EXISTS diary;
USE diary;

-- 创建用户表
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入初始管理员用户
INSERT INTO user (username, password) VALUES ('admin', '789456123');