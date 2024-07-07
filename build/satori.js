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
exports.default = satoriFunc;
// @ts-ignore
const satori_1 = __importDefault(require("satori"));
const resvg_js_1 = require("@resvg/resvg-js");
const html = (...args) => __awaiter(void 0, void 0, void 0, function* () {
    const { html } = yield import('satori-html');
    // @ts-ignore
    return html(...args);
});
function loadYogaWasm() {
    return __awaiter(this, void 0, void 0, function* () {
        const { Yoga } = yield import('yoga-wasm-web');
        return Yoga;
    });
}
function satoriFunc(frameImg, addImg, desc, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const template = yield html(`
     <div style="font-family: Roboto; display: flex; flex-direction: column; font-size: 24px; color: #000000; width:100%; height:100%;">
        <img src=${frameImg} alt="Park" style="width: 100%; height: 80%; ">
        <div style="display : flex; align-self : center; gap:30px">
        <img src=${addImg} alt="Park" style="width: 50px; height: 50px; border-radius : 50% ;margin-top:7px">
        <div style="display :flex ;flex-direction: column;">
         <p style="font-size: 10px; align-self: center; max-width: 180px; display: flex; white-space: pre-wrap; word-wrap: break-word;">
    ${desc}
</p>
        </div>
        
        </div>
     </div>
   `);
        //             <p style="font-size: 10px; align-self: center; max-width: 180px; display: flex; white-space: pre-wrap; word-wrap: break-word;">
        //     ${title}
        // </p>
        const yoga = yield loadYogaWasm();
        const inter = fetch('https://og-playground.vercel.app/inter-latin-ext-400-normal.woff').then((res) => res.arrayBuffer());
        const svg = yield (0, satori_1.default)(template, {
            width: 400,
            height: 300,
            fonts: [
                {
                    name: 'Roboto',
                    data: yield inter,
                    weight: 400,
                    style: 'normal',
                },
            ],
        });
        const resvg = new resvg_js_1.Resvg(svg, {
            background: "rgba(238, 235, 230, .9)",
        });
        const pngData = resvg.render();
        const pngBuffer = pngData.asPng();
        const base64Png = pngBuffer.toString('base64');
        const dataURI = `data:image/jpeg;base64,${base64Png}`;
        return dataURI;
    });
}
