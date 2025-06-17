/**
 * Research 客户端工厂
 * 导出 Research 客户端实例
 */

import { ResearchClient, researchClient } from './research.client.js'

/**
 * 获取 Research 客户端
 */
export function getResearchClient(): ResearchClient {
  return researchClient
}
