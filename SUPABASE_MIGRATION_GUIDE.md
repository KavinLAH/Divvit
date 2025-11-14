# Supabase Database Migration Guide

## Current Database Setup Analysis

### ✅ What's Already Configured:
1. **Supabase Client**: Already set up in `src/integrations/supabase/client.ts`
2. **Environment Variables**: `.env` file exists with:
   - `VITE_SUPABASE_URL`: https://betgivqfeccgjoblxspu.supabase.co
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: (anon key configured)
   - `VITE_SUPABASE_PROJECT_ID`: betgivqfeccgjoblxspu
3. **Migrations**: Two migration files exist in `supabase/migrations/`:
   - `20251114063242_9498daa8-8bc3-4fb1-9ccd-97abe98e9435.sql` - Creates profiles table with RLS
   - `20251114063431_91d72fcf-2677-4a25-bad8-6eedfea2ed69.sql` - Security fix for updated_at function
4. **Auth Integration**: Supabase Auth is already integrated in `AuthContext.tsx` and `Auth.tsx`
5. **Supabase Config**: `supabase/config.toml` exists with project ID

### ❌ What's Missing:
1. **Database Types File**: `src/integrations/supabase/types.ts` is referenced but doesn't exist
2. **Migrations Applied**: Migrations exist locally but may not be applied to your Supabase project
3. **Supabase CLI**: Not installed (needed for local development and migration management)

---

## Step-by-Step Migration Process

### Step 1: Install Supabase CLI

**⚠️ Important:** Supabase CLI cannot be installed via npm. Use one of these methods:

**Option A: macOS with Homebrew (Recommended)**
```bash
# First, ensure Command Line Tools are up to date:
# If you get an error about outdated tools, run:
sudo rm -rf /Library/Developer/CommandLineTools
sudo xcode-select --install

# Then install Supabase CLI:
brew install supabase/tap/supabase
```

**Option B: Direct Binary Download (macOS)**
```bash
# Download the latest release for macOS ARM64 (Apple Silicon)
curl -L https://github.com/supabase/cli/releases/latest/download/supabase_darwin_arm64.tar.gz -o supabase.tar.gz
tar -xzf supabase.tar.gz
sudo mv supabase /usr/local/bin/
rm supabase.tar.gz

# OR for Intel Macs:
# curl -L https://github.com/supabase/cli/releases/latest/download/supabase_darwin_amd64.tar.gz -o supabase.tar.gz
```

**Option C: Using Scoop (Windows) or other package managers**
See: https://github.com/supabase/cli#install-the-cli

**Verify installation:**
```bash
supabase --version
```

---

### Step 2: Link Your Local Project to Supabase

1. **Login to Supabase CLI:**
   ```bash
   supabase login
   ```
   This will open your browser to authenticate.

2. **Link your project:**
   ```bash
   cd /Users/theraq17/Documents/GitHub/Divvit
   supabase link --project-ref betgivqfeccgjoblxspu
   ```
   
   When prompted, enter your database password (you can find it in your Supabase dashboard under Settings > Database).

---

### Step 3: Apply Migrations to Your Supabase Database

**Option A: Push all migrations at once**
```bash
supabase db push
```

**Option B: Apply migrations individually (if you need more control)**
```bash
# This will apply all pending migrations
supabase migration up
```

**Verify migrations were applied:**
```bash
supabase migration list
```

---

### Step 4: Generate TypeScript Types

This creates the `types.ts` file that's referenced in your client but missing:

```bash
supabase gen types typescript --project-id betgivqfeccgjoblxspu > src/integrations/supabase/types.ts
```

**Alternative (if you have a local database running):**
```bash
supabase gen types typescript --local > src/integrations/supabase/types.ts
```

---

### Step 5: Verify Your Database Schema

1. **Check your Supabase Dashboard:**
   - Go to https://supabase.com/dashboard/project/betgivqfeccgjoblxspu
   - Navigate to **Table Editor** → You should see the `profiles` table
   - Navigate to **SQL Editor** → Run a query to verify:
     ```sql
     SELECT * FROM public.profiles;
     ```

2. **Verify Row Level Security (RLS):**
   - Go to **Authentication** → **Policies**
   - You should see policies for the `profiles` table:
     - "Users can view their own profile"
     - "Users can update their own profile"
     - "Users can insert their own profile"

---

### Step 6: Test the Connection

1. **Start your dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Test authentication:**
   - Navigate to your app (http://localhost:8080)
   - Try signing up a new user
   - Check your Supabase dashboard → **Authentication** → **Users** to see if the user was created
   - Check **Table Editor** → `profiles` to see if a profile was automatically created (via the trigger)

---

## What Your Migrations Do

### Migration 1: `20251114063242_9498daa8-8bc3-4fb1-9ccd-97abe98e9435.sql`
- Creates `profiles` table with:
  - `id` (UUID, references auth.users)
  - `email` (TEXT)
  - `full_name` (TEXT)
  - `created_at` and `updated_at` timestamps
- Enables Row Level Security (RLS)
- Creates RLS policies for SELECT, UPDATE, and INSERT
- Creates a trigger function `handle_new_user()` that automatically creates a profile when a user signs up
- Creates a trigger function `handle_updated_at()` for automatic timestamp updates

### Migration 2: `20251114063431_91d72fcf-2677-4a25-bad8-6eedfea2ed69.sql`
- Fixes security issue in `handle_updated_at()` function by adding `SECURITY DEFINER` and `SET search_path`

---

## Troubleshooting

### Issue: "Migration already applied"
- If you get errors about migrations already existing, you can reset (⚠️ **WARNING**: This deletes all data):
  ```bash
  supabase db reset
  ```

### Issue: "Cannot connect to database"
- Verify your `.env` file has the correct credentials
- Check your Supabase project is active (not paused)
- Ensure your IP is allowed (if using IP restrictions)

### Issue: "Types file not generating"
- Make sure you're logged in: `supabase login`
- Try using the project ID directly:
  ```bash
  supabase gen types typescript --project-id betgivqfeccgjoblxspu --schema public > src/integrations/supabase/types.ts
  ```

### Issue: "RLS policies not working"
- Verify policies exist in Supabase dashboard
- Check that RLS is enabled: `ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;`
- Test with a logged-in user session

---

## Next Steps After Migration

1. **Add more tables** as needed (bills, transactions, etc.)
2. **Create additional RLS policies** for new tables
3. **Set up database functions** for complex queries
4. **Configure storage buckets** if you need file uploads
5. **Set up real-time subscriptions** if needed

---

## Quick Reference Commands

```bash
# Link project
supabase link --project-ref hpetdvpcjausumvjiozi

# Apply migrations
supabase db push

# Generate types
supabase gen types typescript --project-id betgivqfeccgjoblxspu > src/integrations/supabase/types.ts

# Check migration status
supabase migration list

# View database in browser
supabase db diff

# Start local Supabase (optional, for local development)
supabase start
```

---

## Summary Checklist

- [ ] Install Supabase CLI
- [ ] Login to Supabase CLI
- [ ] Link local project to Supabase project
- [ ] Apply migrations to database
- [ ] Generate TypeScript types file
- [ ] Verify schema in Supabase dashboard
- [ ] Test authentication flow
- [ ] Verify profile creation on signup
- [ ] Test RLS policies

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs
- Supabase CLI Docs: https://supabase.com/docs/reference/cli
- Discord: https://discord.supabase.com

