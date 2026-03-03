const { RISK_ANALYSIS_PROMPT, EXECUTIVE_SUMMARY_PROMPT } = require('../prompts/templates');

let openaiClient = null;
if (process.env.OPENAI_API_KEY) {
  const OpenAI = require('openai');
  openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const mockRiskResponses = {
  critical: {
    riskExplanation: 'This asset presents a CRITICAL security risk to the enterprise. It has excessive administrative privileges, lacks multi-factor authentication enforcement, and shows signs of lateral movement activity consistent with advanced persistent threat (APT) behavior. Threat intelligence indicates this asset type is actively targeted by nation-state actors.',
    remediationSteps: [
      'Immediately revoke all non-essential administrative privileges and apply principle of least privilege (PoLP)',
      'Enforce MFA via hardware security keys (FIDO2/WebAuthn) for all authentication events within 24 hours',
      'Isolate the asset in a micro-segmented network zone with strict east-west traffic controls',
      'Deploy endpoint detection and response (EDR) with behavioral analytics and enable real-time alerting',
      'Conduct forensic review of access logs for the past 90 days to identify potential data exfiltration or lateral movement'
    ],
    businessImpact: 'A breach of this asset could expose regulated data affecting 2.3M customer records, triggering GDPR fines of up to €20M or 4% of global annual turnover. Operational disruption could cost $4.2M per day in lost productivity. Reputational damage risk is severe with potential stock value impact of 8-12%.',
    riskReduction: 78
  },
  high: {
    riskExplanation: 'This asset carries HIGH risk due to misconfigured access controls and stale credentials. It serves as a potential pivot point in lateral movement attack chains. Security posture assessment reveals unpatched vulnerabilities (CVSSv3 score 8.1) and anomalous access patterns suggesting credential stuffing attempts.',
    remediationSteps: [
      'Rotate all service account credentials and implement automated secret rotation via HashiCorp Vault or Azure Key Vault',
      'Apply conditional access policies restricting authentication to compliant devices and known IP ranges',
      'Enable just-in-time (JIT) privileged access management to eliminate standing privileged sessions',
      'Implement network segmentation to restrict this asset\'s communication to required services only',
      'Deploy user and entity behavior analytics (UEBA) to establish behavioral baselines and detect anomalies'
    ],
    businessImpact: 'Exploitation of this asset could provide attackers access to sensitive business systems. Potential financial exposure includes regulatory fines ($1.2M), incident response costs ($800K), and productivity losses ($600K/day during remediation). Supply chain risk if asset connects to partner systems.',
    riskReduction: 62
  },
  medium: {
    riskExplanation: 'This asset presents MEDIUM risk with manageable exposure. Primary concerns include inadequate session management, insufficient logging and monitoring, and reliance on legacy authentication protocols. While not immediately critical, it could be exploited as part of a multi-stage attack chain targeting higher-value assets.',
    remediationSteps: [
      'Implement session timeout policies (15 min idle, 8 hr maximum) and enforce re-authentication for sensitive operations',
      'Enable comprehensive audit logging and forward to SIEM for correlation analysis',
      'Migrate from NTLM/Kerberos to modern authentication protocols (OAuth 2.0, OIDC)',
      'Deploy vulnerability scanning and patch management to address known CVEs within 30-day SLA',
      'Review and tighten firewall rules to eliminate unnecessary network exposure'
    ],
    businessImpact: 'Current risk level poses moderate business risk. If exploited, potential impact includes unauthorized data access affecting internal operations. Estimated remediation cost of $150K-300K. Compliance risk with SOC 2 Type II audit requirements if logging gaps persist.',
    riskReduction: 45
  },
  low: {
    riskExplanation: 'This asset maintains LOW risk posture with adequate security controls in place. It operates within defined security parameters with proper access controls and monitoring. Minor hardening opportunities exist to achieve security excellence and align with Zero Trust architecture principles.',
    remediationSteps: [
      'Enable advanced threat protection features and configure alerting thresholds for anomalous behavior',
      'Implement certificate-based authentication to eliminate password-based access',
      'Review third-party integrations and apply API security best practices (rate limiting, OAuth scopes)',
      'Schedule quarterly access reviews to maintain least-privilege principle over time',
      'Document asset inventory, data classification, and business owner information for compliance purposes'
    ],
    businessImpact: 'Low immediate business risk. Maintaining current security posture is recommended. Investment in proactive hardening measures will reduce attack surface and improve security metrics for upcoming compliance audits. Cost of preventive measures ($50K) significantly lower than potential breach costs.',
    riskReduction: 25
  }
};

async function analyzeRisk(context) {
  if (openaiClient) {
    try {
      const prompt = RISK_ANALYSIS_PROMPT(context);
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are an expert EY cybersecurity consultant specializing in Zero Trust architecture. Respond only with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });
      const content = completion.choices[0].message.content.trim();
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error('OpenAI error, falling back to mock:', err.message);
    }
  }

  const riskLevel = context.riskLevel || 'medium';
  const mockResponse = mockRiskResponses[riskLevel] || mockRiskResponses.medium;
  return {
    ...mockResponse,
    nodeId: context.nodeId,
    nodeName: context.nodeName,
    nodeType: context.nodeType,
    analyzedAt: new Date().toISOString(),
    source: 'mock'
  };
}

