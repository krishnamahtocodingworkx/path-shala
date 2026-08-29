import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogData } from "../apis"

export const getCatalogaPageData = async (categoryId) => {
  let result = null
  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId,
    })

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch category page data")
    }

    result = response.data
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error)
    toast.error(error?.response?.data?.message || error.message)
    result = error?.response?.data || { success: false, message: error.message }
  }
  return result
}
