const axios = require("axios");

/**
 * Calls the Nutritionix API for data on foods
 *
 * @param {*} query a generic search term, leave blank to include all items
 * @param {*} from_calories
 * @param {*} to_calories
 * @returns
 */
async function callAPI(query, from_calories = 0, to_calories = 99999) {
  const appId = process.env.appId;
  const appKey = process.env.appKey;

  try {
    let postData = {
      appId: appId,
      appKey: appKey,
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
          from: from_calories,
          to: to_calories,
        },
      },
    };

    if (query != "") {
      postData["query"] = query;
    }

    const response = await axios.post("https://api.nutritionix.com/v1_1/search", postData);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

exports.callAPI = callAPI;
