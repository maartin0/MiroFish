// ─── API response wrapper ────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  error?: string
  message?: string
}

// ─── Ontology / Graph ────────────────────────────────────────────────────────

export interface OntologyAttribute {
  name: string
  type?: string
  description?: string
}

export interface EntityTypeDefinition {
  name: string
  description: string
  attributes?: OntologyAttribute[]
  examples?: string[]
}

export interface EdgeTypeDefinition {
  name: string
  description: string
  source_targets?: Array<{ source: string; target: string }>
}

export interface Ontology {
  entity_types: EntityTypeDefinition[]
  edge_types: EdgeTypeDefinition[]
}

export interface ProjectData {
  project_id: string
  graph_id: string
  status: string
  graph_build_task_id?: string
  simulation_requirement?: string
  ontology?: Ontology
}

export interface GraphNode {
  uuid: string
  name: string
  labels?: string[]
  [key: string]: unknown // D3 adds x, y, vx, vy at runtime
}

export interface GraphEdge {
  source_node_uuid: string
  target_node_uuid: string
  name?: string
  fact_type?: string
  [key: string]: unknown // D3 mutates source/target at runtime
}

export interface GraphData {
  node_count?: number
  edge_count?: number
  nodes?: GraphNode[]
  edges?: GraphEdge[]
}

// ─── Tasks ───────────────────────────────────────────────────────────────────

export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface TaskProgressDetail {
  current_stage: string
  current_stage_name: string
  stage_index: number
  total_stages: number
  current_item: number
  total_items: number
  item_description: string
}

export interface Task {
  task_id: string
  status: TaskStatus
  progress: number
  message: string
  error?: string
  result?: unknown
  progress_detail?: TaskProgressDetail
}

// ─── Simulation ──────────────────────────────────────────────────────────────

export interface SimulationProfile {
  username: string
  entity_type: string
  interested_topics: string[]
  name: string
  profession: string
  bio?: string
  age?: number
  gender?: string
  country?: string
  mbti?: string
  persona?: string
}

export interface TimeConfig {
  total_simulation_hours: number
  minutes_per_round: number
  total_rounds?: number
  agents_per_hour_min?: number
  agents_per_hour_max?: number
  peak_hours?: number[]
  peak_activity_multiplier?: number
  work_hours?: number[]
  work_activity_multiplier?: number
  morning_hours?: number[]
  morning_activity_multiplier?: number
  off_peak_hours?: number[]
  off_peak_activity_multiplier?: number
}

export interface InitialPost {
  poster_type?: string
  poster_agent_id?: number
  content: string
}

export interface EventConfig {
  narrative_direction: string
  hot_topics?: string[]
  initial_posts?: InitialPost[]
}

export interface AgentConfig {
  agent_id: string
  entity_name: string
  stance?: string
  entity_type?: string
  active_hours?: number[]
  posts_per_hour?: number
  comments_per_hour?: number
  response_delay_min?: number
  response_delay_max?: number
  activity_level?: number
  sentiment_bias?: number
  influence_weight?: number
}

export interface PlatformConfig {
  recency_weight?: number
  popularity_weight?: number
  relevance_weight?: number
  viral_threshold?: number
  echo_chamber_strength?: number
  [key: string]: unknown
}

export interface SimulationConfig {
  time_config?: TimeConfig
  event_config?: EventConfig
  agent_configs?: AgentConfig[]
  twitter_config?: PlatformConfig
  reddit_config?: PlatformConfig
  generation_reasoning?: string
}

export type RunnerStatus = 'running' | 'idle' | 'stopped' | 'completed' | 'error'

export interface RunStatus {
  simulation_id: string
  runner_status: RunnerStatus
  current_round: number
  total_rounds: number
  progress_percent: number
  simulated_hours?: number
  total_simulation_hours?: number
  twitter_simulated_hours?: number
  reddit_simulated_hours?: number
  twitter_running: boolean
  reddit_running: boolean
  twitter_current_round: number
  reddit_current_round: number
  twitter_actions_count?: number
  reddit_actions_count?: number
  total_actions_count: number
  twitter_completed?: boolean
  reddit_completed?: boolean
  process_pid?: number
  force_restarted?: boolean
  max_rounds?: number
  started_at?: string
  updated_at?: string
}

