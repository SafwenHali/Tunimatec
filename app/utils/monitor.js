setInterval(() => {
  const used = process.memoryUsage();
  const cpu = process.cpuUsage();
  console.log("Memory (MB):", {
    rss: (used.rss / 1024 / 1024).toFixed(2),
    heapTotal: (used.heapTotal / 1024 / 1024).toFixed(2),
    heapUsed: (used.heapUsed / 1024 / 1024).toFixed(2),
  });
  console.log("CPU Time (ms):", {
    user: (cpu.user / 1000).toFixed(2),
    system: (cpu.system / 1000).toFixed(2),
  });
}, 5000);