require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
const cors = require("cors");
const { getCachedPublicId, setCachedPublicId } = require("./redis");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/remove-bg", async (req, res) => {
  try {
    const { url, secret, tolerance = 5 } = req.body;
    if (secret !== process.env.SECRET) {
      return res.sendStatus(401);
    }
    let publicId = await getCachedPublicId(url);
    if (!publicId) {
      publicId = Math.random().toString(36).slice(2);
      const res = await cloudinary.uploader.upload(url, {
        public_id: publicId,
      });
      await setCachedPublicId(url, res.public_id);
    }
    const result = cloudinary.url(`${publicId}.png`, {
      effect: `make_transparent:${tolerance}`,
    });
    return res.status(200).send(result);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${port}...`);
});
