# Publishing alex-reads.ink

A push to `main` on GitHub is the production deploy. This repository has one branch, `main`. Railway runs that commit. Namecheap points `alex-reads.ink` at Railway, and Railway issues the HTTPS certificate.

| Service | What it does |
| --- | --- |
| GitHub `jphartley/alex-leesreizen` | Stores the code. A push to `main` updates the live site |
| Railway service `alex-leesreizen` | Runs `npm start` (`node server.mjs`) |
| Namecheap | Owns `alex-reads.ink` and holds the DNS records |

There is no build step, no Dockerfile, and no `railway.toml`. The app reads no environment variables. Do not add any. Railway sets `PORT` itself. Do not set `PORT`.

On your own computer the server listens only on `127.0.0.1`. On Railway it listens on every interface, because Railway sets `RAILWAY_ENVIRONMENT`. The public site still serves only the allowlisted pages. Docs, scripts, and git files are not published. Answers stay in the visitor's browser.

Do not copy DNS values from another Railway service into this file or into Namecheap. Each service has its own target and its own verification token. Those values stay in the Railway dashboard.

## Current setup

- Railway project service: `alex-leesreizen`, deployed from GitHub `main`.
- Builder: Railpack. Node 18 is what Railpack picked from `engines.node` of `>=18`. That is fine for this app.
- Public Railway address: `https://alex-leesreizen-production.up.railway.app`
- Custom domain: `alex-reads.ink`, port **8080** (the port Railway detected).
- `www` is not configured. A Railway trial allows one custom domain, and `www` would count as a second one.
- Namecheap host records are one CNAME on `@` and one TXT on `_railway-verify`. The parking records that were there at purchase have been removed.

## 1. Create the Railway project

1. Open [railway.com](https://railway.com) and sign in.
2. Choose **New Project**, then **Deploy from GitHub repo**.
3. If GitHub asks for permission, approve the Railway GitHub app and include `jphartley/alex-leesreizen`.
4. Select that repository and leave the branch as `main`.

Wait for the first deploy. These settings should match. Change one only if it does not.

| Setting | What it should be |
| --- | --- |
| Source → Source Repo | `jphartley/alex-leesreizen` |
| Source → Root Directory | Leave **Add Root Directory** unused |
| Source → Branch connected to production | `main` |
| Build → Builder | Railpack. Leave the Node version it picked |
| Build → Custom Build Command | Empty |
| Build → Watch Paths | Empty |
| Deploy → Custom Start Command | Empty. Railway runs `npm start` |
| Variables | Do not add any |

Do not click **Disconnect** or **Eject**.

**You should see:** a successful deploy of the latest commit on `main`. The first screen says **Unexposed service** until a domain is generated.

## 2. If Railway cannot read the GitHub branch

**Auto deploy unavailable** and **Could not load branches** mean a later push to `main` will not deploy. The first deploy can still succeed, because connecting the repo deploys the latest commit once.

1. Click **Retry** on the red line.
2. If it stays, open [github.com/settings/installations](https://github.com/settings/installations).
3. Open **Railway** → **Configure**.
4. Under **Only select repositories**, include `jphartley/alex-leesreizen`. Leave any other selected repositories in place.
5. Click the green **Save**. GitHub has not stored the change until you do.
6. Return to Railway → service **Settings** → **Source**, and click **Retry**.

**Error authenticating with GitHub / Invalid GitHub OAuth callback** is a failed login handshake. Close that tab. Open [railway.com](https://railway.com) in a new tab and sign in from there. Do not refresh the error page. Then click **Retry** again.

**You should see:** the red line gone, and no **Auto deploy unavailable** message.

## 3. Open the temporary Railway address

1. Service **Settings** → **Networking** → **Public Networking**.
2. Choose **Generate Domain**.

Railway shows a `*.up.railway.app` link and the port it detected. For this service that port is **8080**. Keep it. Do not type `3000`. That is only the port on your own computer.

**You should see:** the link open on **Kies je leesreis**, and a journey should open.

## 4. Add the custom domain in Railway

1. In the same **Public Networking** section, choose **+ Custom Domain**.
2. Enter `alex-reads.ink`.
3. Choose the port Railway already detected (**8080** on this service). The menu calls it the port detected by Railway. Do not choose **Custom port**.
4. Leave `www` off.

Railway then shows two DNS records. Copy them from that screen when you need them. Do not store them in this repository.

- A **CNAME** whose value is a hostname ending in `.up.railway.app`. This is not the same hostname as the temporary public address.
- A **TXT** record. The host Railway shows is `_railway-verify`. The value begins with `railway-verify=`.

**You should see:** `alex-reads.ink` listed, on port 8080, waiting for DNS.

## 5. Point the domain at Railway in Namecheap

1. Open [namecheap.com](https://www.namecheap.com) → **Domain List** → **Manage** next to `alex-reads.ink` → **Advanced DNS**.
2. Delete the parking rows a new domain comes with:
   - **CNAME**, host `www`, value `parkingpage.namecheap.com`
   - **URL Redirect**, host `@`, value `http://www.alex-reads.ink/`
3. Leave **DNSSEC** and **Mail Settings** alone.
4. Choose **Add New Record** twice:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| CNAME Record | `@` | The `.up.railway.app` target copied from Railway, with no `https://` | Automatic |
| TXT Record | `_railway-verify` | The full `railway-verify=...` value copied from Railway | Automatic |

Type the TXT host as `_railway-verify` only. Namecheap adds `.alex-reads.ink` itself. Namecheap may warn that a CNAME on `@` is unusual. Save it anyway. Namecheap may also add a trailing dot to the CNAME value. That is normal.

**You should see:** only those two host records. No parking row and no redirect.

## 6. Wait, then open the site

Railway shows a warning on `alex-reads.ink` and the words **Waiting for DNS update** until it can see both records. That is the expected pause. Do not delete the Namecheap rows and do not add the domain again.

Refresh the Railway settings page after a few minutes. When the warning becomes a green check, open `https://alex-reads.ink`.

**You should see:** the same landing page as the temporary Railway address, with a padlock in the browser. Choose a journey and answer one question. Reloading keeps that answer. Another browser starts empty.

The certificate can take a few minutes and sometimes up to an hour after the records are saved.

## After it is live

A later push to `main` starts a new Railway deploy, once auto-deploy is working. Wait for that deploy to finish, then reload `https://alex-reads.ink`. An ordinary update needs no Namecheap change.

## If a page looks wrong

| What you see | What it usually means |
| --- | --- |
| **Could not load branches** or **Auto deploy unavailable** | The Railway GitHub app cannot read the repository. Follow section 2. Do not disconnect the source as the first step |
| **Invalid GitHub OAuth callback** | The login return page was stale. Close it and sign in again from [railway.com](https://railway.com) |
| Deploy failed, no start command | In the service settings, set the start command to `node server.mjs`, then redeploy |
| The `.up.railway.app` link does not load | The app is not answering on the detected port. Confirm `PORT` is not set in the service variables |
| **Waiting for DNS update** stays up for a long time | The Namecheap CNAME and TXT do not both match the records Railway is showing now. A missing TXT record is enough to cause this |
| The browser says the certificate name does not match | The certificate is still being issued. Wait, then reload `https://alex-reads.ink` |
| Namecheap will not save a CNAME on `@` | Stop and keep the warning. Do not switch the record type |
