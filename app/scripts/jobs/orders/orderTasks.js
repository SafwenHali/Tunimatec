const {  sendConstact } = require("./contactServices")
const {fetchOrdersWaiting, getorderByID, sendOrder, sendOrderStatus} = require("./orderServices")

exports.orderCleanup = async () => {
   try {
    const orders = await fetchOrdersWaiting();
       for (const i of orders) {
         const order = await getorderByID(i.id);
         const contactResponse = await sendConstact(order.clientID, order.adressID);
         if (
           !contactResponse || 
           contactResponse.AddOrModifyContactResult?.Status !== "200"
         ) {
           console.log("failed to add contact of order: " + i.id);
           continue;
         }
         const commande = await sendOrder(order.cart, contactResponse.AddOrModifyContactResult?.Result);
         if (!commande) {
           console.log("failed to add commande: " + i.id);
           continue;
         }
         const status = await sendOrderStatus(i.id);
         if (!status) {
           console.log("failed to change status of order: " + i.id);
         }
       }
    console.log("Orders cleanup completed.");
    return 1
  } catch (err) {
    console.error("Orders cleanup failed:", err.message);
    return 0
  }
};