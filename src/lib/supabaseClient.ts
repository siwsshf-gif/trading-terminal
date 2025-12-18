// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// 🔹 PON AQUÍ LOS DATOS DE TU PROYECTO
const supabaseUrl = 'https://ekcalisyhvxwjotxueky.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrY2FsaXN5aHZ4d2pvdHh1ZWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NjA4ODcsImV4cCI6MjA3NzQzNjg4N30._m-vzu8iUnQOKQnNF6HhVccA98iGBcAFtDeRBzl-WbA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,   // si quieres que recuerde sesión en el navegador
  },
})
