import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Process from '../views/MainView.vue'
import SimulationView from '../views/SimulationView.vue'
import SimulationRunView from '../views/SimulationRunView.vue'
import ReportView from '../views/ReportView.vue'
import InteractionView from '../views/InteractionView.vue'
import { saveSession } from '../store/workflowSession'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/process/:projectId', name: 'Process', component: Process, props: true },
  { path: '/simulation/:simulationId', name: 'Simulation', component: SimulationView, props: true },
  { path: '/simulation/:simulationId/start', name: 'SimulationRun', component: SimulationRunView, props: true },
  { path: '/report/:reportId', name: 'Report', component: ReportView, props: true },
  { path: '/interaction/:reportId', name: 'Interaction', component: InteractionView, props: true }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  if (to.name !== 'Home') {
    saveSession(
      to.name as string,
      to.params as Record<string, string>,
      to.query as Record<string, string>
    )
  }
})

export default router
