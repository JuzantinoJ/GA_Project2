import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bkrvcsfzycqmoqwgaxeh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrcnZjc2Z6eWNxbW9xd2dheGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2OTg0NjAsImV4cCI6MjAwNTI3NDQ2MH0.t5O3PqAo39oDwY2Eibyygk0q7rgQ6Lyr2Xt5QaoGJaI";
export const supabase = createClient(supabaseUrl, supabaseKey);