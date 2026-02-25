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

async function syncExpenses(deputyId) {
    console.log(`📡 Buscando despesas para o deputado ${deputyId}...`)

    try {
        const years = [2025, 2026]
        let allExpenses = []

        for (const year of years) {
            console.log(`📅 Buscando ano ${year}...`)
            const CAMARA_API = `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputyId}/despesas?ano=${year}&ordem=DESC&ordenarPor=mes`

            try {
                const response = await fetch(CAMARA_API)
                const json = await response.json()
                if (json.dados) allExpenses = [...allExpenses, ...json.dados]
            } catch (err) {
                console.error(`Erro ao buscar ano ${year}:`, err.message)
            }
        }

        const rawExpenses = allExpenses

        if (!rawExpenses || rawExpenses.length === 0) {
            console.log('⚠️ Nenhuma despesa encontrada para este deputado.')
            return
        }

        console.log(`✅ ${rawExpenses.length} despesas encontradas. Formatando dados...`)

        const expenses = rawExpenses.map(e => ({
            deputy_id: deputyId,
            category: e.tipoDespesa,
            supplier_name: e.nomeFornecedor,
            supplier_id: e.cnpjCpfFornecedor,
            supplier_type: e.cnpjCpfFornecedor.length > 11 ? 1 : 2,
            net_value: e.valorLiquido,
            glosed_value: e.valorGlosa,
            issue_date: e.dataDocumento || `${e.ano}-${e.mes.toString().padStart(2, '0')}-01`,
            sync_source: 'api'
        }))

        console.log('📤 Enviando para o Supabase...')

        const { error } = await supabase
            .from('expenses')
            .insert(expenses)

        if (error) throw error

        console.log(`✨ Sincronização de despesas do deputado ${deputyId} concluída!`)
    } catch (err) {
        console.error('❌ Falha na sincronização:', err.message)
    }
}

const deputyId = process.argv[2]
if (!deputyId) {
    console.log('Uso: node scripts/sync-expenses.mjs <ID_DEPUTADO>')
    process.exit(1)
}

syncExpenses(deputyId)
