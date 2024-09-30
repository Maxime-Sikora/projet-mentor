import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_OPTIONS } from './interface/constante';
import { ConfigOptions, EnvConfig } from './interface/enconfig.interface';

@Injectable()
export class ConfigService {
  private envCongif: EnvConfig;
  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    const fileName = `${process.env.NODE_ENV || ''}.env`;
    const filePath = path.resolve(__dirname, '../..', options.folder, fileName);
    this.envCongif = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envCongif[key];
  }
}
