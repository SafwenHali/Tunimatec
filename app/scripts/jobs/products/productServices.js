const axios = require('axios');
const {selectProductByRef, getFinalStockByProductId,UpdateStockAvailable,selectStockByProductId} = require('./productModels')

async function fetchNavItems(ref = '') {
  const reqBody = {
    request: {
      Reference: ref
    }
  };

  try {
    const response = await axios.post(process.env.GET_Items, reqBody);
    return response.data;
  } catch (err) {
    console.error('API error:', err.message);
    return err.message;
  }
}

exports.updateChangedProducts = async () => {
   try {
    console.log ("Attempting to update products  ... ")
    const data = await fetchNavItems()
    for(const i of data.GetItemsResult.Items)
    {
      let prod = await selectProductByRef(i.Référence)
      const stockReserve = await getFinalStockByProductId(prod.data[0].id_product)

      const available = stockReserve.data[0].quantity;
      const reserved = stockReserve.data[0].reserved_quantity
      const total =  available + reserved

      let stock = 0
      if(i.Quantité>0){
        stock = i.Quantité
      };

      const stockMatch = Math.abs(stock - available) < Number.EPSILON;

      if(!stockMatch) 
        { 
          console.log(i.Référence + " : stock doesn't Match") ;
          const stockId = await selectStockByProductId (prod.data[0].id_product);
          const update = await UpdateStockAvailable(stock ,stockId.data[0].id_stock_available);
          console.log("Attempted to update stock  for : "+ i.Référence);
        }
      
   }
    return 1;
  } catch (err) {
    console.error('error:', err.message);
    return 0;
  }
};