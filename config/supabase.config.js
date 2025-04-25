const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config(); 
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase URL or Key is missing. Check your .env file.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;