// src/data/portfolio.ts

export const personal = {
  name:      'Swarna T.',
  nameShort: 'Swarna',
  tagline:   'AI Engineer & Full-Stack Developer',
  summary:   'Enthusiastic and quick-learning AI Engineer with a B.Tech in Artificial Intelligence and Data Science. Proven ability to develop and deploy machine learning models, preprocess and analyse data, and contribute to AI-driven solutions. Proficient in Python, Machine Learning, Deep Learning, and NLP.',
  email:     'swarnakamali12@gmail.com',
  phone:     '+91 63800 56540',
  location:  'Thoothukudi, Tamil Nadu 628751',
  linkedin:  'linkedin.com/in/swarna-t-',
  github:    '',
  status:    'Open to Full-Time Jobs & Internships',
  languages: ['Tamil', 'English'],
}

export const education = [
  {
    degree:   'B.Tech — Artificial Intelligence and Data Science',
    school:   'Grace College of Engineering',
    location: 'Thoothukudi, Tamil Nadu',
    period:   'Jun 2022 – May 2026',
    gpa:      '8.2 CGPA',
    badge:    'Current',
  },
  {
    degree:   'Higher Secondary Certificate (HSC) — Maths Biology',
    school:   'M M Matric Hr Sec School',
    location: 'Thoothukudi, Tamil Nadu',
    period:   'Completed',
    gpa:      '77%',
    badge:    'Completed',
  },
]

export const experience = [
  {
    role:    'Artificial Intelligence Intern',
    company: 'Thedal Cloud',
    period:  'Aug 2025 – Sep 2025',
    type:    'Virtual',
    color:   '#0EA5E9',
    points: [
      'Developed and deployed machine learning models for real-world applications, improving prediction accuracy.',
      'Applied data-driven techniques to solve business challenges, resulting in measurable efficiency gains.',
      'Gained practical experience in the full AI model development lifecycle, from data collection to deployment.',
    ],
    tags: ['ML Deployment', 'Data-Driven', 'AI Lifecycle'],
  },
  {
    role:    'Machine Learning Intern',
    company: 'Cognifyz Technologies',
    period:  'Aug 2025 – Sep 2025',
    type:    'Virtual',
    color:   '#0284C7',
    points: [
      'Managed end-to-end machine learning workflows including data preprocessing, feature engineering, and model evaluation.',
      'Utilised regression and classification techniques to analyse diverse datasets, identifying key insights and trends.',
      'Improved model performance through rigorous hyperparameter tuning and cross-validation.',
    ],
    tags: ['Regression', 'Classification', 'Hyperparameter Tuning'],
  },
  {
    role:    'Machine Learning Intern',
    company: 'Saiket Systems',
    period:  'Dec 2024 – Jan 2025',
    type:    'Virtual',
    color:   '#0369A1',
    points: [
      'Built and optimised machine learning models for predictive analysis with strong AUC performance.',
      'Enhanced understanding of feature selection and algorithm comparison for accurate, efficient models.',
      'Implemented various evaluation metrics to assess model performance and identify areas for improvement.',
    ],
    tags: ['Predictive Analysis', 'Feature Selection', 'Model Evaluation'],
  },
]

export const projects = [
  {
    title:       'AI-Powered To-Do App',
    description: 'Full-stack productivity app with AI task suggestions, voice input, Pomodoro timer, and gamification features to maximise user focus.',
    tech:        ['React', 'Node.js', 'Express.js', 'AI Suggestions', 'Voice Input'],
    color:       '#0EA5E9',
    icon:        '✅',
    highlights:  ['AI task suggestions', 'Voice input integration', 'Gamification + Pomodoro'],
    github:      '',
    demo:        '',
  },
  {
    title:       'Sentiment Analysis Classifier',
    description: 'NLP-based sentiment classifier using TF-IDF features and Logistic Regression with robust data cleaning pipeline for high accuracy.',
    tech:        ['Python', 'NLP', 'TF-IDF', 'Logistic Regression', 'Scikit-learn'],
    color:       '#0284C7',
    icon:        '🧠',
    highlights:  ['TF-IDF feature extraction', 'Logistic Regression model', 'Data cleaning pipeline'],
    github:      '',
    demo:        '',
  },
  {
    title:       'Luxury Portfolio Website',
    description: 'Full-stack personal portfolio built with Next.js 15, TypeScript, MongoDB Atlas, Express backend, and visitor analytics.',
    tech:        ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Express.js'],
    color:       '#0369A1',
    icon:        '⚡',
    highlights:  ['Next.js 15 App Router', 'MongoDB + visitor tracking', 'Express REST API'],
    github:      '',
    demo:        '',
  },
]

export const skills = {
  'AI & Machine Learning': [
    { name: 'Python',             level: 92 },
    { name: 'Machine Learning',   level: 88 },
    { name: 'Deep Learning',      level: 82 },
    { name: 'NLP',                level: 85 },
    { name: 'Data Preprocessing', level: 90 },
    { name: 'Model Evaluation',   level: 87 },
  ],
  'Web Development': [
    { name: 'Next.js 15',   level: 85 },
    { name: 'React',        level: 86 },
    { name: 'TypeScript',   level: 80 },
    { name: 'Node.js',      level: 78 },
    { name: 'Express.js',   level: 76 },
    { name: 'Tailwind CSS', level: 88 },
  ],
  'Data & Tools': [
    { name: 'MongoDB',             level: 78 },
    { name: 'Scikit-learn',        level: 85 },
    { name: 'Pandas / NumPy',      level: 88 },
    { name: 'Feature Engineering', level: 83 },
    { name: 'Regression',          level: 86 },
    { name: 'Classification',      level: 84 },
  ],
}

export const certifications = [
  {
    title:  'Introduction to AI, Machine Learning Using Python',
    issuer: 'Google Cloud & Simplilearn',
    icon:   '☁️',
  },
  {
    title:  'Generative AI in Action',
    issuer: 'IBM SkillsBuild',
    icon:   '🤖',
  },
  {
    title:  'AWS Academy Graduate – Cloud Foundations',
    issuer: 'Amazon Web Services',
    icon:   '🏆',
  },
  {
    title:  'Zoho Creator Student Training — Young Creators Program',
    issuer: 'Zoho Corporation',
    icon:   '⚡',
  },
]

export const stats = [
  { value: '3',  suffix: '×',  label: 'ML Internships' },
  { value: '8.2',suffix: '',   label: 'CGPA' },
  { value: '4',  suffix: '+',  label: 'Certifications' },
  { value: '3',  suffix: '+',  label: 'AI Projects' },
]