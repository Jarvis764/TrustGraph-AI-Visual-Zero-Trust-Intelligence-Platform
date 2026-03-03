const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

router.post('/analyze-risk', async (req, res) => {
  try {
    const { nodeId, nodeType, nodeName, riskLevel, connections, isZeroTrustMode } = req.body;
    if (!nodeId || !nodeType) {
      return res.status(400).json({ error: 'nodeId and nodeType are required' });
    }
    const context = { nodeId, nodeType, nodeName, riskLevel, connections, isZeroTrustMode };
    const result = await aiService.analyzeRisk(context);
    res.json(result);
  } catch (error) {
    console.error('Risk analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze risk' });
  }
});

router.post('/executive-summary', async (req, res) => {
  try {
    const { nodes, edges, isZeroTrustMode, overallRisk } = req.body;
    if (!nodes || !edges) {
      return res.status(400).json({ error: 'nodes and edges are required' });
    }
    const context = { nodes, edges, isZeroTrustMode, overallRisk };
    const result = await aiService.generateExecutiveSummary(context);
    res.json(result);
  } catch (error) {
    console.error('Executive summary error:', error);
    res.status(500).json({ error: 'Failed to generate executive summary' });
  }
});

module.exports = router;
