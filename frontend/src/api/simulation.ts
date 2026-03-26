import service, { requestWithRetry } from './index'
import type {
  ApiResponse,
  SimulationData,
  SimulationProfile,
  SimulationConfig,
  PrepareSimulationResult,
  PrepareStatusResult,
  ProfilesRealtimeResult,
  ConfigRealtimeResult,
  StartSimulationResult,
  RunStatus,
  RunStatusDetailResult,
  SimulationAction,
  HistoryProject,
} from '../types'

export const createSimulation = (data: {
  project_id: string
  graph_id?: string
  enable_twitter?: boolean
  enable_reddit?: boolean
}): Promise<ApiResponse<{ simulation_id: string }>> => {
  return requestWithRetry(() => service.post('/api/simulation/create', data), 3, 1000)
}

export const prepareSimulation = (data: {
  simulation_id: string
  entity_types?: string[]
  use_llm_for_profiles?: boolean
  parallel_profile_count?: number
  force_regenerate?: boolean
}): Promise<ApiResponse<PrepareSimulationResult>> => {
  return requestWithRetry(() => service.post('/api/simulation/prepare', data), 3, 1000)
}

export const getPrepareStatus = (data: {
  task_id?: string | null
  simulation_id?: string
}): Promise<ApiResponse<PrepareStatusResult>> => {
  return service.post('/api/simulation/prepare/status', data)
}

export const getSimulation = (simulationId: string): Promise<ApiResponse<SimulationData>> => {
  return service.get(`/api/simulation/${simulationId}`)
}

export const getSimulationProfiles = (
  simulationId: string,
  platform: 'reddit' | 'twitter' = 'reddit'
): Promise<ApiResponse<{ profiles: SimulationProfile[] }>> => {
  return service.get(`/api/simulation/${simulationId}/profiles`, { params: { platform } })
}

export const getSimulationProfilesRealtime = (
  simulationId: string,
  platform: 'reddit' | 'twitter' = 'reddit'
): Promise<ApiResponse<ProfilesRealtimeResult>> => {
  return service.get(`/api/simulation/${simulationId}/profiles/realtime`, { params: { platform } })
}

export const getSimulationConfig = (simulationId: string): Promise<ApiResponse<SimulationConfig>> => {
  return service.get(`/api/simulation/${simulationId}/config`)
}

export const getSimulationConfigRealtime = (
  simulationId: string
): Promise<ApiResponse<ConfigRealtimeResult>> => {
  return service.get(`/api/simulation/${simulationId}/config/realtime`)
}

export const listSimulations = (projectId?: string): Promise<ApiResponse<SimulationData[]>> => {
  const params = projectId ? { project_id: projectId } : {}
  return service.get('/api/simulation/list', { params })
}

export const startSimulation = (data: {
  simulation_id: string
  platform?: string
  max_rounds?: number
  force?: boolean
  enable_graph_memory_update?: boolean
}): Promise<ApiResponse<StartSimulationResult>> => {
  return requestWithRetry(() => service.post('/api/simulation/start', data), 3, 1000)
}

export const stopSimulation = (data: {
  simulation_id: string
}): Promise<ApiResponse<{ simulation_id: string; runner_status: string }>> => {
  return service.post('/api/simulation/stop', data)
}

export const getRunStatus = (simulationId: string): Promise<ApiResponse<RunStatus>> => {
  return service.get(`/api/simulation/${simulationId}/run-status`)
}

export const getRunStatusDetail = (
  simulationId: string
): Promise<ApiResponse<RunStatusDetailResult>> => {
  return service.get(`/api/simulation/${simulationId}/run-status/detail`)
}

export const getSimulationPosts = (
  simulationId: string,
  platform: 'reddit' | 'twitter' = 'reddit',
  limit = 50,
  offset = 0
): Promise<ApiResponse<unknown>> => {
  return service.get(`/api/simulation/${simulationId}/posts`, {
    params: { platform, limit, offset }
  })
}

export const getSimulationTimeline = (
  simulationId: string,
  startRound = 0,
  endRound?: number
): Promise<ApiResponse<unknown>> => {
  const params: Record<string, number> = { start_round: startRound }
  if (endRound !== null && endRound !== undefined) {
    params.end_round = endRound
  }
  return service.get(`/api/simulation/${simulationId}/timeline`, { params })
}

export const getAgentStats = (simulationId: string): Promise<ApiResponse<unknown>> => {
  return service.get(`/api/simulation/${simulationId}/agent-stats`)
}

export const getSimulationActions = (
  simulationId: string,
  params: {
    limit?: number
    offset?: number
    platform?: string
    agent_id?: string
    round_num?: number
  } = {}
): Promise<ApiResponse<{ actions: SimulationAction[] }>> => {
  return service.get(`/api/simulation/${simulationId}/actions`, { params })
}

export const closeSimulationEnv = (data: {
  simulation_id: string
  timeout?: number
}): Promise<ApiResponse<unknown>> => {
  return service.post('/api/simulation/close-env', data)
}

export const getEnvStatus = (data: {
  simulation_id: string
}): Promise<ApiResponse<{ env_alive: boolean }>> => {
  return service.post('/api/simulation/env-status', data)
}

export const interviewAgents = (data: {
  simulation_id: string
  interviews: Array<{ agent_id: string; prompt: string }>
}): Promise<ApiResponse<unknown>> => {
  return requestWithRetry(() => service.post('/api/simulation/interview/batch', data), 3, 1000)
}

export const getSimulationHistory = (limit = 20): Promise<ApiResponse<HistoryProject[]>> => {
  return service.get('/api/simulation/history', { params: { limit } })
}
