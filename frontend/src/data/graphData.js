export const initialNodes = [
  // ===== USERS =====
  {
    id: 'admin-user',
    type: 'custom',
    position: { x: 80, y: 200 },
    data: {
      id: 'admin-user',
      label: 'Admin User',
      nodeType: 'user',
      riskLevel: 'critical',
      riskScore: 95,
      description: 'Global IT administrator with unrestricted access across all enterprise systems. No MFA enforced.',
      icon: '👤',
      connections: ['azure-ad', 'customer-db', 'financial-records'],
      department: 'IT',
      lastAccess: '2 min ago',
      permissions: ['global-admin', 'super-user', 'read-write-all']
    }
  },
  {
    id: 'finance-analyst',
    type: 'custom',
    position: { x: 80, y: 360 },
    data: {
      id: 'finance-analyst',
      label: 'Finance Analyst',
      nodeType: 'user',
      riskLevel: 'high',
      riskScore: 72,
      description: 'Finance team member with broad ERP access and direct database permissions beyond job scope.',
      icon: '👤',
      connections: ['sap-erp', 'financial-records'],
      department: 'Finance',
      lastAccess: '15 min ago',
      permissions: ['financial-read', 'erp-access', 'report-generate']
    }
  },
  {
    id: 'devops-engineer',
    type: 'custom',
    position: { x: 80, y: 520 },
    data: {
      id: 'devops-engineer',
      label: 'DevOps Engineer',
      nodeType: 'user',
      riskLevel: 'high',
      riskScore: 78,
      description: 'DevOps engineer with CI/CD pipeline admin rights and production server SSH access.',
      icon: '👤',
      connections: ['jenkins-ci', 'server-1'],
      department: 'Engineering',
      lastAccess: '5 min ago',
      permissions: ['ci-cd-admin', 'cloud-deploy', 'server-ssh']
    }
  },
  {
    id: 'hr-manager',
    type: 'custom',
    position: { x: 80, y: 680 },
    data: {
      id: 'hr-manager',
      label: 'HR Manager',
      nodeType: 'user',
      riskLevel: 'medium',
      riskScore: 45,
      description: 'HR manager with access to employee records and SAP HR module.',
      icon: '👤',
      connections: ['hr-database', 'sap-erp'],
      department: 'HR',
      lastAccess: '1 hr ago',
      permissions: ['hr-db-read', 'employee-records']
    }
  },
  {
    id: 'sales-rep',
    type: 'custom',
    position: { x: 80, y: 840 },
    data: {
      id: 'sales-rep',
      label: 'Sales Rep',
      nodeType: 'user',
      riskLevel: 'low',
      riskScore: 28,
      description: 'Standard sales team member with CRM read access only. Properly scoped permissions.',
      icon: '👤',
      connections: ['salesforce'],
      department: 'Sales',
      lastAccess: '30 min ago',
      permissions: ['crm-read', 'salesforce-access']
    }
  },

  // ===== DEVICES =====
  {
    id: 'corp-laptop-1',
    type: 'custom',
    position: { x: 340, y: 120 },
    data: {
      id: 'corp-laptop-1',
      label: 'Corp Laptop #1',
      nodeType: 'device',
      riskLevel: 'high',
      riskScore: 68,
      description: 'Corporate managed laptop with pending security patches. Disk encryption enabled but outdated EDR.',
      icon: '💻',
      connections: ['azure-ad', 'slack-app'],
      department: 'IT',
      lastAccess: '1 min ago',
      permissions: ['network-access', 'vpn-access']
    }
  },
  {
    id: 'byod-mobile-1',
    type: 'custom',
    position: { x: 340, y: 300 },
    data: {
      id: 'byod-mobile-1',
      label: 'BYOD Mobile',
      nodeType: 'device',
      riskLevel: 'critical',
      riskScore: 91,
      description: 'Personal mobile device accessing enterprise ERP and customer data. No MDM enrollment, unpatched OS.',
      icon: '💻',
      connections: ['sap-erp', 'customer-db'],
      department: 'Sales',
      lastAccess: '8 min ago',
      permissions: ['email-access', 'crm-access', 'erp-mobile']
    }
  },
  {
    id: 'server-1',
    type: 'custom',
    position: { x: 340, y: 560 },
    data: {
      id: 'server-1',
      label: 'App Server',
      nodeType: 'device',
      riskLevel: 'medium',
      riskScore: 55,
      description: 'Production application server with broad database access. Requires patch for CVE-2023-44487.',
      icon: '💻',
      connections: ['hr-database', 'customer-db'],
      department: 'IT',
      lastAccess: 'Continuous',
      permissions: ['db-connect', 'api-serve', 'file-storage']
    }
  },
  {
    id: 'iot-device-1',
    type: 'custom',
    position: { x: 340, y: 760 },
    data: {
      id: 'iot-device-1',
      label: 'IoT Sensor',
      nodeType: 'device',
      riskLevel: 'critical',
      riskScore: 88,
      description: 'Building IoT sensor on flat network with no segmentation. Default credentials not changed, no encryption.',
      icon: '💻',
      connections: ['server-1'],
      department: 'Operations',
      lastAccess: 'Continuous',
      permissions: ['network-send', 'data-upload']
    }
  },

  // ===== APPLICATIONS =====
  {
    id: 'sap-erp',
    type: 'custom',
    position: { x: 620, y: 200 },
    data: {
      id: 'sap-erp',
      label: 'SAP ERP',
      nodeType: 'application',
      riskLevel: 'high',
      riskScore: 75,
      description: 'Core enterprise resource planning system. Stores financial, HR, and inventory data. Multiple overprivileged accounts.',
      icon: '📱',
      connections: ['customer-db', 'financial-records'],
      department: 'Finance',
      lastAccess: 'Continuous',
      permissions: ['financial-data', 'hr-data', 'inventory']
    }
  },
  {
    id: 'salesforce',
    type: 'custom',
    position: { x: 620, y: 420 },
    data: {
      id: 'salesforce',
      label: 'Salesforce CRM',
      nodeType: 'application',
      riskLevel: 'medium',
      riskScore: 42,
      description: 'CRM platform with proper SSO integration. Customer contact data stored. Session management acceptable.',
      icon: '📱',
      connections: ['customer-db'],
      department: 'Sales',
      lastAccess: 'Continuous',
      permissions: ['customer-data', 'pipeline-data']
    }
  },
  {
    id: 'jenkins-ci',
    type: 'custom',
    position: { x: 620, y: 600 },
    data: {
      id: 'jenkins-ci',
      label: 'Jenkins CI/CD',
      nodeType: 'application',
      riskLevel: 'critical',
      riskScore: 92,
      description: 'CI/CD pipeline with hardcoded cloud credentials. Public-facing with default admin password. Deployer to all environments.',
      icon: '📱',
      connections: ['aws-s3', 'gcp-compute'],
      department: 'Engineering',
      lastAccess: '3 min ago',
      permissions: ['code-deploy', 'secrets-access', 'cloud-provision']
    }
  },
  {
    id: 'slack-app',
    type: 'custom',
    position: { x: 620, y: 820 },
    data: {
      id: 'slack-app',
      label: 'Slack',
      nodeType: 'application',
      riskLevel: 'low',
      riskScore: 25,
      description: 'Enterprise messaging platform. Properly configured with SSO and DLP integration. Low risk posture.',
      icon: '📱',
      connections: [],
      department: 'All',
      lastAccess: 'Continuous',
      permissions: ['messaging', 'file-share']
    }
  },

  // ===== DATABASES =====
  {
    id: 'customer-db',
    type: 'custom',
    position: { x: 900, y: 160 },
    data: {
      id: 'customer-db',
      label: 'Customer DB',
      nodeType: 'database',
      riskLevel: 'critical',
      riskScore: 96,
      description: 'Primary customer database containing 2.3M PII records. Accessible from multiple uncontrolled paths. GDPR critical asset.',
      icon: '🗄️',
      connections: [],
      department: 'IT',
      lastAccess: 'Continuous',
      permissions: ['pii-data', 'transaction-data']
    }
  },
  {
    id: 'financial-records',
    type: 'custom',
    position: { x: 900, y: 380 },
    data: {
      id: 'financial-records',
      label: 'Financial Records',
      nodeType: 'database',
      riskLevel: 'critical',
      riskScore: 94,
      description: 'Financial reporting database. SOX-regulated data with direct access from non-compliant systems.',
      icon: '🗄️',
      connections: [],
      department: 'Finance',
      lastAccess: 'Continuous',
      permissions: ['financial-data', 'audit-data']
    }
  },
  {
    id: 'hr-database',
    type: 'custom',
    position: { x: 900, y: 600 },
    data: {
      id: 'hr-database',
      label: 'HR Database',
      nodeType: 'database',
      riskLevel: 'high',
      riskScore: 71,
      description: 'HR system with employee PII, salary data, and performance records. Excessive application server access.',
      icon: '🗄️',
      connections: [],
      department: 'HR',
      lastAccess: 'Continuous',
      permissions: ['employee-pii', 'salary-data', 'performance-data']
    }
  },

  // ===== CLOUD =====
  {
    id: 'aws-s3',
    type: 'custom',
    position: { x: 900, y: 800 },
    data: {
      id: 'aws-s3',
      label: 'AWS S3',
      nodeType: 'cloud',
      riskLevel: 'high',
      riskScore: 76,
      description: 'Cloud storage buckets used for backups and CI/CD artifacts. Two public buckets misconfigured.',
      icon: '☁️',
      connections: ['financial-records'],
      department: 'IT',
      lastAccess: 'Continuous',
      permissions: ['file-storage', 'backup-data', 'log-storage']
    }
  },
  {
    id: 'azure-ad',
    type: 'custom',
    position: { x: 340, y: 940 },
    data: {
      id: 'azure-ad',
      label: 'Azure AD',
      nodeType: 'cloud',
      riskLevel: 'medium',
      riskScore: 48,
      description: 'Identity provider and SSO hub. MFA policies inconsistently enforced. Conditional access partially configured.',
      icon: '☁️',
      connections: ['sap-erp', 'salesforce'],
      department: 'IT',
      lastAccess: 'Continuous',
      permissions: ['identity-mgmt', 'sso-provider', 'mfa-auth']
    }
  },
  {
    id: 'gcp-compute',
    type: 'custom',
    position: { x: 620, y: 980 },
    data: {
      id: 'gcp-compute',
      label: 'GCP Compute',
      nodeType: 'cloud',
      riskLevel: 'high',
      riskScore: 66,
      description: 'Google Cloud compute instances running ML workloads with broad IAM permissions and customer data access.',
      icon: '☁️',
      connections: ['customer-db'],
      department: 'Engineering',
      lastAccess: 'Continuous',
      permissions: ['compute-resources', 'ml-workloads', 'data-pipeline']
    }
  }
]

