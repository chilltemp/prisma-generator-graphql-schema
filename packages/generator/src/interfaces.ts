export interface Config {
  output: string; // default: ./src/generated/schema.graphql
  optionalRelationships: boolean; 
  exportedNameSuffix: string;
  exportedNamePrefix: string;
}