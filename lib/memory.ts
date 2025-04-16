interface StorageItem {
  value: any;
  expiry?: number;
}

class MemoryStorage {
  private storage: Map<string, StorageItem>;

  constructor() {
    this.storage = new Map();
  }

  /**
   * 设置键值对，可选设置过期时间
   * @param key 键
   * @param value 值
   * @param ttl 过期时间（秒）
   */
  set(key: string, value: any, ttl?: number): void {
    const item: StorageItem = {
      value,
      expiry: ttl ? Date.now() + ttl * 1000 : undefined
    };
    this.storage.set(key, item);
  }

  /**
   * 获取键对应的值
   * @param key 键
   * @returns 值或undefined（如果不存在或已过期）
   */
  get(key: string): any | undefined {
    const item = this.storage.get(key);
    
    if (!item) {
      return undefined;
    }

    if (item.expiry && Date.now() > item.expiry) {
      this.storage.delete(key);
      return undefined;
    }

    return item.value;
  }

  /**
   * 删除键值对
   * @param key 键
   */
  delete(key: string): void {
    this.storage.delete(key);
  }

  /**
   * 清理所有过期的键值对
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.storage.entries()) {
      if (item.expiry && now > item.expiry) {
        this.storage.delete(key);
      }
    }
  }
}

// 创建单例实例
export const memoryStorage = new MemoryStorage();