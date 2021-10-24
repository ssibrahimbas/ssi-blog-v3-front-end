export interface ProjectModel {
  id: number,
  superhumanId: number,
  title: string,
  description: string,
  url: string,
  openSource: boolean,
  markdownUrl: string | null,
  documentUrl: string | null,
  contributors: string[] | null,
  dateOfCreate: string,
  status: boolean
}
