export interface Index {
  name: string
  title: string
  desc: string
  params?: string
  filters?: string
  struct: string
  large?: boolean
  noCve?: boolean
}

export interface File {
  start: string
  end: string
  name: string
}

export interface ChangeLog {
  date: string
  title: string
}

