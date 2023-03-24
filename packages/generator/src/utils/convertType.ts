import { Config } from '../interfaces';
import { generateName } from './generateName';

export const prismaTypes = [
  'String',
  'Int',
  'Float',
  'Boolean',
  'DateTime',
  'BigInt',
  'Decimal',
  'Json',
  'Bytes',
];

export const convertType = (config: Config, type: string) => {
  if (prismaTypes.includes(type)) {
    switch (type) {
      case 'String':
      case 'Boolean':
      case 'Int':
      case 'Float':
        return type;
      case 'Decimal':
        return 'Float';

      case 'DateTime':
        return 'String';

      case 'BigInt':
      case 'Json':
      case 'Bytes':
        return `${type} NOT SUPPORTED`;
    }
  } else {
    return generateName(config, type);
  }
};
