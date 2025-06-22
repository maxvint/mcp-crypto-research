#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { registerProjectsTools } from './tools/projects.js'
import { registerReportsTools } from './tools/reports.js'
import { registerNewsTools } from './tools/news.js'

export const configSchema = z.object({
})

export const createServer = ({ config }: { config: z.infer<typeof configSchema> }) => {
	try {
		console.log('Starting Research MCP Server...')

		// Create a new MCP server
		const server = new McpServer({
			transport: {
				type: 'http-stream',
				port: process.env.PORT ?? 7002,
				stream: true,
				session: false,
			},
			name: 'Research MCP Server',
			version: '1.0.0',
		})

		// Register tool groups
		registerProjectsTools(server)
		registerReportsTools(server)
		registerNewsTools(server)

		console.log('Research MCP Server started on port', process.env.PORT ?? 7002)

		// 无状态流式 HTTP，直接返回底层 http server 实例
		return server.server
	} catch (e) {
		console.error(e)
		throw e
	}
}
