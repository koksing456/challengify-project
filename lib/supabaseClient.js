import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://dwkvywmfkqzykmdlfbhk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3a3Z5d21ma3F6eWttZGxmYmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwNTk0NDAsImV4cCI6MTk5NjYzNTQ0MH0.DaybfF-9UabDrA0JVRoYTPXoyh0VV0w4_HdDsuJ-u7I')

export default supabase;