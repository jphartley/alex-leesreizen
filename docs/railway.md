# Publishing alex-reads.ink

A push to `main` on GitHub is the production deploy. Railway runs this repository as a Node process and serves it at `https://alex-reads.ink`.

This app has no build, no dependencies, and no environment variables. Railway does not need a root directory, a Dockerfile, or a `railway.toml`.

| Piece | This app |
| --- | --- |
| GitHub repository | `jphartley/alex-leesreizen` |
| Production branch | `main` |
| Service root | Repository root. Leave Root Directory empty |
| Start | `npm start`, which runs `node server.mjs`. Leave the start command empty unless detection fails |
| Build | None. Leave the build command empty |
| Variables | None. Do not set `PORT`; Railway injects it |
| Listen address | `127.0.0.1` on your machine. `0.0.0.0` when Railway sets `RAILWAY_ENVIRONMENT` |
| Public URL | `https://alex-reads.ink` |
| Registrar | Namecheap. Railway issues the HTTPS certificate |

The server still serves only the allowlist in `server.mjs`. Docs, scripts, and git files are not on the public site. Answers stay in the visitor's browser.

## Owner steps

Do these in order. The repository change that listens on `0.0.0.0` under Railway has to be on GitHub `main` before the first deploy, or the generated URL will not answer.

### 1. Connect the GitHub repository

1. Open [railway.com](https://railway.com) → New Project → Deploy from GitHub Repo.
2. Authorize the GitHub account that owns `jphartley/alex-leesreizen`, then select that repository.
3. Leave the production branch as `main`.
4. Leave Root Directory, Build Command, and Start Command empty.
5. Add no variables.

Railway deploys on every later push to `main`.

### 2. Confirm the Railway hostname

In the service settings, generate a public domain (`*.railway.app`). Open it. The landing page should show “Kies je leesreis”, and a journey should open. Fix any boot failure against that hostname before attaching the custom domain.

### 3. Attach the custom domain

1. Service → Settings → Custom Domain.
2. Add `alex-reads.ink`.
3. Copy the DNS records Railway shows for this service. Each service has its own target and verification token. Use those values.

Add `www.alex-reads.ink` only if that name should work too. It is a second hostname, with its own records.

### 4. Publish DNS at Namecheap

Domain List → `alex-reads.ink` → Manage → Advanced DNS.

Remove parking records that use the same host, such as a URL redirect or an `A` / `AAAA` record for `@`. Then add the records from the Railway screen. The shape is:

- `CNAME`, host `@`, target the service's `*.up.railway.app` value
- `TXT`, host `_railway-verify`, value the `railway-verify=...` token

On Namecheap the TXT host is `_railway-verify` only. Namecheap appends the domain. TTL can stay Automatic.

Wait until Railway marks the domain verified and the certificate is issued. The public check is `https://alex-reads.ink`.

## After it is live

Push to `main` and wait for the new deployment. Open the site, choose a journey, and answer one question. Reloading keeps that answer. Another browser starts empty.

## If it fails

| What you see | What to do |
| --- | --- |
| `*.railway.app` does not answer | The process is not listening on `0.0.0.0` and Railway's `PORT`. Confirm the deploy includes the listen-address change, and that `PORT` is not set in the service variables. If Railway reports no start command, set it to `node server.mjs` |
| Custom domain stays unverified, or returns 404 | The `CNAME` and the `_railway-verify` TXT record must both match the current Railway screen. A missing TXT record leaves the domain unverified |
| The certificate is not ready | Wait, then reload `https://alex-reads.ink` |
