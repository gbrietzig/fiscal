import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CAMARA_API_BASE = 'https://dadosabertos.camara.leg.br/api/v2'

Deno.serve(async (req) => {
  try {
    // Auth check for production (e.g. via secret header or Supabase auth)
    // For manual/cron triggers, we usually use a service role key

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    }

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    console.log('Fetching deputies from Camara API...')
    
    // The API is paginated, but for 513 deputies, usually one call with a large per_page or default suffices
    // Let's ensure we get all of them.
    const response = await fetch(`${CAMARA_API_BASE}/deputados?ordem=ASC&ordenarPor=nome`)
    
    if (!response.ok) {
      throw new Error(`Chamber API responded with status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.dados || !Array.isArray(data.dados)) {
      throw new Error('Invalid response structure from Chamber API')
    }

    const deputies = data.dados.map((d: any) => ({
      id: d.id,
      name: d.nome,
      party: d.siglaPartido,
      state: d.siglaUf,
      photo_url: d.urlFoto,
      metadata: {
        email: d.email,
        legislatura: d.idLegislatura
      },
      updated_at: new Date().toISOString()
    }))

    console.log(`Upserting ${deputies.length} deputies into database...`)
    
    const { error } = await supabaseClient
      .from('deputies')
      .upsert(deputies, { onConflict: 'id' })

    if (error) {
      console.error('Supabase Upsert Error:', error)
      throw error
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        count: deputies.length, 
        message: `Successfully synced ${deputies.length} deputies` 
      }), 
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (err) {
    console.error('Sync Job Failed:', err.message)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: err.message 
      }), 
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
