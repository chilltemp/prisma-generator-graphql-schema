import { DMMF } from '@prisma/generator-helper';
import { generateName } from '../utils/generateName';
import { Config } from '../interfaces';
import { EOL } from 'os';

export function generateEnum(
  config: Config,
  enumInfo: DMMF.DatamodelEnum,
): string {
  const values = enumInfo.values.map((e) => `  ${e.name}`).join(EOL);

  return `type ${generateName(config, enumInfo.name)} {
${values}
}

`;
}
