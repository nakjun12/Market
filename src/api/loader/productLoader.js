// productLoader.js
import { getPostById } from "../marketApi";

export const productLoader = async ({ params }) => {
  try {
    console.log(params.productid, "params.productid", params);
    const response = await getPostById(params.productid);
    return response.data;
  } catch (e) {
    console.log(e);
    return { error: "Error", message: e.message };
  }
};
