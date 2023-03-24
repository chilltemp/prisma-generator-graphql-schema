import { Config } from '../interfaces';

export function generateName(config: Config, name: string) {
  return `${config.exportedNamePrefix}${name}${config.exportedNameSuffix}`;
}
