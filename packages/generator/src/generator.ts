import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { logger } from '@prisma/sdk';
import { appendFile } from 'fs/promises';
import path from 'path';
import { GENERATOR_NAME } from './constants';
import { generateModel } from './templates/model';
import { Config } from './interfaces';
import { generateEnum } from './templates/enum';
import { defaultPrismaToGraphQL } from './utils/convertType';
import { initializeOutput } from './utils/initializeOutput';
import { loadTypeMap } from './utils/loadTypeMap';

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
    try {
      console.log('cfg:', options.generator.config);
      for (const [key, value] of Object.entries(options.generator.config)) {
        console.log(`[${key}]`, typeof value);
      } 
  
      const config: Config = {
        output:
          options.generator.output?.value ||
          path.join(process.cwd(), './src/generated/schema.graphql'),
        optionalRelationships:
          options.generator.config.optionalRelationships?.toLowerCase() === 'true',
        exportedNamePrefix: options.generator.config.exportedNamePrefix || '',
        exportedNameSuffix: options.generator.config.exportedNameSuffix || '',
        types: { ...defaultPrismaToGraphQL },
      };

      // load custom type map
      if(options.generator.config.typeMap) {
        config.types = {
          ...config.types,
          ...(await loadTypeMap(options.generator.config.typeMap))
        }
      }
  
      await initializeOutput(config);
  
      for (const modelInfo of options.dmmf.datamodel.models) { 
        const model = generateModel(config, modelInfo);
        await appendFile(config.output, model, { encoding: 'utf8' });
      }
  
      for (const enumInfo of options.dmmf.datamodel.enums) {
        const enumeration = generateEnum(config, enumInfo);
        await appendFile(config.output, enumeration, { encoding: 'utf8' });
      }
    } catch (err) {
      console.log(err)
    }
  },
});



