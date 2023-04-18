import axios from "axios";

export async function getServerConfig() {
  return await new Promise((resolve, reject) => {
    axios
      .get("./serverConfig.json")
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
