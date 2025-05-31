import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  schema: process.env.API_URL, // URL o path del esquema GraphQL
  documents: 'src/graphql/**/*.graphql', // Todos los archivos GraphQL
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};
console.log('Configuración de GraphQL Codegen:', process.env.API_URL);
export default config;
