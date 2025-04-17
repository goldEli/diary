-- Active: 1744812126392@@127.0.0.1@3306@diary
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

-- 创建日历表
CREATE TABLE IF NOT EXISTS diary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    date VARCHAR(20) NOT NULL,
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;