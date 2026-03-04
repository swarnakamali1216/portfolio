// src/types/index.ts
// Shared TypeScript types across the portfolio

export interface Skill {
  name:  string
  level: number
}

export interface Experience {
  role:    string
  company: string
  period:  string
  type:    string
  color:   string
  points:  string[]
  tags:    string[]
}

export interface Project {
  title:       string
  description: string
  tech:        string[]
  color:       string
  icon:        string
  highlights:  string[]
  github?:     string
  demo?:       string
}

export interface Certification {
  title:  string
  issuer: string
  icon:   string
}

export interface StatItem {
  value:  string
  suffix: string
  label:  string
}

export interface ContactForm {
  name:    string
  email:   string
  message: string
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'
