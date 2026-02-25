import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../src/apps/frontend/.env.local') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Erro: VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não encontradas no .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)
const CAMARA_API = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome'

async function sync() {
    console.log('📡 Buscando deputados na API da Câmara...')

    try {
        const response = await fetch(CAMARA_API)
        const json = await response.json()
        const rawDeputies = json.dados

        console.log(`✅ ${rawDeputies.length} deputados encontrados. Formatando dados...`)

        const deputies = rawDeputies.map(d => ({
            id: d.id,
            name: d.nome,
            party: d.siglaPartido,
            state: d.siglaUf,
            photo_url: d.urlFoto,
            updated_at: new Date().toISOString()
        }))

        console.log('📤 Enviando para o Supabase (Upsert)...')

        const { error } = await supabase
            .from('deputies')
            .upsert(deputies, { onConflict: 'id' })

        if (error) throw error

        console.log('✨ Sincronização concluída com sucesso!')
    } catch (err) {
        console.error('❌ Falha na sincronização:', err.message)
    }
}

sync()
