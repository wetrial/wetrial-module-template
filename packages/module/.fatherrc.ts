import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  cjs: 'babel',
  esm: 'babel',
  disableTypeCheck: true,
  preCommit: {
    eslint: true,
    prettier: true,
  },
};

export default options;
