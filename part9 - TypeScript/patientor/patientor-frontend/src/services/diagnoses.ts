import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getCodes = async () => {

  const { data } = await axios.get<Array<Diagnosis['code']>>(`${apiBaseUrl}/diagnoses/codes`);

  console.log('retrieved Diagnosis codes: ', data);

  return data;
}

export default {
  getAll,
  getCodes
};