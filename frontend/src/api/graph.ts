import service, { requestWithRetry } from './index'
import type {
  ApiResponse,
  GenerateOntologyResult,
  BuildGraphResult,
  Task,
  GraphData,
  ProjectData,
} from '../types'

export function generateOntology(formData: FormData): Promise<ApiResponse<GenerateOntologyResult>> {
  return requestWithRetry(() =>
    service({
      url: '/api/graph/ontology/generate',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  )
}

export function buildGraph(data: { project_id: string }): Promise<ApiResponse<BuildGraphResult>> {
  return requestWithRetry(() =>
    service({ url: '/api/graph/build', method: 'post', data })
  )
}

export function getTaskStatus(taskId: string): Promise<ApiResponse<Task>> {
  return service({ url: `/api/graph/task/${taskId}`, method: 'get' })
}

export function getGraphData(graphId: string): Promise<ApiResponse<GraphData>> {
  return service({ url: `/api/graph/data/${graphId}`, method: 'get' })
}

export function getProject(projectId: string): Promise<ApiResponse<ProjectData>> {
  return service({ url: `/api/graph/project/${projectId}`, method: 'get' })
}
