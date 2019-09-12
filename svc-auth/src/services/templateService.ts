import * as hbs from 'handlebars';
import { getLogger } from 'src/libs/logger';
import * as _ from 'lodash';
import { existsSync, readFile } from 'fs';
import * as path from 'path';
import { TEMPLATES_PATH } from 'src/constants';

class TemplateService {
  public templates: Object[] = [];
  private logger = getLogger('TemplateService');

  public async compile (templateName: string, context: Object): Promise<string> {
    const tmpl = await this.getTemplate(templateName);
    return tmpl(context);
  }

  public async getTemplate (templateName: string) {
    if (_.has(this.templates, templateName)) return this.templates[templateName];
    const tmpl = await this.loadTemplateFromFile(templateName);
    this.templates[templateName] = tmpl;

    return tmpl;
  }

  public loadTemplateFromFile (templateName: string) {
    const tmplPath = path.join(TEMPLATES_PATH, `${templateName}.hbs`);
    if (!existsSync(tmplPath)) throw new Error(`Template file not found: ${templateName}`);

    return new Promise((resolve, reject) => {
      readFile(tmplPath, 'utf8', (err, data) => {
        if (err) return reject(err);
        const tmpl = hbs.compile(data);
        resolve(tmpl);
      });
    });

  }
}

export const templateService = new TemplateService();
