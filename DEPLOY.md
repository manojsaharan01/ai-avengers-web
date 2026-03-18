# Deploy to Google Cloud Run — aiavengers.io

## Step 0 — Free aiavengers.io from the old project (Namecheap)

### 0a. Disconnect from the old project
Log in to whatever platform currently uses aiavengers.io (Vercel / old GCP project / etc.) and remove the domain mapping. The exact step depends on where it's hosted:
- **Vercel**: Project Settings → Domains → Remove
- **GCP Cloud Run**: `gcloud run domain-mappings delete --domain=aiavengers.io --region=REGION`
- **Netlify**: Site Settings → Domain Management → Remove custom domain

### 0b. Point Namecheap DNS at Google Cloud Run
After deploy, Cloud Run will give you DNS targets. For now, remove all existing A/CNAME records for `@` and `www` in Namecheap. You'll replace them with Cloud Run's values in Step 5.

---

## Step 1 — Create GCP project and enable APIs

```bash
# Install gcloud if needed
brew install google-cloud-sdk

# Login
gcloud auth login

# Create project (pick a project ID — e.g. ai-avengers-prod)
gcloud projects create ai-avengers-prod --name="AI Avengers"
gcloud config set project ai-avengers-prod

# Enable billing at console.cloud.google.com/billing first, then:
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com
```

---

## Step 2 — Create Artifact Registry

```bash
gcloud artifacts repositories create ai-avengers \
  --repository-format=docker \
  --location=australia-southeast1 \
  --description="AI Avengers web images"

# Auth Docker to push to it
gcloud auth configure-docker australia-southeast1-docker.pkg.dev
```

---

## Step 3 — First manual deploy (gets you a live URL fast)

```bash
cd ~/Desktop/AI/Stark_Command_Centre/ai-avengers-web

# Build
docker build \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=pdgjheli \
  --build-arg NEXT_PUBLIC_SANITY_DATASET=production \
  --build-arg NEXT_PUBLIC_SITE_URL=https://aiavengers.io \
  -t australia-southeast1-docker.pkg.dev/ai-avengers-prod/ai-avengers/ai-avengers-web:latest \
  .

# Push
docker push australia-southeast1-docker.pkg.dev/ai-avengers-prod/ai-avengers/ai-avengers-web:latest

# Deploy
gcloud run deploy ai-avengers-web \
  --image=australia-southeast1-docker.pkg.dev/ai-avengers-prod/ai-avengers/ai-avengers-web:latest \
  --region=australia-southeast1 \
  --platform=managed \
  --allow-unauthenticated \
  --port=3000 \
  --memory=512Mi \
  --min-instances=0 \
  --max-instances=10 \
  --set-env-vars=NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1
```

This gives you a URL like: `https://ai-avengers-web-xxxx-ts.a.run.app`
Visit it to confirm the site is live.

---

## Step 4 — Update cloudbuild.yaml and connect GitHub

1. Open `cloudbuild.yaml` — the project ID `ai-avengers-prod` is already set.
2. Go to: https://console.cloud.google.com/cloud-build/triggers
3. Connect repo → GitHub → select this repo (Stark_Command_Centre or a dedicated repo)
4. Create trigger: push to `main` → Cloud Build config: `cloudbuild.yaml`

After this, every push to main auto-deploys.

---

## Step 5 — Map aiavengers.io to Cloud Run

```bash
# Verify you own the domain first (one-time)
gcloud domains verify aiavengers.io

# Map root domain
gcloud run domain-mappings create \
  --service=ai-avengers-web \
  --domain=aiavengers.io \
  --region=australia-southeast1

# Map www
gcloud run domain-mappings create \
  --service=ai-avengers-web \
  --domain=www.aiavengers.io \
  --region=australia-southeast1
```

It will print DNS records like:
```
NAME    TYPE    DATA
@       A       216.239.32.21
@       A       216.239.34.21
@       A       216.239.36.21
@       A       216.239.38.21
www     CNAME   ghs.googlehosted.com.
```

---

## Step 6 — Update Namecheap DNS

1. Log in at namecheap.com → Domain List → aiavengers.io → Manage
2. Go to **Advanced DNS**
3. **Delete** all existing A records and CNAME records for `@` and `www`
4. **Add** the records Cloud Run gave you:
   - 4x A records for `@` pointing to the Google IPs
   - 1x CNAME for `www` → `ghs.googlehosted.com.`
5. Save

SSL certificate is auto-provisioned by Google — takes 15-30 min after DNS propagates.

---

## Step 7 — Add CORS origin in Sanity

So the live site can query Sanity:

```bash
# Or do it in the Sanity MCP
```

Go to sanity.io/manage → project pdgjheli → API → CORS Origins → Add:
- `https://aiavengers.io`
- `https://www.aiavengers.io`

---

## Cost (Cloud Run free tier)

| Resource | Free tier | After |
|----------|-----------|-------|
| Cloud Run requests | 2M req/mo free | $0.40/M |
| Cloud Run CPU | 360K vCPU-sec/mo free | tiny |
| Cloud Run memory | 180K GB-sec/mo free | tiny |
| Artifact Registry | 0.5 GB free | $0.10/GB |
| Cloud Build | 120 min/day free | $0.003/min |

**For your traffic level: effectively $0/mo.** Cloud Run scales to zero when nobody's visiting.

---

## Sanity GROQ query caching

The site uses ISR (revalidate: 3600) — pages rebuild every hour. For instant updates after publishing in Sanity, set up a webhook:

Sanity Studio → API → Webhooks → Add:
- URL: `https://aiavengers.io/api/revalidate` (we can build this endpoint)
- Trigger on: publish, unpublish
- Secret: any random string
