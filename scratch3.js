import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env');
const envStr = fs.readFileSync(envPath, 'utf8');
const lines = envStr.split('\n');
const env = {};
lines.forEach(l => {
  const [k, ...v] = l.split('=');
  if (k && v) env[k] = v.join('=').replace(/['"]/g, '');
});

const BASE_URL = env.VITE_CMS_BASE_URL;
const API_KEY = env.VITE_CMS_API_KEY;

async function test() {
  const url = `${BASE_URL}/api/v1/public/posts/panen-raya-padi-organik-varietas-unggul`;
  const res = await fetch(url, { headers: { 'x-api-key': API_KEY }});
  const data = await res.json();
  const post = Array.isArray(data) ? data[0] : data;
  console.log(JSON.stringify(post.content, null, 2));
}
test();
