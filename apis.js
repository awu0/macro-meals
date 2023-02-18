const axios = require("axios");

/**
 * Calls the Nutritionix API for data on foods
 *
 * @param {*} query a generic search term, leave blank to include all items
 * @returns
 */
async function callAPI(query) {
  const appId = process.env.appId;
  const appKey = process.env.appKey;

  try {
    // const response = await axios.get(
    //   `https://api.nutritionix.com/v1_1/search/${search}?results=0:50&fields=item_name,brand_name,item_id,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein,nf_sugars&appId=${appId}&appKey=${appKey}`
    // );

    const response = await axios.post("https://api.nutritionix.com/v1_1/search", {
      appId: appId,
      appKey: appKey,
      query,
      fields: [
        "item_name",
        "brand_name",
        "upc",
        "nf_calories",
        "nf_total_fat",
        "nf_total_carbohydrate",
        "nf_protein",
        "nf_sugars",
      ],
      offset: 0,
      limit: 50,
      sort: {
        field: "nf_calories",
        order: "desc",
      },
      filters: {
        nf_calories: {
          from: 1000,
          to: 10000,
        },
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

exports.callAPI = callAPI;
