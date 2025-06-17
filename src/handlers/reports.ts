/**
 * 研究报告处理程序
 */
import { researchClient } from '../clients/research.client.js'
import { ToolResultSchema } from '../types.js'
import { createSuccessResponse, createErrorResponse } from './utils.js'
import { GetReportsInput } from '../types/reports.types.js'

/**
 * 获取研究报告列表处理程序
 */
export const getReportsHandler = async (input: GetReportsInput): Promise<ToolResultSchema> => {
  try {
    const reportsData = await researchClient.getReports({
      keyword: input.keyword,
      day: input.day
    })
    
    // 简化返回的数据，只包含基本信息
    const simplifiedData = reportsData.map(report => ({
      id: report.id,
      title: report.title,
      summary: report.summary,
      author: report.author,
      publishedAt: report.publishedAt,
      category: report.category
    }))
    
    return createSuccessResponse(`研究报告列表: ${JSON.stringify(simplifiedData, null, 2)}`)
  } catch (error) {
    const errorMsg = `获取研究报告列表时出错: ${error instanceof Error ? error.message : String(error)}`
    console.error(errorMsg)
    return createErrorResponse(errorMsg)
  }
}
