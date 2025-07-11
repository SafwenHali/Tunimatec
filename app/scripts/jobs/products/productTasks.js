const {updateChangedProducts,addMissingProducts} = require('./productServices')

async function existingProductsSync() {
   try {
    const result = await updateChangedProducts();
    console.log("Existing Products Sync completed.");
    if (result === 0 ){
      throw new Error("failed to update Products");
    }
    return 1
  } catch (err) {
    console.error("Existing Products Sync failed:", err.message);
    return 0
  }
}

exports.productSync = async () => {
   try {
    await existingProductsSync()
    console.log("Product Sync completed.");
    return 1
  } catch (err) {
    console.error("Product Sync failed:", err.message);
    return 0
  }
};