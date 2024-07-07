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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compositeAndEncodeBase64 = void 0;
var axios_1 = __importDefault(require("axios"));
var sharp_1 = __importDefault(require("sharp"));
var puppeteer_1 = __importDefault(require("puppeteer"));
// Function to fetch the main image as a buffer
var fetchMainImage = function (mainImageUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get(mainImageUrl, { responseType: 'arraybuffer' })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, Buffer.from(response.data, 'binary')];
        }
    });
}); };
// Function to create an image from HTML content
var createHtmlImage = function (addContent, width) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, element, buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.setContent("\n    <style>\n      .container {\n        width: ".concat(width, "px;\n        height: 200px;\n        font-size: 20px;\n      }\n    </style>\n    <div class=\"container\">\n        <div class=\"container\">").concat(addContent, "</div>\n    </div>\n  "))];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.$('.container')];
            case 4:
                element = _a.sent();
                return [4 /*yield*/, element.screenshot({ omitBackground: true })];
            case 5:
                buffer = _a.sent();
                return [4 /*yield*/, browser.close()];
            case 6:
                _a.sent();
                return [2 /*return*/, buffer];
        }
    });
}); };
// Function to composite the images, resize if necessary, and return base64-encoded image data
var compositeAndEncodeBase64 = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var mainImageBuffer, mainImage, mainImageMetadata, htmlImageBuffer, combinedWidth, combinedHeight, combinedImage, compositeImageBuffer, resizedImageBuffer, base64Image, dataURI, err_1;
    var mainImageUrl = _b.mainImageUrl, addContent = _b.addContent;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                return [4 /*yield*/, fetchMainImage(mainImageUrl)];
            case 1:
                mainImageBuffer = _c.sent();
                mainImage = (0, sharp_1.default)(mainImageBuffer);
                return [4 /*yield*/, mainImage.metadata()];
            case 2:
                mainImageMetadata = _c.sent();
                return [4 /*yield*/, createHtmlImage(addContent, mainImageMetadata.width)];
            case 3:
                htmlImageBuffer = _c.sent();
                combinedWidth = mainImageMetadata.width || 0;
                combinedHeight = (mainImageMetadata.height || 0) + 200;
                combinedImage = (0, sharp_1.default)({
                    create: {
                        width: combinedWidth,
                        height: combinedHeight,
                        channels: 4, // Use 4 channels for RGBA to handle transparency
                        background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
                    }
                });
                return [4 /*yield*/, combinedImage
                        .composite([
                        { input: mainImageBuffer, top: 0, left: 0 },
                        { input: htmlImageBuffer, top: mainImageMetadata.height || 0, left: 0 }
                    ])
                        .png()
                        .toBuffer()];
            case 4:
                compositeImageBuffer = _c.sent();
                return [4 /*yield*/, (0, sharp_1.default)(compositeImageBuffer)
                        .resize({ width: combinedWidth }) // Resize if necessary to fit within 256KB
                        .jpeg({ quality: 80 }) // Adjust JPEG quality to reduce file size
                        .toBuffer()];
            case 5:
                resizedImageBuffer = _c.sent();
                base64Image = resizedImageBuffer.toString('base64');
                dataURI = "data:image/jpeg;base64,".concat(base64Image);
                // console.log('Base64 Image:', dataURI);
                return [2 /*return*/, dataURI];
            case 6:
                err_1 = _c.sent();
                console.error('Error:', err_1);
                throw new Error('Failed to composite and encode image.');
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.compositeAndEncodeBase64 = compositeAndEncodeBase64;
