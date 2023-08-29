import axios from "axios";

// const request = axios.create({
//   baseURL: "http://localhost:3000/",
// });
// export const get = async (path, options) => {
//   const response = await request.get(path, options);
//   return response.data;
// };
const patchData = async (data, property) => {
  let path = data.generic + "s";
  let id = data.id;
  console.log(data);
  await axios.patch(`http://localhost:3000/${path}/${id}`, property);
};
export default patchData;
