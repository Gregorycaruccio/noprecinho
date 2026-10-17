import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://oachsqhcozwuduyxferw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hY2hzcWhjb3p3dWR1eXhmZXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyMzg1NzYsImV4cCI6MjEwNzgxNDU3Nn0.divbH--Cd2l6tQKPKhdsHoRhgL16eww9EE8hJ83lZmY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
