
import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { researchClient } from '../clients/research.client.js'

export function registerReportsTools(server: McpServer) {
	server.tool(
		'research_search_reports',
		'Search for reports on Research knowledge base.',
		{
			keyword: z.string().describe("Keyword to search for reports"),
			day: z.string().optional().default('today').describe("Day of results (default today)"),
		},
		async ({ keyword, day }) => {
			try {
				const reports = await researchClient.searchReports({ keyword, day })
				const simplifiedData = reports.map(report => ({
					id: report.id,
					title: report.title,
					summary: report.summary,
					author: report.author,
					publishedAt: report.publishedAt,
					category: report.category
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
