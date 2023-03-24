import { DMMF } from '@prisma/generator-helper';
import { EOL } from 'os';
import { convertType } from '../utils/convertType';
import { Config } from '../interfaces';

export function generateModel(config: Config, modelInfo: DMMF.Model): string {
  const name = convertType(config, 'model', modelInfo.name);
  const fields = generateFields(config, modelInfo);

  return `type ${name} {
${fields}
}

`;
}

function generateFields(config: Config, modelInfo: DMMF.Model): string {
  return modelInfo.fields
    .map((field) => {
      let type = convertType(config, 'field', [modelInfo.name, field.type]);
      // console.log(field);

      let { isRequired } = field;
      if (config.optionalRelationships && field.relationName) {
        isRequired = false;
      }

      if (field.isList && isRequired) {
        type = `[${type}!]!`;
      } else if (field.isList) {
        type = `[${type}!]`;
      } else if (isRequired) {
        type = `${type}!`;
      }

      return `  ${field.name}: ${type}`;
    })
    .join(EOL);
}
