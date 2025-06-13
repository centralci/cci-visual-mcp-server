import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';

const config: ForgeConfig = {
  makers: [
    new MakerSquirrel({
      authors: 'Electron contributors'
    }, ['win32']),
    new MakerZIP({}, ['darwin']),
    new MakerDeb({}, ['linux']),
    // new MakerRpm({}, ['linux']),
  ]
};

export default config;