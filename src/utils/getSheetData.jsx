import axios from "axios";

const SHEET_ID = "TU_SHEET_ID";
const API_KEY = "TU_GOOGLE_API_KEY";

export const getSheetData = async (sheetName) => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.values;
  } catch (error) {
    console.error("Error obteniendo datos de Google Sheets", error);
    return [];
  }
};
