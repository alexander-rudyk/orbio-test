import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as path from 'path';
import { promises as fs } from 'fs';
import { OAuth2Client } from 'google-auth-library';
import { authenticate } from '@google-cloud/local-auth';
import { Readable } from 'stream';

const TOKEN_PATH = path.join(__dirname, './keys/tokens.json');
const CREDENTIALS_PATH = path.join(__dirname, './keys/credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

@Injectable()
export class DriveService {
  private async loadTokens(): Promise<OAuth2Client | null> {
    try {
      const credentials = await fs.readFile(TOKEN_PATH, 'utf-8');
      const token = JSON.parse(credentials);

      const creds = await fs.readFile(CREDENTIALS_PATH, 'utf-8');
      const keys = JSON.parse(creds).installed || JSON.parse(creds).web;

      const client = new google.auth.OAuth2(
        keys.client_id,
        keys.client_secret,
        keys.redirect_uris[0],
      );
      client.setCredentials(token);

      return client;
    } catch (err) {
      console.warn('No saved token, you need to authorize:', err.message);
      return null;
    }
  }

  private async saveCredentials(client: OAuth2Client) {
    const credentials = await fs.readFile(CREDENTIALS_PATH, 'utf-8');
    const keys =
      JSON.parse(credentials).installed || JSON.parse(credentials).web;

    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: keys.client_id,
      client_secret: keys.client_secret,
      access_token: client.credentials.access_token,
    });

    await fs.writeFile(TOKEN_PATH, payload, 'utf-8');
  }

  private async authorize(): Promise<OAuth2Client> {
    const loaded = await this.loadTokens();
    if (loaded) return loaded;

    const client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });

    await this.saveCredentials(client);
    return client;
  }

  public async listDriveFiles() {
    const auth = await this.authorize();
    const drive = google.drive({ version: 'v3', auth });

    const res = await drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, webViewLink)',
    });

    return res.data.files;
  }

  async uploadFileFromStream(stream: Readable, name: string, mimeType: string) {
    const auth = await this.authorize();
    const drive = google.drive({ version: 'v3', auth });

    const res = await drive.files.create({
      requestBody: {
        name,
        mimeType,
      },
      media: {
        mimeType,
        body: stream,
      },
      fields: 'id, webViewLink',
    });

    return res.data;
  }
}
