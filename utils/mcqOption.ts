export type McqOption = {
  option: string
  is?: boolean
  explanation?: string
}

export const defaultOption: McqOption = {
  option: '',
  is: false,
  explanation: ''
}

export const createDefaultOption = (): McqOption => ({
  option: '',
  is: false,
  explanation: ''
})
