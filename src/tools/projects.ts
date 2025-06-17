
import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { researchClient } from '../clients/research.client.js'

export function registerProjectsTools(server: McpServer) {
	server.tool(
		'research_get_projects',
		'Search for projects on Research knowledge base.',
		{},
		async () => {
			try {
				const projects = await researchClient.getProjects()
				return {
					content: [
						{
							type: 'text',
							text: JSON.stringify(projects, null, 2),
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

	server.tool(
		'research_get_project_by_twitter',
		'Get project details by Twitter username on Research knowledge base.',
		{
			username: z.string().describe('Twitter username of the project'),
		},
		async (args: { username: string }) => {
			try {
				const project = await researchClient.getProjectByTwitter(args.username)
				return {
					content: [
						{
							type: 'text',
							text: JSON.stringify(project, null, 2),
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

	server.tool(
		'research_get_project_reports_by_twitter',
		'Get project reports by Twitter username on Research knowledge base.',
		{
			username: z.string().describe('Twitter username of the project'),
		},
		async (args: { username: string }) => {
			try {
				const reports = await researchClient.getProjectReportsByTwitter(args.username)
				return {
					content: [
						{
							type: 'text',
							text: JSON.stringify(reports, null, 2),
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
