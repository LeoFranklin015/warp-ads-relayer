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
exports.default = satoriFunc;
// @ts-ignore
var satori_1 = __importDefault(require("satori"));
var resvg_js_1 = require("@resvg/resvg-js");
var html = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, import('satori-html')];
                case 1:
                    html = (_a.sent()).html;
                    // @ts-ignore
                    return [2 /*return*/, html.apply(void 0, args)];
            }
        });
    });
};
function satoriFunc(frameImg, addImg, desc, title) {
    return __awaiter(this, void 0, void 0, function () {
        var template, inter, svg, _a, _b, resvg, pngData, pngBuffer, base64Png, dataURI;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, html("\n     <div style=\"font-family: Roboto; display: flex; flex-direction: column; font-size: 24px; color: #000000; width:100%; height:100%;\">\n        <img src=".concat(frameImg, " alt=\"Park\" style=\"width: 100%; height: 80%; \">\n        <div style=\"display : flex; align-self : center; gap:30px\">\n        <img src=").concat(addImg, " alt=\"Park\" style=\"width: 50px; height: 50px; border-radius : 50% ;margin-top:7px\">\n        <div style=\"display :flex ;flex-direction: column;\">\n         <p style=\"font-size: 10px; align-self: center; max-width: 180px; display: flex; white-space: pre-wrap; word-wrap: break-word;\">\n    ").concat(desc, "\n</p>\n        </div>\n        \n        </div>\n     </div>\n   "))
                    //             <p style="font-size: 10px; align-self: center; max-width: 180px; display: flex; white-space: pre-wrap; word-wrap: break-word;">
                    //     ${title}
                    // </p>
                ];
                case 1:
                    template = _e.sent();
                    inter = fetch('https://og-playground.vercel.app/inter-latin-ext-400-normal.woff').then(function (res) { return res.arrayBuffer(); });
                    _a = satori_1.default;
                    _b = [template];
                    _c = {
                        width: 400,
                        height: 300
                    };
                    _d = {
                        name: 'Roboto'
                    };
                    return [4 /*yield*/, inter];
                case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_c.fonts = [
                            (_d.data = _e.sent(),
                                _d.weight = 400,
                                _d.style = 'normal',
                                _d)
                        ],
                            _c)]))];
                case 3:
                    svg = _e.sent();
                    resvg = new resvg_js_1.Resvg(svg, {
                        background: "rgba(238, 235, 230, .9)",
                    });
                    pngData = resvg.render();
                    pngBuffer = pngData.asPng();
                    base64Png = pngBuffer.toString('base64');
                    dataURI = "data:image/jpeg;base64,".concat(base64Png);
                    return [2 /*return*/, dataURI];
            }
        });
    });
}
