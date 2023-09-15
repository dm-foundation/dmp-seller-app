import { defineConfig } from '@wagmi/cli';
import { foundry, react } from '@wagmi/cli/plugins';
import * as chains from 'wagmi/chains';

const address: string = 'b2F3475CC6bB75b4116dbfE586B1e1765CBbbcAB';

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    foundry({
      project: './contracts',
    }),
    react(),
  ],
});
