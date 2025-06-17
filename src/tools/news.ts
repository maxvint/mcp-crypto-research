
import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { researchClient } from '../clients/research.client.js'

export function registerNewsTools(server: McpServer) {
	server.tool(
		'research_search_news',
		'Search for news on Research knowledge base.',
		{
			keyword: z.string().optional().describe("Keyword to search for news"),
			category: z.string().optional().describe(`Category to search for news, support: ["Macro","巨鲸动向","相关项目","NFT & GameFi & SocialFi & DID & DAO & 内容创作","交易所/钱包","公链/L2","投融资","监管","安全","AI相关","其他","工具","观点"]`),
			source: z.string().optional().describe("Source to search for news"),
			startDate: z.string().optional().describe("Start date of results (default today), format: YYYY-MM-DD"),
			endDate: z.string().optional().describe("End date of results (default today), format: YYYY-MM-DD"),
			limit: z.number().optional().default(100).describe("Limit of results (default 100, max 100)"),
			offset: z.number().optional().default(0).describe("Offset of results (default 0)"),
			day: z.string().optional().default('today').describe("Day of results (default today), format: YYYY-MM-DD"),
			level: z.number().optional().default(1).describe("News level (default 3), 1: All, 2: Important, 3: Critical"),
		},
		async ({ keyword, category, source, startDate, endDate, limit, offset, day, level }) => {
			try {
				const newsData = await researchClient.searchNews({
					keyword,
					category,
					source,
					startDate,
					endDate,
					limit,
					offset,
					day,
					level
				})
				const simplifiedData = newsData.map(news => ({
					id: news.id,
					title: news.title,
					summary: news.summary,
					source: news.source,
					publishedAt: news.publishedAt,
					category: news.category
				}))
				return {
					content: [
						{
							type: 'text',
							text: JSON.stringify(simplifiedData, null, 2),
						},
					],
				}
			} catch (e: any) {
				return {
					content: [{ type: 'text', text: `Error: ${e.message}` }],
				}
			}
		},
	)
}
