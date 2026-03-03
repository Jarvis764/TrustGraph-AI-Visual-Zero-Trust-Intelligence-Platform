import axios from 'axios'

const API_BASE = '/api'

export const analyzeRisk = async (nodeData) => {
  const response = await axios.post(`${API_BASE}/analyze-risk`, nodeData)
  return response.data
}

export const generateExecutiveSummary = async (summaryData) => {
  const response = await axios.post(`${API_BASE}/executive-summary`, summaryData)
  return response.data
}

export const checkHealth = async () => {
  const response = await axios.get(`${API_BASE}/health`)
  return response.data
}