async function generateExecutiveSummary(context) {
  if (openaiClient) {
    try {
      const prompt = EXECUTIVE_SUMMARY_PROMPT(context);
      const completion = await openaiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are an EY Partner-level cybersecurity advisor preparing board-level reports. Respond only with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 2000
      });
      const content = completion.choices[0].message.content.trim();
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error('OpenAI error, falling back to mock:', err.message);
    }
  }

  const criticalNodes = (context.nodes || []).filter(n => n.data?.riskLevel === 'critical').length;
  const highNodes = (context.nodes || []).filter(n => n.data?.riskLevel === 'high').length;
  const totalNodes = (context.nodes || []).length;
  const overallRisk = context.overallRisk || 73;

  return {
    overallRiskScore: overallRisk,
    riskTrend: 'increasing',
    keyAttackPaths: [
      {
        path: 'BYOD Mobile → SAP ERP → Customer Database',
        severity: 'critical',
        description: 'Unmanaged mobile device with excessive ERP access creates direct path to sensitive customer PII and financial records',
        likelihood: 'High',
        impact: 'Critical'
      },
      {
        path: 'Jenkins CI → AWS S3 → Financial Records',
        severity: 'critical',
        description: 'Overprivileged CI/CD pipeline with hardcoded credentials can exfiltrate financial data via cloud storage lateral movement',
        likelihood: 'High',
        impact: 'Critical'
      },
      {
        path: 'Admin User → Azure AD → All Systems',
        severity: 'high',
        description: 'Admin account with global directory access and no MFA enforcement enables privilege escalation across all connected systems',
        likelihood: 'Medium',
        impact: 'Critical'
      },
      {
        path: 'IoT Device → Server → HR Database',
        severity: 'high',
        description: 'IoT device on flat network with server access exposes HR data through east-west movement exploitation',
        likelihood: 'Medium',
        impact: 'High'
      }
    ],
    zeroTrustImprovements: {
      riskReduction: context.isZeroTrustMode ? 67 : 0,
      attackPathsBlocked: context.isZeroTrustMode ? 18 : 0,
      assetsProtected: context.isZeroTrustMode ? Math.round(totalNodes * 0.8) : 0,
      complianceImprovement: context.isZeroTrustMode ? '94% NIST SP 800-207 alignment' : 'Not yet assessed',
      estimatedAnnualSavings: context.isZeroTrustMode
        ? { value: 3200000, display: '$3.2M in breach prevention' }
        : { value: 0, display: 'Calculate after ZT implementation' }
    },
    strategicRecommendations: [
      {
        priority: 1,
        title: 'Immediate: Enforce MFA Across All Privileged Accounts',
        effort: 'Low',
        impact: 'High',
        timeline: '30 days',
        detail: `${criticalNodes} critical assets including admin accounts and CI/CD pipelines lack mandatory MFA. Implementing FIDO2 hardware keys will reduce account takeover risk by 99.9%. Estimated cost: $45K. ROI: Prevents average breach cost of $4.45M.`
      },
      {
        priority: 2,
        title: 'Short-term: Deploy Network Micro-segmentation',
        effort: 'Medium',
        impact: 'High',
        timeline: '60 days',
        detail: `Current flat network architecture allows lateral movement across all ${totalNodes} assets. Implementing software-defined perimeter (SDP) and zero trust network access (ZTNA) will contain breach blast radius by 85%. Investment: $180K.`
      },
      {
        priority: 3,
        title: 'Medium-term: Implement Privileged Access Management (PAM)',
        effort: 'Medium',
        impact: 'High',
        timeline: '90 days',
        detail: `${highNodes + criticalNodes} high-risk accounts require just-in-time access provisioning and session recording. CyberArk or BeyondTrust deployment will eliminate standing privileges and provide forensic audit trails for compliance.`
      },
      {
        priority: 4,
        title: 'Strategic: Full Zero Trust Architecture Transformation',
        effort: 'High',
        impact: 'Critical',
        timeline: '12 months',
        detail: 'Implement comprehensive ZTA per NIST SP 800-207 including identity-centric access, continuous verification, and assume-breach principles. Board-approved investment of $2.1M projected to reduce cyber insurance premiums by 40% and achieve SOC 2 Type II, ISO 27001, and NIST CSF compliance.'
      }
    ],
    cfoSummary: `Your organization's current cybersecurity posture represents a ${overallRisk >= 75 ? 'CRITICAL' : overallRisk >= 50 ? 'SIGNIFICANT' : 'MODERATE'} financial risk. Based on Ponemon Institute benchmarks, companies with similar risk profiles experience an average breach cost of $4.45M. With ${criticalNodes} critical vulnerabilities identified across your digital infrastructure, the annual expected loss (AEL) is estimated at $2.8M. The proposed Zero Trust transformation investment of $2.1M delivers an IRR of 134% over 3 years, with $8.9M in breach prevention value. Cyber insurance market conditions in 2024 mandate evidence of ZTA adoption—without it, expect 35-45% premium increases at next renewal. Recommendation: Approve Phase 1 ($450K) immediately to address critical exposures and demonstrate risk management to auditors and insurers.`,
    complianceStatus: {
      GDPR: overallRisk > 70 ? 'At Risk' : 'Partial',
      'SOC 2 Type II': overallRisk > 60 ? 'Non-Compliant' : 'In Progress',
      'NIST CSF': overallRisk > 75 ? 'Tier 1 (Partial)' : 'Tier 2 (Risk Informed)',
      'ISO 27001': 'Gap Assessment Required',
      'NIST SP 800-207': context.isZeroTrustMode ? '94% Aligned' : '23% Aligned'
    },
    reportDate: new Date().toISOString(),
    preparedBy: 'EY Technology Consulting | Cybersecurity Practice',
    source: 'mock'
  };
}

module.exports = { analyzeRisk, generateExecutiveSummary };
