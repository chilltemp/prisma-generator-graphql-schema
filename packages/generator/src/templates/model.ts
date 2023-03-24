import { DMMF } from '@prisma/generator-helper';
import { EOL } from 'os';
import { convertType } from '../utils/convertType';
import { Config } from '../interfaces';
import { generateName } from '../utils/generateName';

export function generateModel(config: Config, modelInfo: DMMF.Model): string {
  return `type ${generateName(config, modelInfo.name)} {
${generateFields(config, modelInfo.fields)}
}

`;
}

function generateFields(config: Config, fields: DMMF.Field[]) {
  return fields
    .map((field) => {
      let type = convertType(config, field.type);
      if (field.isList && field.isRequired) {
        type = `[${type}!]!`;
      } else if (field.isList) {
        type = `[${type}]`;
      } else if (field.isRequired) {
        type = `${type}!`;
      }

      return `  ${field.name}: ${type}`;
    })
    .join(EOL);
}
