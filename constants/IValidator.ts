export type ValidateFunc = () => boolean;

export interface IValidator {
  checkEmailIsValid(email : string) : boolean;
  checkFirstNameIsValid(name : string) : boolean;
  checkStringIsFitMaximumLength(value: string, maxLength: number): boolean;
  checkLastNameIsValid(name : string) : boolean;
  checkTitleIsValid(title : string) : boolean;
  checkStringIsFitMinimumLength(value: string, minLength : number) : boolean;
  checkMessageMaxLengthIsValid(message: string): boolean;
  checkMessageMinLengthIsValid(message:string) : boolean;
  runValidator(params : ValidateFunc[]) : boolean;
}
