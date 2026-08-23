// oxfmt.config.ts
import { julrPreset } from '@julr/tooling-configs/oxc/fmt';

export default julrPreset({
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  printWidth: 100,
  proseWrap: 'never',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  vueIndentScriptAndStyle: true,
});
