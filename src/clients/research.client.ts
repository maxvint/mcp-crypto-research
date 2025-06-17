/**
 * Research Knowledge Base API 客户端
 * 提供与 Research Knowledge Base API 交互的方法
 */

import axios from 'axios'
import { Project, Report, News } from '../types'
import dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

// 从环境变量中获取 API 基础 URL，如果未设置则使用默认值
const DEFAULT_API_BASE_URL = process.env.API_BASE_URL || 'https://knowledge.csiodev.com'

export class ResearchClient {
  private baseUrl: string

  constructor(baseUrl: string = DEFAULT_API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  /**
   * 发送 GET 请求到 Research Knowledge Base API
   */
  private async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, { params })
      return response.data as T
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Research API error: ${error.response?.status} ${error.response?.statusText} - ${error.message}`)
      }
      throw new Error(`Research API error: ${error?.message || String(error)}`)
    }
  }

  /**
   * 获取所有项目
   */
  async getProjects(): Promise<Project[]> {
    return this.get<Project[]>('/projects')
  }

  /**
   * 通过 Twitter 用户名获取项目
   */
  async getProjectByTwitter(username: string): Promise<Project> {
    if (!username) {
      throw new Error('Twitter 用户名是必需的')
    }
    
    return this.get<Project>(`/projects/twitter/${username}`)
  }

  /**
   * 根据 Twitter 用户名获取项目研究报告
   */
  async getProjectReportsByTwitter(username: string): Promise<Report[]> {
    if (!username) {
      throw new Error('Twitter 用户名是必需的')
    }
    
    return this.get<Report[]>(`/projects/twitter/${username}/reports`)
  }

  /**
   * 获取所有研究报告
   * @param params 可选参数：keyword, day
   */
  async searchReports(params?: { keyword?: string; day?: string }): Promise<Report[]> {
    return this.get<Report[]>('/reports', params)
  }

  /**
   * 获取所有新闻
   * @param params 可选参数：keyword, category, source, startDate, endDate, limit, offset, day, level
   */
  async searchNews(params?: { 
    keyword?: string; 
    category?: string; 
    source?: string; 
    startDate?: string; 
    endDate?: string; 
    limit?: number; 
    offset?: number;
    day?: string;
    level?: number;
  }): Promise<News[]> {
    // 根据后端 API 的参数命名约定调整参数名称
    const queryParams: Record<string, any> = {}
    
    if (params?.keyword) queryParams.keyword = params.keyword
    if (params?.category) queryParams.category = params.category
    if (params?.source) queryParams.source = params.source
    if (params?.day) queryParams.day = params.day
    if (params?.level !== undefined) queryParams.level = params.level
    
    // 日期参数可能需要调整格式
    if (params?.startDate) queryParams.start_date = params.startDate
    if (params?.endDate) queryParams.end_date = params.endDate
    
    // 分页参数
    if (params?.limit !== undefined) queryParams.limit = params.limit
    if (params?.offset !== undefined) queryParams.offset = params.offset
    
    return this.get<News[]>('/news', queryParams)
  }

  /**
   * 获取单个新闻详情
   * @param id 新闻ID
   */
  async getNewsById(id: string): Promise<News> {
    if (!id) {
      throw new Error('新闻ID是必需的')
    }
    
    return this.get<News>(`/news/${id}`)
  }
}

// 导出单例实例，供整个应用程序使用
export const researchClient = new ResearchClient()
