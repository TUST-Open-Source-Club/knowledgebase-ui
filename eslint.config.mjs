import { createConfigForNuxt } from '@nuxt/eslint-config';

export default [
  ...(await createConfigForNuxt({
    features: {
      tooling: true,
      stylistic: true,
    },
  })),
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
