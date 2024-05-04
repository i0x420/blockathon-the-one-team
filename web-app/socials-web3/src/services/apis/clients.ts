import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uleoajqkpxhjoyytbamt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZW9hanFrcHhoam95eXRiYW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MDIzOTAsImV4cCI6MjAzMDM3ODM5MH0.Z7FWvoN122Ef62n_pKe4GcOB5cGBeprHjejAmdpbvqo";

export const supabase = createClient(supabaseUrl, supabaseKey);
