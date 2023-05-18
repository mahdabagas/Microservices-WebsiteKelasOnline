// Untuk mendapatkan  image /data yang telah dibuat pada service media
const { error } = require("daisyui/src/colors");
const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_MEDIA } = process.env;

const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const media = await api.get("/media");
    return res.json(media.data);
  } catch (err) {
    
    //Membuat response 500 apabila service media mati
    if (err.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    const { status, data } = err.response;
    return res.status(status).json(data);
  }
};
