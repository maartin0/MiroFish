import { reactive } from 'vue'

interface PendingUploadState {
  files: File[]
  simulationRequirement: string
  isPending: boolean
}

const state = reactive<PendingUploadState>({
  files: [],
  simulationRequirement: '',
  isPending: false
})

export function setPendingUpload(files: File[], requirement: string): void {
  state.files = files
  state.simulationRequirement = requirement
  state.isPending = true
}

export function getPendingUpload(): PendingUploadState {
  return {
    files: state.files,
    simulationRequirement: state.simulationRequirement,
    isPending: state.isPending
  }
}

export function clearPendingUpload(): void {
  state.files = []
  state.simulationRequirement = ''
  state.isPending = false
}

export default state
