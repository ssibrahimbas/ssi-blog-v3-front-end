import { IValidator, ValidateFunc } from '~/constants/IValidator'

export class ValidateManager implements IValidator {
  
  checkStringIsFitMinimumLength(value: string, minLength: number): boolean {
    return value.length > minLength;
  }

  checkStringIsFitMaximumLength(value: string, maxLength: number): boolean {
    return value.length < maxLength;
  }

  checkEmailIsValid(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  checkFirstNameIsValid(name: string): boolean {
    return name.length > 2;
  }

  checkLastNameIsValid(name: string): boolean {
    return name.length > 2;
  }

  checkTitleIsValid(title: string): boolean {
    return title.length > 2
  }

  checkMessageMaxLengthIsValid(message: string): boolean {
    return message.length < 500
  }

  checkMessageMinLengthIsValid(message:string) : boolean {
    return message.length > 10
  }

  runValidator(params: ValidateFunc[]): boolean {
    let result : boolean = true;
    let index : number = 0;
    while(result && index < params.length) {
      if(!params[index]()) {
        result = false;
      }
      index++;
    }
    return result;
  }

}
