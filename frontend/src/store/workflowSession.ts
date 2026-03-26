import type { WorkflowSession } from '../types'

const SESSION_KEY = 'mirofish_session'

const ROUTE_LABELS: Record<string, string> = {
  Process: 'Step 1-2: Graph Build',
  Simulation: 'Step 2: Environment Setup',
  SimulationRun: 'Step 3: Run Simulation',
  Report: 'Step 4: Report Generation',
  Interaction: 'Step 5: Deep Interaction',
}

export const saveSession = (
  routeName: string,
  params: Record<string, string>,
  query: Record<string, string> = {}
): void => {
  if (!ROUTE_LABELS[routeName]) return
  const session: WorkflowSession = {
    routeName,
    params,
    query,
    label: ROUTE_LABELS[routeName],
    savedAt: Date.now(),
  }
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // localStorage unavailable, ignore
  }
}

export const getSession = (): WorkflowSession | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as WorkflowSession) : null
  } catch {
    return null
  }
}

export const clearSession = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // ignore
  }
}
