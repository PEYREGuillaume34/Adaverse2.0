// Types pour la base de données

export type StudentProject = {
  id: number
  name: string
  slug: string
  github_url: string
  demo_url: string | null
  promotion_id: number | null
  ada_project_id: number | null
  published_at: Date | null
  created_at: Date
}

export type Promotion = {
  id: number
  name: string
  created_at: Date
}

export type AdaProject = {
  id: number
  name: string
  created_at: Date
}

// Type pour un projet avec ses relations (après JOIN)
export type ProjectWithRelations = {
  students_projects: StudentProject
  promotions: Promotion | null
  ada_projects: AdaProject | null
}