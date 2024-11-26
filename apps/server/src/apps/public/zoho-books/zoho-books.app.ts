import { Action } from '@/apps/lib/action';
import { Connection } from '@/apps/lib/connection';
import { Trigger } from '@/apps/lib/trigger';
import {
  WorkflowApp,
  WorkflowAppConstructorArgs,
} from '@/apps/lib/workflow-app';
import { ServerConfig } from '@/config/server.config';

import { ZohoBooksOAuth2US } from './connections/zoho-books.oauth';

export class ZohoBooks extends WorkflowApp {
  constructor(args: WorkflowAppConstructorArgs) {
    super(args);
  }

  id = 'zoho-books';
  name = 'Zoho Books';
  logoUrl = `${ServerConfig.INTEGRATION_ICON_BASE_URL}/apps/${this.id}.png`;
  description =
    'Zoho Books is a cloud-based accounting software that is set to take your business a step further into the future.';
  isPublished = true;

  connections(): Connection[] {
    return [new ZohoBooksOAuth2US({ app: this })];
  }

  actions(): Action[] {
    return [];
  }

  triggers(): Trigger[] {
    return [];
  }
}
