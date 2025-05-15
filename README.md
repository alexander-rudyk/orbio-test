# Orbio Test

Project for uploading files to Google Drive via HTTP API, built with NestJS. Supports handling large files and stores OAuth token once for further use.

---

## 🚀 Run with Docker Compose

The project includes a `docker-compose.yml` that spins up:

- PostgreSQL database
- NestJS application

### Steps to run:

1. Clone the repository (branch `develop`):
   ```bash
   git clone https://github.com/alexander-rudyk/orbio-test.git
   cd orbio-test
   ```
2. Create `.env` file (based on `.env.example`), set environment variables (e.g. DB, Google Drive API).

3. Run Docker Compose:

    ```bash
    docker-compose up --build
    ```
4. The app will be available at:

    ```bash
    http://localhost:3000
    ```

## 📦 API Endpoints
### 1. Upload files to Google Drive
  **POST** `/drive/upload`

  * Request body (JSON):
  ```json
  {
    "urls": [
      "https://example.com/file1.jpg",
      "https://example.com/file2.pdf"
    ]
  }
  ```
  * Description: Uploads an array of files by URLs to  Google Drive.

  * Response:
  ```json
  [
    {
      "name": "oauth-consent-screen-components.png",
      "mimeType": "image/png",
      "driveUrl": "https://drive.google.com/file/d/1SdfokcWkrvVMDZ6rWecwZ8J0S6Qp-2_0/view?usp=drivesdk",
      "driveId": "1SdfokcWkrvVMDZ6rWecwZ8J0S6Qp-2_0",
      "id": 1
    },
    {
      "name": "oauth-consent-screen-components.png",
      "mimeType": "image/png",
      "driveUrl": "https://drive.google.com/file/d/1SdfokcWkrvVMDZ6rWecwZ8J0S6Qp-2_0/view?usp=drivesdk",
      "driveId": "1SdfokcWkrvVMDZ6rWecwZ8J0S6Qp-2_0",
      "id": 2
    }
  ]
  ```
---
### 2. List files
  **GET** `/drive/files`
  * Description: Returns a list of files uploaded via the app (up to 10 items).

  * Response:
  ```json
  [
    {
      "id": "fileId1",
      "name": "file1.jpg",
      "webViewLink": "https://drive.google.com/file/d/fileId1/view"
    },
    {
      "id": "fileId2",
      "name": "file2.pdf",
      "webViewLink": "https://drive.google.com/file/d/fileId2/view"
    }
  ]
  ```
---

## 🛠 Technical Details
* Uses NestJS to organize the API.

* Google Drive OAuth token is stored server-side in JSON format (one-time browser authorization).

* Database — PostgreSQL (can be replaced with MySQL).

* Docker Compose to run DB and app.

* Supports large file handling and parallel uploads.

* Uses official `googleapis` library for Google Drive integration.

---

## ⚙️ Google Drive API Setup
* Create OAuth 2.0 Client ID in Google Cloud Console (type — Web Application).

* Set redirect URI for local development.

* Download `credentials.json` into `src/keys/`.

* On first run, authorize via browser (creates `tokens.json`).

---
### License
MIT © Alexander Rudyk


