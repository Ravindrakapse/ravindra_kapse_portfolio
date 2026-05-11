export const profile = {
  name: 'Ravindra Kapse',
  title: 'AI Research Scientist',
  tagline: 'Physics-informed ML · Causal inference · Agentic systems',
  email: 'ravindrakapse308@gmail.com',
  phone: '+91 7999216582',
  github: 'https://github.com/Ravindra-kapse',
  linkedin: 'https://linkedin.com/in/ravindra-kapse',
  bio: `AI Research Scientist building autonomous agents for digital twinning and synthetic data generation. M.Tech from IISc Bangalore. I work at the intersection of physics-informed neural networks, causal inference, and multi-agent systems — turning differential equations into trainable models and data into decisions.`,
}

export const experience = [
  {
    company: 'Mobius by Gaian Solutions',
    role: 'AI Research Scientist',
    location: 'Hyderabad, Telangana',
    period: 'Jun 2025 — Present',
    bullets: [
      'Architected autonomous AI agent for AI Twinning + Synthetic Data Generation via PDE/SPDE simulation, SINDy/WSINDy sparse equation discovery, causal DAG learning — ReAct agentic loop.',
      'Designed hybrid digital twin pipelines: FEM, PINNs, neural operators × CTGAN, TimeGAN, diffusion × do-calculus, counterfactual reasoning.',
      'Built DAG-scheduled tool orchestration with episodic memory + human-in-the-loop governance gates for compliance-critical SDG.',
      'Researched symbolic AI: causal analysis, counterfactual simulation, semantic graph rewriting.',
      'Utility-based agents using game-theoretic reasoning in MAS.',
      'Implemented MAML on GNNs for rapid adaptation across structured tasks.',
    ],
  },
  {
    company: 'Indian Institute of Tropical Meteorology',
    role: 'Research Intern',
    location: 'Pune, Maharashtra',
    period: 'May 2024 — Jul 2024',
    bullets: [
      'Solved PDEs using Physics-Informed Neural Networks (PINNs).',
      'Hands-on with HPC systems.',
    ],
  },
  {
    company: 'ETH Zurich',
    role: 'Research Project',
    location: 'Switzerland',
    period: 'Aug 2024',
    bullets: [
      'PINNs to predict daily terrestrial water storage anomalies — water balance + GRACE satellite data.',
    ],
  },
]

export const education = [
  { school: 'Indian Institute of Science, Bangalore', degree: 'M.Tech', extra: 'GPA 8.3', period: '2023 — Jun 2025' },
  { school: 'University Institute of Technology, Bhopal', degree: 'B.Tech', extra: 'GPA 7.36', period: '2017 — Jun 2021' },
]

export const projects = [
  {
    title: 'Building Image Classification',
    desc: 'YOLOv8n + ResNet50 to detect/classify buildings from Google Street View. 77.6% accuracy. 2nd place — Kaggle.',
    tags: ['YOLOv8', 'ResNet50', 'CV'],
    accent: '#7c5cff',
  },
  {
    title: 'Meesho: Clothing Attributes',
    desc: '8th of 197 teams. YOLO + multi-head ResNet + XGBoost for attribute prediction.',
    tags: ['YOLO', 'XGBoost', 'Multi-head'],
    accent: '#22d3ee',
  },
  {
    title: 'Chatbot + Feedback Tool',
    desc: 'Grog API multi-turn chatbot with Phoenix observability. Streamlit annotation + analytics dashboard.',
    tags: ['LLM', 'Phoenix', 'Streamlit'],
    accent: '#f472b6',
  },
  {
    title: 'Physics-Informed Neural Networks',
    desc: "PINNs for Burgers', heat, Navier-Stokes, SWE, advection equations.",
    tags: ['PINN', 'PDE', 'PyTorch'],
    accent: '#34d399',
  },
  {
    title: 'InstaBot AI',
    desc: 'DeepSeek-R1 prompts + Flux image gen + auto-post to Instagram. End-to-end content pipeline.',
    tags: ['DeepSeek', 'Flux', 'Automation'],
    accent: '#fbbf24',
  },
  {
    title: 'Meta-Learning for GNNs',
    desc: 'MAML on PyTorch Geometric for few-shot protein graph classification using Learn2Learn.',
    tags: ['MAML', 'GNN', 'PyG'],
    accent: '#7c5cff',
  },
]

export const skills = {
  'Languages': ['Python'],
  'ML/DL': ['Transformers', 'CNNs', 'YOLOv8', 'GNNs', 'MAML', 'PINNs', 'Transfer Learning'],
  'Frameworks': ['PyTorch', 'TensorFlow', 'PyTorch Geometric', 'DeepXDE', 'HuggingFace', 'vLLM', 'Ollama'],
  'Causal/Reasoning': ['DoWhy', 'SCM', 'Counterfactual Analysis', 'Game Theory', 'MAS'],
  'Data': ['NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'Matplotlib', 'Streamlit'],
  'Systems': ['Git', 'Linux', 'HPC', 'Phoenix Observability'],
  'Geo/Climate': ['GRACE', 'ERA5', 'Spatio-temporal modeling', 'Hydrological modeling'],
}

export const awards = [
  { year: '2024', title: 'OLA Thought Paper Contest — Winner', desc: 'Innovative ideas for India\'s economic growth.' },
  { year: '2017', title: 'Mukhyamantri Medhavi Student Award', desc: 'Academic excellence.' },
]
