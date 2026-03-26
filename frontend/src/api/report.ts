import service, { requestWithRetry } from './index'
import type {
  ApiResponse,
  GenerateReportResult,
  ReportStatusResult,
  AgentLogResult,
  ConsoleLogResult,
  ReportData,
} from '../types'

export const generateReport = (data: {
  simulation_id: string
  force_regenerate?: boolean
}): Promise<ApiResponse<GenerateReportResult>> => {
  return requestWithRetry(() => service.post('/api/report/generate', data), 3, 1000)
}

export const getReportStatus = (reportId: string): Promise<ApiResponse<ReportStatusResult>> => {
  return service.get('/api/report/generate/status', { params: { report_id: reportId } })
}

export const getAgentLog = (
  reportId: string,
  fromLine = 0
): Promise<ApiResponse<AgentLogResult>> => {
  return service.get(`/api/report/${reportId}/agent-log`, { params: { from_line: fromLine } })
}

export const getConsoleLog = (
  reportId: string,
  fromLine = 0
): Promise<ApiResponse<ConsoleLogResult>> => {
  return service.get(`/api/report/${reportId}/console-log`, { params: { from_line: fromLine } })
}

export const getReport = (reportId: string): Promise<ApiResponse<ReportData>> => {
  return service.get(`/api/report/${reportId}`)
}

export const chatWithReport = (data: {
  simulation_id: string
  message: string
  chat_history?: Array<{ role: string; content: string }>
}): Promise<ApiResponse<{ response: string }>> => {
  return requestWithRetry(() => service.post('/api/report/chat', data), 3, 1000)
}
