const form = document.getElementById('dbForm') as HTMLFormElement;
const errorDiv = document.getElementById('errorMessage') as HTMLDivElement;

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    host: (document.getElementById('host') as HTMLInputElement).value,
    port: (document.getElementById('port') as HTMLInputElement).value,
    database: (document.getElementById('database') as HTMLInputElement).value,
    user: (document.getElementById('user') as HTMLInputElement).value,
    password: (document.getElementById('password') as HTMLInputElement).value
  };

  try {
    const response = await fetch('/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      sessionStorage.setItem('dbConnected', 'true');
      window.location.href = '/index.html';
    } else {
      throw new Error(result.message || 'Error de conexión');
    }
  } catch (err: any) {
    errorDiv.textContent = err.message;
    errorDiv.style.display = 'block';
  }
});
