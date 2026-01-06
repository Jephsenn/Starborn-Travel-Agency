# How to Import Sample Promotions

## Quick Steps:

### 1. Create a Write Token

1. Go to https://sanity.io/manage
2. Select your "Starborn Travel Agency" project
3. Go to **API** → **Tokens**
4. Click **Add API Token**
5. Settings:
   - **Name**: "Import Script"
   - **Permissions**: "Editor"
6. Copy the token that's generated

### 2. Add Token to Environment

Add this line to your `.env.local` file:
```
SANITY_WRITE_TOKEN=your-token-here
```

### 3. Install Sanity Client for Node

```bash
npm install @sanity/client
```

### 4. Run the Import Script

```bash
node scripts/import-promotions.js
```

This will create all 8 sample promotions in your Sanity project!

---

## Alternative: Manual Entry

If you prefer to add them manually through the Studio UI:

1. Go to http://localhost:3000/studio
2. Click "Create" → "Promotions"
3. Fill in the fields and click "Publish"

Sample promotions are in `data/promotions.ts` for reference.
