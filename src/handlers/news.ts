/**
 * 新闻处理程序
 */
import { researchClient } from '../clients/research.client.js'
import { ToolResultSchema } from '../types.js'
import { createSuccessResponse, createErrorResponse } from './utils.js'
import { GetNewsInput, GetNewsByIdInput } from '../types/news.types.js'

/**
 * 获取新闻列表处理程序
 */
export const getNewsHandler = async (input: GetNewsInput): Promise<ToolResultSchema> => {
  try {
    const newsData = await researchClient.getNews({
      keyword: input.keyword,
      category: input.category,
      source: input.source,
      startDate: input.startDate,
      endDate: input.endDate,
      limit: input.limit,
      offset: input.offset,
      day: input.day,
      level: input.level
    })
    
    // 简化返回的数据，只包含基本信息
    const simplifiedData = newsData.map(news => ({
      id: news.id,
      title: news.title,
      summary: news.summary,
      source: news.source,
      publishedAt: news.publishedAt,
      category: news.category
    }))
    
    return createSuccessResponse(`新闻列表: ${JSON.stringify(simplifiedData, null, 2)}`)
  } catch (error) {
    const errorMsg = `获取新闻列表时出错: ${error instanceof Error ? error.message : String(error)}`
    console.error(errorMsg)
    return createErrorResponse(errorMsg)
  }
}

/**
 * 获取新闻详情处理程序
 */
export const getNewsByIdHandler = async (input: GetNewsByIdInput): Promise<ToolResultSchema> => {
  try {
    if (!input.id) {
      throw new Error('新闻ID是必需的')
    }
    
    const newsData = await researchClient.getNewsById(input.id)
    return createSuccessResponse(`新闻详情: ${JSON.stringify(newsData, null, 2)}`)
  } catch (error) {
    const errorMsg = `获取新闻详情时出错: ${error instanceof Error ? error.message : String(error)}`
    console.error(errorMsg)
    return createErrorResponse(errorMsg)
  }
}
