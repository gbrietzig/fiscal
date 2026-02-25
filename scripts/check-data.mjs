import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../src/apps/frontend/.env.local') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function check() {
    const { count: depCount } = await supabase.from('deputies').select('*', { count: 'exact', head: true })
    console.log('Deputados:', depCount)

    const { count: expCount } = await supabase.from('expenses').select('*', { count: 'exact', head: true })
    console.log('Despesas:', expCount)

    const { data: samples } = await supabase.from('expenses').select('issue_date, net_value').limit(5)
    console.log('Amostras de datas:', samples)
}

check()
