import { OAuth2Connection } from '@/apps/lib/connection';
import { InputConfig } from '@/apps/lib/input-config';
import { ServerConfig } from '@/config/server.config';

import { GoogleCalendar } from '../google-calendar.app';

export class GoogleCalendarOAuth2 extends OAuth2Connection {
  app: GoogleCalendar;
  id = 'google-calendar_connection_oauth2';
  name = 'OAuth2';
  description = 'Connect using OAuth2';
  inputConfig: InputConfig[] = [];
  authorizeUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  tokenUrl = 'https://oauth2.googleapis.com/token';
  clientId = ServerConfig.INTEGRATIONS.GOOGLE_CALENDAR_CLIENT_ID;
  clientSecret = ServerConfig.INTEGRATIONS.GOOGLE_CALENDAR_CLIENT_SECRET;
  scopes = [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.readonly',
  ];
  scopeDelimiter = ' ';
  extraAuthParams = {
    access_type: 'offline',
    prompt: 'consent',
  };
}