export interface SimulationAction {
  round_num: number
  timestamp: string
  agent_name: string
  action_type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action_args: Record<string, any>
  platform: 'twitter' | 'reddit'
  id?: string
  agent_id?: number | string
  _uniqueId?: string
}

export interface RunStatusDetailResult {
  run_state: RunStatus
  actions: SimulationAction[]
  all_actions?: SimulationAction[]
}

export interface SimulationData {
  simulation_id: string
  project_id: string
  status: string
  runner_status?: RunnerStatus
  current_round?: number
  total_rounds?: number
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export interface ReportSection {
  title: string
  description: string
}

export interface ReportOutline {
  title: string
  summary: string
  sections: ReportSection[]
}

export interface AgentLogDetails {
  tool_name?: string
  parameters?: Record<string, unknown>
  result?: string
  result_length?: number
  iteration?: number
  has_tool_calls?: boolean
  has_final_answer?: boolean
  response?: string
  content?: string
  message?: string
  outline?: ReportOutline
  [key: string]: unknown
}

export interface AgentLog {
  action: string
  timestamp: string
  section_index?: number
  section_title?: string
  details?: AgentLogDetails
  elapsed_seconds?: number
  progress_detail?: string
}

export interface ReportData {
  report_id: string
  simulation_id: string
  status: string
}

// ─── Chat / Interaction ──────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface SurveyResult {
  agent_id: string
  agent_name: string
  profession: string
  question: string
  answer: string
}

// ─── History ─────────────────────────────────────────────────────────────────

export interface HistoryProject {
  project_id: string
  simulation_id: string
  report_id?: string
  graph_id: string
  simulation_requirement: string
  current_round: number
  total_rounds: number
  created_at: string
  documents?: string[]
  files?: Array<{ filename: string }>
}

// ─── UI helpers ──────────────────────────────────────────────────────────────

export interface SystemLog {
  time: string
  msg: string
}

export interface WorkflowSession {
  routeName: string
  params: Record<string, string>
  query: Record<string, string>
  label: string
  savedAt: number
}

// ─── Step1 selection item ────────────────────────────────────────────────────

export interface OntologyItem {
  itemType: 'entity' | 'edge'
  name: string
  description: string
  attributes?: OntologyAttribute[]
  examples?: string[]
  source_targets?: Array<{ source: string; target: string }>
}

// ─── Prepare simulation response ─────────────────────────────────────────────

export interface PrepareSimulationResult {
  task_id: string
  already_prepared?: boolean
  expected_entities_count?: number
  entity_types?: string[]
}

export interface PrepareStatusResult {
  status: string
  progress: number
  message: string
  error?: string
  progress_detail?: TaskProgressDetail
  already_prepared?: boolean
}

// ─── Realtime profile/config responses ───────────────────────────────────────

export interface ProfilesRealtimeResult {
  profiles: SimulationProfile[]
  total_expected?: number
}

export interface ConfigSummary {
  total_agents: number
  simulation_hours: number
  initial_posts_count: number
  hot_topics_count: number
  has_twitter_config: boolean
  has_reddit_config: boolean
}

export interface ConfigRealtimeResult {
  config_generated: boolean
  config?: SimulationConfig
  generation_stage?: string
  summary?: ConfigSummary
}

// ─── Generate ontology response ───────────────────────────────────────────────

export interface GenerateOntologyResult {
  project_id: string
  ontology: Ontology
  status: string
}

// ─── Build graph response ─────────────────────────────────────────────────────

export interface BuildGraphResult {
  task_id: string
}

// ─── Report generation ────────────────────────────────────────────────────────

export interface GenerateReportResult {
  report_id: string
  task_id?: string
}

export interface ReportStatusResult {
  status: string
  outline?: ReportOutline
  section_index?: number
  content?: string
}

export interface AgentLogResult {
  logs: AgentLog[]
  total_lines: number
  from_line?: number
}

export interface ConsoleLogResult {
  logs: string[]
  total_lines: number
  from_line?: number
}

// ─── Start simulation response ────────────────────────────────────────────────

export interface StartSimulationResult extends RunStatus {
  // RunStatus fields are included
}
