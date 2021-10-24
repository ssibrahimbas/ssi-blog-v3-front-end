export interface EducationModel {
  id : number,
  superhumanId : number,
  schoolId : number,
  title : string,
  degree : string,
  program : string,
  dateOfStarted : string,
  dateOfEnded : string,
  note : string | null,
  description : string | null,
  status : boolean
}
