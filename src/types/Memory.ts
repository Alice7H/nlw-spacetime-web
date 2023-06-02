export interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
  isPublic: string
}

export interface SimplifyMemory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}
