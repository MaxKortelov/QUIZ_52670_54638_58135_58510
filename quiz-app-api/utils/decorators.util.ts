import {registerDecorator, validate, ValidationArguments} from 'class-validator';

export function IsValidArrayOfObjects(typeFunction: { new(): object }) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNonPrimitiveArray',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: { message: "Array of objects is not valid"},
      validator: {
        async validate(value: any, _args: ValidationArguments) {
          const isArrayOfObjects = Array.isArray(value) && value.reduce((a, b) => a && typeof b === 'object' && !Array.isArray(b), true)
          if(!isArrayOfObjects)  {return true}
          const objectsToValidate = value.map(el => {
            const entity = new typeFunction();
            const keys = Object.keys(el);
            keys.forEach(key => {
              (entity as any)[key] = (el as any)[key];
            });
            return entity;
          });
          const result = [];
          for await (let entityToValidate of objectsToValidate) {
            const errors = await validate(entityToValidate);
            result.push(errors);
          }
          return result.flat().length === 0;
        }
      }
    });
  };
}