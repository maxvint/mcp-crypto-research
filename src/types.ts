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


/**
 * 获取新闻列表输入
 */
export interface GetNewsInput {
  keyword?: string
  category?: string
  source?: string
  startDate?: string
  endDate?: string
  limit?: number
  offset?: number
  day?: string
  level?: number
}

/**
 * 获取新闻详情输入
 */
export interface GetNewsByIdInput {
  id: string
}

/**
 * 获取所有项目的输入接口
 */
export interface GetProjectsInput {
  // 可以添加过滤参数，如分类、标签等
}

/**
 * 通过 Twitter 用户名获取项目的输入接口
 */
export interface GetProjectByTwitterInput {
  username: string
}

/**
 * 根据 Twitter 用户名获取项目研究报告的输入接口
 */
export interface GetProjectReportsByTwitterInput {
  username: string
}

/**
 * 获取报告列表输入
 */
export interface GetReportsInput {
  keyword?: string
  day?: string
}
