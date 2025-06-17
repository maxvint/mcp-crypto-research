import { ToolResultSchema } from '../types.js'
import { createSuccessResponse, createErrorResponse } from './utils.js'
import {
  GetProjectsInput,
  GetProjectByTwitterInput,
  GetProjectReportsByTwitterInput
} from '../types/projects.types.js'
import { getResearchClient } from '../clients/research.factory.js'

// 获取适当的客户端（真实或模拟）
const researchClient = getResearchClient()

/**
 * 获取所有项目的处理程序
 */
export const getProjectsHandler = async (input: GetProjectsInput): Promise<ToolResultSchema> => {
  try {
    const projectsData = await researchClient.getProjects()
    // 只返回前 3 个项目，并且只包含基本信息
    const simplifiedData = projectsData.map((project: any) => ({
      id: project.id,
      name: project.project_name,
      description: project.description,
      twitter: project.twitter_username
    }))
    return createSuccessResponse(`项目列表: ${JSON.stringify(simplifiedData, null, 2)}`)
  } catch (error) {
    const errorMsg = `获取项目列表时出错: ${error instanceof Error ? error.message : String(error)}`
    console.error(errorMsg)
    return createErrorResponse(errorMsg)
  }
}

/**
 * 通过 Twitter 用户名获取项目的处理程序
 */
export const getProjectByTwitterHandler = async (input: GetProjectByTwitterInput): Promise<ToolResultSchema> => {
  try {
    const projectData = await researchClient.getProjectByTwitter(input.username)
    return createSuccessResponse(`项目信息: ${JSON.stringify(projectData, null, 2)}`)
  } catch (error) {
    const errorMsg = `获取项目信息时出错: ${error instanceof Error ? error.message : String(error)}`
    console.error(errorMsg) // 添加控制台错误输出
    return createErrorResponse(errorMsg)
  }
}

/**
 * 根据 Twitter 用户名获取项目研究报告的处理程序
 */
export const getProjectReportsByTwitterHandler = async (input: GetProjectReportsByTwitterInput): Promise<ToolResultSchema> => {
  try {
    const reportsData = await researchClient.getProjectReportsByTwitter(input.username)
    return createSuccessResponse(`项目研究报告: ${JSON.stringify(reportsData, null, 2)}`)
  } catch (error) {
    return createErrorResponse(`获取项目研究报告时出错: ${error instanceof Error ? error.message : String(error)}`)
  }
}
