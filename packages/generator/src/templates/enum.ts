import { DMMF } from '@prisma/generator-helper';
import { Config } from '../interfaces';
import { EOL } from 'os';
import { convertType } from '../utils/convertType';

export function generateEnum(
  config: Config,
  enumInfo: DMMF.DatamodelEnum,
): string {
  const name = convertType(config, 'enum', enumInfo.name);
  const values = generateEnumValues(config, enumInfo);

  return `enum ${name} {
${values}
}

`;
}

function generateEnumValues(config: Config, enumInfo: DMMF.DatamodelEnum) {
  return enumInfo.values
    .map(
      (value) =>
        `  ${convertType(config, 'enumValue', [enumInfo.name, value.name])}`,
    )
    .join(EOL);
}
