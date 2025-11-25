// import axios from "axios";

// export async function triggerN8N(payload) {
//   await axios.post(process.env.N8N_WEBHOOK_URL, payload);
// }







import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function triggerN8N(payload){
  if(!process.env.N8N_WEBHOOK_URL) return;
  try {
    await axios.post(process.env.N8N_WEBHOOK_URL, payload, { timeout: 5000 });
  } catch(err){
    console.error('n8n trigger failed',err);
  }
}
