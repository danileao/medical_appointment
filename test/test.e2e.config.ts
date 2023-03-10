import { defineConfig } from 'vitest/config'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

export default defineConfig({
  plugins: [
    {
      name: 'setup-config',
      config: () => ({
        test: {
          setupFiles: ['./test/setup.ts'],
        },
      }),
    },
  ],
  test: {
    include: ['**/*.e2e-spec.ts'],
    exclude: ['**/*.test.ts'],
  },
})
