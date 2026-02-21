const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL ?? 'http://localhost:4000';

const root = document.querySelector('#app');
root.innerHTML = `
  <div style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; max-width: 900px; margin: 0 auto;">
    <h2 style="margin: 0 0 8px;">Live Upload Viewer</h2>
    <p style="margin: 0 0 16px; opacity: 0.75;">Polling: <b>${SERVER_BASE_URL}/latest</b></p>
    <div id="status" style="margin: 0 0 12px; opacity: 0.75;">Waiting for an upload…</div>
    <img id="img" style="display:none; max-width: 100%; border-radius: 12px;" />
  </div>
`;

const statusEl = document.querySelector('#status');
const imgEl = document.querySelector('#img');

let lastUrl = null;

async function poll() {
  try {
    const res = await fetch(`${SERVER_BASE_URL}/latest`, { cache: 'no-store' });
    const data = await res.json();
    if (!data.imageUrl) {
      statusEl.textContent = 'Waiting for an upload…';
      return;
    }

    const fullUrl = `${SERVER_BASE_URL}${data.imageUrl}`;
    if (fullUrl !== lastUrl) {
      lastUrl = fullUrl;
      imgEl.src = fullUrl;
      imgEl.style.display = 'block';
      statusEl.textContent = `Latest: ${fullUrl}`;
    }
  } catch (e) {
    statusEl.textContent = `Error: ${e instanceof Error ? e.message : String(e)}`;
  }
}

setInterval(poll, 1000);
poll();