export const initialEdges = [
  // Critical paths
  {
    id: 'e-admin-azure',
    source: 'admin-user',
    target: 'azure-ad',
    type: 'custom',
    data: { riskLevel: 'critical', label: 'Global Admin Auth', animated: true, description: 'Unrestricted admin authentication without MFA enforcement' }
  },
  {
    id: 'e-admin-customerdb',
    source: 'admin-user',
    target: 'customer-db',
    type: 'custom',
    data: { riskLevel: 'critical', label: 'Direct DB Access', animated: true, description: 'Admin bypassing PAM to directly query customer PII database' }
  },
  {
    id: 'e-admin-financial',
    source: 'admin-user',
    target: 'financial-records',
    type: 'custom',
    data: { riskLevel: 'critical', label: 'Financial Data Access', animated: true, description: 'Unrestricted financial record access outside compliance controls' }
  },
  {
    id: 'e-byod-sap',
    source: 'byod-mobile-1',
    target: 'sap-erp',
    type: 'custom',
    data: { riskLevel: 'critical', label: 'Mobile ERP Access', animated: true, description: 'Unmanaged personal device accessing core ERP with sensitive data' }
  },
  {
    id: 'e-byod-customerdb',
    source: 'byod-mobile-1',
    target: 'customer-db',
    type: 'custom',
    data: { riskLevel: 'critical', label: 'Mobile DB Query', animated: true, description: 'BYOD device querying customer PII database directly — GDPR violation risk' }
  },
  {
    id: 'e-jenkins-s3',
    source: 'jenkins-ci',
    target: 'aws-s3',
    type: 'custom',
    data: { riskLevel: 'critical', label: 'CI/CD to Cloud', animated: true, description: 'Pipeline with hardcoded AWS credentials can exfiltrate data to S3' }
  },
  {
    id: 'e-iot-server',
    source: 'iot-device-1',
    target: 'server-1',
    type: 'custom',
    data: { riskLevel: 'critical', label: 'IoT to Server', animated: true, description: 'Unprotected IoT device on flat network with direct server access' }
  },

  // High risk paths
  {
    id: 'e-jenkins-gcp',
    source: 'jenkins-ci',
    target: 'gcp-compute',
    type: 'custom',
    data: { riskLevel: 'high', label: 'Deploy to GCP', animated: true, description: 'Automated deployment pipeline with excessive GCP IAM permissions' }
  },
  {
    id: 'e-server-hrdb',
    source: 'server-1',
    target: 'hr-database',
    type: 'custom',
    data: { riskLevel: 'high', label: 'Server to HR DB', animated: true, description: 'App server has overly broad access to HR employee data' }
  },
  {
    id: 'e-server-customerdb',
    source: 'server-1',
    target: 'customer-db',
    type: 'custom',
    data: { riskLevel: 'high', label: 'Server to Customer DB', animated: false, description: 'Application server accessing entire customer database without data masking' }
  },
  {
    id: 'e-devops-jenkins',
    source: 'devops-engineer',
    target: 'jenkins-ci',
    type: 'custom',
    data: { riskLevel: 'high', label: 'CI/CD Admin', animated: false, description: 'DevOps engineer has full administrative control over CI/CD pipeline' }
  },
  {
    id: 'e-finance-sap',
    source: 'finance-analyst',
    target: 'sap-erp',
    type: 'custom',
    data: { riskLevel: 'high', label: 'ERP Full Access', animated: false, description: 'Finance analyst has ERP access beyond their defined job role' }
  },
  {
    id: 'e-finance-financial',
    source: 'finance-analyst',
    target: 'financial-records',
    type: 'custom',
    data: { riskLevel: 'high', label: 'Financial DB', animated: false, description: 'Direct financial database access without SOX compliance controls' }
  },
  {
    id: 'e-s3-financial',
    source: 'aws-s3',
    target: 'financial-records',
    type: 'custom',
    data: { riskLevel: 'high', label: 'Cloud to Finance DB', animated: false, description: 'S3 backup job reads financial records with excessive permissions' }
  },
  {
    id: 'e-sap-customerdb',
    source: 'sap-erp',
    target: 'customer-db',
    type: 'custom',
    data: { riskLevel: 'high', label: 'ERP to Customer DB', animated: false, description: 'ERP system queries customer database without field-level access control' }
  },
  {
    id: 'e-sap-financial',
    source: 'sap-erp',
    target: 'financial-records',
    type: 'custom',
    data: { riskLevel: 'high', label: 'ERP to Finance DB', animated: false, description: 'ERP writes to financial records bypassing audit controls' }
  },
  {
    id: 'e-gcp-customerdb',
    source: 'gcp-compute',
    target: 'customer-db',
    type: 'custom',
    data: { riskLevel: 'high', label: 'ML to Customer DB', animated: false, description: 'ML pipeline accessing full customer dataset without anonymization' }
  },
  {
    id: 'e-corp-azure',
    source: 'corp-laptop-1',
    target: 'azure-ad',
    type: 'custom',
    data: { riskLevel: 'medium', label: 'Device Auth', animated: false, description: 'Corporate device authentication via Azure AD' }
  },

  // Medium risk paths
  {
    id: 'e-devops-server',
    source: 'devops-engineer',
    target: 'server-1',
    type: 'custom',
    data: { riskLevel: 'medium', label: 'SSH Access', animated: false, description: 'Direct SSH to production server without bastion host' }
  },
  {
    id: 'e-hrmanager-hrdb',
    source: 'hr-manager',
    target: 'hr-database',
    type: 'custom',
    data: { riskLevel: 'medium', label: 'HR Data Access', animated: false, description: 'Standard HR management access with appropriate permissions' }
  },
  {
    id: 'e-hrmanager-sap',
    source: 'hr-manager',
    target: 'sap-erp',
    type: 'custom',
    data: { riskLevel: 'medium', label: 'HR Module', animated: false, description: 'SAP HR module access for employee management' }
  },
  {
    id: 'e-azure-sap',
    source: 'azure-ad',
    target: 'sap-erp',
    type: 'custom',
    data: { riskLevel: 'medium', label: 'SSO to ERP', animated: false, description: 'Identity federation providing SSO access to SAP ERP' }
  },
  {
    id: 'e-sf-customerdb',
    source: 'salesforce',
    target: 'customer-db',
    type: 'custom',
    data: { riskLevel: 'medium', label: 'CRM Sync', animated: false, description: 'Salesforce synchronizing customer records from main database' }
  },

  // Low risk paths
  {
    id: 'e-sales-sf',
    source: 'sales-rep',
    target: 'salesforce',
    type: 'custom',
    data: { riskLevel: 'low', label: 'CRM Access', animated: false, description: 'Standard Salesforce access for sales pipeline management' }
  },
  {
    id: 'e-corp-slack',
    source: 'corp-laptop-1',
    target: 'slack-app',
    type: 'custom',
    data: { riskLevel: 'low', label: 'Messaging', animated: false, description: 'Standard enterprise messaging via Slack' }
  },
  {
    id: 'e-azure-sf',
    source: 'azure-ad',
    target: 'salesforce',
    type: 'custom',
    data: { riskLevel: 'low', label: 'SSO to CRM', animated: false, description: 'Federated identity providing SSO to Salesforce CRM' }
  }
]
