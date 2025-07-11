const  {productSync} = require('./products/productTasks');
const {orderCleanup} = require('./orders/orderTasks');

let isRunning = false;

setInterval(async () => {
  if (isRunning) return; // Skip if the previous run hasn't finished

  isRunning = true;
  try {
    console.log('Task running at', new Date().toLocaleTimeString());
    await productSync()
    await orderCleanup()
  } catch (err) {
    console.error('Task error:', err);
  } finally {
    isRunning = false;
  }
}, 60 * 1000);