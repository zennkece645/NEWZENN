const { spawn } = require('child_process');

// Ambil argumen dari command line
const [, , url, numOfProcesses, duration] = process.argv;

// Fungsi untuk menjalankan proses
function runProcess(url) {
  const childProcess = spawn('go', ['run', 'tls.go', '-url', url]);

  // Tampilkan output dari proses
  childProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  // Tampilkan error dari proses jika ada
  childProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Tangkap event jika proses selesai
  childProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

// Fungsi untuk menjalankan proses a sebanyak numOfProcesses selama duration detik
function runProcesses(url, numOfProcesses, duration) {
  for (let i = 0; i < numOfProcesses; i++) {
    runProcess(url);
  }

  // Setelah durasi tertentu, hentikan semua proses
  setTimeout(() => {
    console.log('Waktu habis. Menghentikan proses...');
    process.exit(0);
  }, duration * 1000);
}

// Jalankan fungsi utama
runProcesses(url, parseInt(numOfProcesses), parseInt(duration));
