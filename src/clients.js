import { createClient} from '@supabase/supabase-js'

const URL = "https://feknupsiqhsxzphaumdz.supabase.co"
const API_KEY = "sb_publishable_WbZbPQPFd7iDBO1-FAmnKg_xqiQqKqr"
// const supabase = creatClient(URL, API_KEY)
export const supabase = createClient(URL, API_KEY)

// Check if the connection is successful
async function testConnection() {
    const {data, error} = await supabase.from("creators").select("*");
    if (error) {
        console.error("Connection failed:", error);
    } else {
        console.log("Connection successful:", data);

    }
}

testConnection();