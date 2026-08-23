import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bsixukbiydmwffyqqrxm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzaXh1a2JpeWRtd2ZmeXFxcnhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0NjQ3NTMsImV4cCI6MjEwMzA0MDc1M30.PDzjOVH1P8_F1FKJXqzNEWDYcbVgzleBiWKtcCRlzJY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
