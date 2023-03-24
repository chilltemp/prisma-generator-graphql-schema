import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { logger } from '@prisma/sdk';
import { appendFile, mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { GENERATOR_NAME } from './constants';
import { generateModel } from './templates/model';
import { Config } from './interfaces';
import { generateEnum } from './templates/enum';

const { version } = require('../package.json');

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`);
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME,
    };
  },
  onGenerate: async (options: GeneratorOptions) => {
    const config: Config = {
      output:
        options.generator.output?.value ||
        path.join(process.cwd(), './src/generated/schema.graphql'),
      exportedNamePrefix: options.generator.config.exportedNamePrefix || '',
      exportedNameSuffix: options.generator.config.exportedNameSuffix || '',
    };

    await initializeOutput(config);

    for (const modelInfo of options.dmmf.datamodel.models) {
      const model = generateModel(config, modelInfo);
      await appendFile(config.output, model, { encoding: 'utf8' });
    }

    for (const enumInfo of options.dmmf.datamodel.enums) {
      const enumeration = generateEnum(config, enumInfo);
      await appendFile(config.output, enumeration, { encoding: 'utf8' });
    }
  },
});

async function initializeOutput(config: Config) {
  await mkdir(path.dirname(config.output), {
    recursive: true,
  });

  await writeFile(config.output, '', { encoding: 'utf8', flag: 'w' });
}
