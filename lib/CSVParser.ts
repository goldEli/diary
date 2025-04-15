import { parse, parse as parseSync } from 'csv-parse/sync';
import { parse as asyncParse } from 'csv-parse';
import fs from 'fs';
import { promisify } from 'util';

// 定义 CSV 解析选项类型
interface CSVParserOptions {
  delimiter?: string;
  quote?: string;
  escape?: string;
  columns?: boolean | string[] | ((record: any) => any);
  skip_empty_lines?: boolean;
  trim?: boolean;
  cast?: boolean | ((value: string, context: CastingContext) => any);
  on_record?: (record: any) => any;
  // 可以添加其他 csv-parse 支持的选项
}

// csv-parse 的 CastingContext 类型
interface CastingContext {
  column?: string | number;
  header?: boolean;
  index?: number;
  records?: number;
}

// 默认配置
const DEFAULT_OPTIONS: CSVParserOptions = {
  delimiter: ',',
  quote: '"',
  escape: '\\',
  columns: true,
  skip_empty_lines: true,
  trim: true,
  cast: true
};

/**
 * CSV 解析工具类
 */
export class CSVParser {
  /**
   * 同步解析CSV字符串或Buffer
   * @param input CSV内容
   * @param options 解析选项
   * @returns 解析后的数据数组
   */
  public static parseSync<T = any>(input: string | Buffer, options: CSVParserOptions = {}): T[] {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
    return parseSync(input, mergedOptions) as T[];
  }

  /**
   * 异步解析CSV字符串或Buffer (Promise方式)
   * @param input CSV内容
   * @param options 解析选项
   * @returns Promise解析后的数据数组
   */
  public static async parseAsync<T = any>(input: string | Buffer, options: CSVParserOptions = {}): Promise<T[]> {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
    const parsePromise = promisify<string | Buffer, CSVParserOptions, T[]>(asyncParse);
    return await parsePromise(input, mergedOptions);
  }

  /**
   * 从文件同步读取并解析CSV
   * @param filePath 文件路径
   * @param options 解析选项
   * @returns 解析后的数据数组
   */
  public static parseFileSync<T = any>(filePath: string, options: CSVParserOptions = {}): T[] {
    const csvData = fs.readFileSync(filePath);
    return CSVParser.parseSync<T>(csvData, options);
  }

  /**
   * 从文件异步读取并解析CSV (Promise方式)
   * @param filePath 文件路径
   * @param options 解析选项
   * @returns Promise解析后的数据数组
   */
  public static async parseFileAsync<T = any>(filePath: string, options: CSVParserOptions = {}): Promise<T[]> {
    const csvData = await fs.promises.readFile(filePath);
    return await CSVParser.parseAsync<T>(csvData, options);
  }

  /**
   * 流式解析CSV文件 (适合大文件)
   * @param filePath 文件路径
   * @param options 解析选项
   * @param onData 每行数据回调
   * @returns Promise解析后的完整数据数组
   */
  public static async parseFileAsStream<T = any>(
    filePath: string,
    options: CSVParserOptions = {},
    onData?: (record: T) => void
  ): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
      const parser = asyncParse(mergedOptions);
      const result: T[] = [];

      parser.on('readable', () => {
        let record: T;
        while ((record = parser.read() as T) !== null) {
          if (onData) onData(record);
          result.push(record);
        }
      });

      parser.on('error', (err) => reject(err));
      parser.on('end', () => resolve(result));

      fs.createReadStream(filePath)
        .on('error', (err) => reject(err))
        .pipe(parser);
    });
  }
}