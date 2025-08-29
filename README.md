# BFHL REST API

This is a Vercel-deployable REST API for the BFHL assignment.

## How to Access the API

After deployment, you can test the API using the following command:

```
curl -X POST https://bfhl-rest-api-liard.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["a","1","334","4","R","$"]}'
```

Replace the URL with your own Vercel deployment if different.

## Endpoints

- `POST /bfhl` — Main API logic (see above example)
- `GET /bfhl` — Simple check (returns `{ "operation_code": 1 }`)
- `GET /` — Health check (returns API status and available endpoints)

## Project Structure

- `api/bfhl.js` — Main API handler (Express.js)
- `vercel.json` — Vercel routing configuration
- `package.json` — Project dependencies

## Deployment

1. Push your code to GitHub.
2. Import the repo into Vercel (https://vercel.com/import).
3. Vercel will auto-deploy and provide a public URL.

---

© 2025 Jai Sharma
