import { Config, TypeKind } from '../interfaces';

const notSupported = '-NOT-SUPPORTED';
export const defaultPrismaToGraphQL: Record<string, string> = {
  BigInt: 'BigInt' + notSupported,
  Boolean: 'Boolean',
  Bytes: 'Bytes' + notSupported,
  DateTime: 'DateTime' + notSupported,
  Decimal: 'Decimal',
  Float: 'Float',
  Int: 'Int',
  Json: 'Json' + notSupported,
  String: 'String',
};

export const convertType = (
  config: Config,
  kind: TypeKind,
  path: string | string[],
) => {
  let fullName: string | undefined;
  let name: string | undefined;
  if (Array.isArray(path)) {
    fullName = path.join('.');
    name = path.at(-1) || '';
  } else {
    fullName = undefined;
    name = path || '';
  }

  if (!name && !fullName) {
    console.log('convertType received a bad type path:', path);
    return 'ERROR';
  }

  let newName: string | undefined = undefined;

  if (fullName) {
    newName = config.types[fullName];
  }

  if (!newName) {
    newName = config.types[name];
  }

  if (!newName && kind !== 'enumValue') {
    newName = `${config.exportedNamePrefix}${name}${config.exportedNameSuffix}`;
  }

  if (newName?.endsWith(notSupported)) {
    console.log(
      `WARNING: ${newName} at ${
        fullName || name
      }.  See README.md for custom type mappings.`,
    );
  }

  return newName || name;
};
