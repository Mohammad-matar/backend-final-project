var express = require('express');
var router = express.Router();
var controller = require('../controllers/ProductControllers')
const multer = require("multer");

const path = "public/uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', upload.single("image"), controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
