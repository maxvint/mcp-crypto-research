/**
 * MCP 工具结果模式
 */
export type ToolResultSchema = {
  content: Array<{
    type: string;
    text: string;
  }>;
  isError: boolean;
};


/**
 * 项目接口
 */
export interface Project {
  id: string
  name: string
  description: string
  twitter?: string
  website?: string
  category?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

/**
 * 研究报告接口
 */
export interface Report {
  id: string
  title: string
  summary: string
  content: string
  projectId?: string
  author: string
  publishedAt: string
  category?: string
  tags?: string[]
}

/**
 * 新闻接口
 */
export interface News {
  id: string
  title: string
  content: string
  summary?: string
  source: string
  url: string
  publishedAt: string
  category?: string
  tags?: string[]
}
