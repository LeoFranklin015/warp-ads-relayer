"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compositeAndEncodeBase64 = void 0;
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
const puppeteer_1 = __importDefault(require("puppeteer"));
// Function to fetch the main image as a buffer
const fetchMainImage = (mainImageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(mainImageUrl, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
});
// Function to create an image from HTML content
const createHtmlImage = (addContent, width) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.setContent(`
    <style>
      .container {
        width: ${width}px;
        height: 200px;
        font-size: 20px;
      }
    </style>
    <div class="container">
        <div class="container">${addContent}</div>
    </div>
  `);
    //     <div style=" height: 200px; background-color: #f0f0f0" ; display:"flex" justifyContent : "space-between">
    //     <img src="https://www.fabianferno.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fportrait.a4345096.png" height="200px" width="200px" style="object-fit: cover;" style="border-radius : 50%">
    //     <p style="font-size: 24px; color: #333;">This is an example HTML content.</p>
    // </div>
    const element = yield page.$('.container');
    const buffer = yield element.screenshot({ omitBackground: true });
    yield browser.close();
    return buffer;
});
// Function to composite the images, resize if necessary, and return base64-encoded image data
const compositeAndEncodeBase64 = (_a) => __awaiter(void 0, [_a], void 0, function* ({ mainImageUrl, addContent }) {
    try {
        const mainImageBuffer = yield fetchMainImage(mainImageUrl);
        const mainImage = (0, sharp_1.default)(mainImageBuffer);
        const mainImageMetadata = yield mainImage.metadata();
        const htmlImageBuffer = yield createHtmlImage(addContent, mainImageMetadata.width);
        const combinedWidth = mainImageMetadata.width || 0;
        const combinedHeight = (mainImageMetadata.height || 0) + 200; // Height of main image + HTML div
        const combinedImage = (0, sharp_1.default)({
            create: {
                width: combinedWidth,
                height: combinedHeight,
                channels: 4, // Use 4 channels for RGBA to handle transparency
                background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
            }
        });
        // Composite main image and HTML div
        const compositeImageBuffer = yield combinedImage
            .composite([
            { input: mainImageBuffer, top: 0, left: 0 },
            { input: htmlImageBuffer, top: mainImageMetadata.height || 0, left: 0 }
        ])
            .png()
            .toBuffer();
        // Resize image if necessary to reduce file size (less than 256KB)
        const resizedImageBuffer = yield (0, sharp_1.default)(compositeImageBuffer)
            .resize({ width: combinedWidth }) // Resize if necessary to fit within 256KB
            .jpeg({ quality: 80 }) // Adjust JPEG quality to reduce file size
            .toBuffer();
        // Convert resized image buffer to base64
        const base64Image = resizedImageBuffer.toString('base64');
        // Output the base64 data URI
        const dataURI = `data:image/jpeg;base64,${base64Image}`;
        // console.log('Base64 Image:', dataURI);
        return dataURI;
    }
    catch (err) {
        console.error('Error:', err);
        throw new Error('Failed to composite and encode image.');
    }
});
exports.compositeAndEncodeBase64 = compositeAndEncodeBase64;
