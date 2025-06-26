import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsNotWeekend(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isNotWeekend",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (!value) return true;
          const date = new Date(value);
          const day = date.getDay();
          return day !== 0 && day !== 6;
        },
        defaultMessage(_args: ValidationArguments) {
          return "$property should not be on a weekend";
        },
      },
    });
  };
}
