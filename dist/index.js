"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var axios_1 = __importDefault(require("axios"));
var jsdom_1 = require("jsdom");
var satori_1 = __importDefault(require("./satori"));
var getUserLabels_1 = require("./utils/mbd/getUserLabels");
var app = (0, express_1.default)();
var PORT = 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.get("*", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var frame_data, options, targetLabels, query, url, headers, options1, randomAdDisplay, response, data, ads, filteredAds, randomAd, err_1, targetUrl, _a, _, filteredHeaders, response_1, chunks_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                frame_data = {
                    untrustedData: {
                        fid: 389273,
                        url: "https://fcpolls.com/polls/1",
                        messageHash: "0xd2b1ddc6c88e865a33cb1a565e0058d757042974",
                        timestamp: 1706243218,
                        network: 1,
                        buttonIndex: 2,
                        inputText: "hello world", // "" if requested and no input, undefined if input not requested
                        castId: {
                            fid: 226,
                            hash: "0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9",
                        },
                    },
                    trustedData: {
                        messageBytes: "d2b1ddc6c88e865a33cb1a565e0058d757042974...",
                    },
                };
                options = {
                    method: 'POST',
                    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YzNlOGIxYS0yZTI2LTRkNzUtOGQ0Yi1iMWRmNTUyOGJiYWEiLCJlbWFpbCI6ImZhYmlhbmZlcm5vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxMGQ1OWM0ZTUxZDJmNDUyYWZiOCIsInNjb3BlZEtleVNlY3JldCI6IjQ2MzM2OTA1ZTNmYzQ0ZDI4N2M4YTIwYmFhYWU0NjBmZjZjMjIzOTI5OWI5MjA1MWEzMGY4ZWQ4YWQ4Njg0NWUiLCJpYXQiOjE3MTEwMTc2OTZ9._IUzsF1TY5FktV8Z0yN7Xc0UjcM9Mjh1r1DnqdHW3pU', 'Content-Type': 'application/json' },
                    body: '{"frame_id":"relayer","custom_id":"user_123","data":{"untrustedData":{"fid":2,"url":"https://fcpolls.com/polls/1","messageHash":"0xd2b1ddc6c88e865a33cb1a565e0058d757042974","timestamp":1706243218,"network":1,"buttonIndex":2,"inputText":"hello world","castId":{"fid":226,"hash":"0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9"}},"trustedData":{"messageBytes":"d2b1ddc6c88e865a33cb1a565e0058d757042974..."}}}'
                };
                fetch('https://api.pinata.cloud/farcaster/frames/interactions', options)
                    .then(function (response) { return response.json(); })
                    .then(function (response) { return console.log(response); })
                    .catch(function (err) { return console.error(err); });
                return [4 /*yield*/, (0, getUserLabels_1.getUserLabels)(frame_data.untrustedData.fid.toString())];
            case 1:
                targetLabels = _b.sent();
                console.log("data :", targetLabels);
                query = "\n  query MyQuery {\n    ads {\n      id\n      labels\n      metadata\n    }\n  }\n";
                url = "https://api.studio.thegraph.com/query/30735/warp-ads/v0.0.6";
                headers = {
                    "Content-Type": "application/json",
                    // Add your authentication header or any other necessary headers
                    // "Authorization": "Bearer YOUR_TOKEN"
                };
                options1 = {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({ query: query })
                };
                randomAdDisplay = {
                    id: '',
                    labels: [],
                    metadata: ''
                };
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                return [4 /*yield*/, fetch(url, options1)];
            case 3:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
            case 4:
                data = _b.sent();
                ads = data.data.ads;
                filteredAds = ads.filter(function (ad) { return ad.labels.some(function (label) { return targetLabels.includes(label); }); });
                if (filteredAds.length > 0) {
                    randomAd = filteredAds[Math.floor(Math.random() * filteredAds.length)];
                    console.log(randomAd);
                    randomAdDisplay = randomAd;
                }
                else {
                    console.log('No ads match the target labels');
                    return [2 /*return*/, null];
                }
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.error(err_1);
                return [3 /*break*/, 6];
            case 6:
                targetUrl = req.query.url + req.path;
                _b.label = 7;
            case 7:
                _b.trys.push([7, 9, , 10]);
                _a = req.headers, _ = _a["set-cookie"], filteredHeaders = __rest(_a, ["set-cookie"]);
                return [4 /*yield*/, (0, axios_1.default)({
                        method: req.method,
                        url: targetUrl,
                        data: req.body,
                        headers: __assign(__assign({}, filteredHeaders), { host: new URL(targetUrl).host }),
                        responseType: "stream",
                    })];
            case 8:
                response_1 = _b.sent();
                try {
                    chunks_1 = [];
                    response_1.data.on("data", function (chunk) { return chunks_1.push(chunk); });
                    response_1.data.on("end", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var buffer, htmlContent, dom, metaElement, mainUrl, logo, desc, metadataObject, description, title, satoriImg, modifiedHtml;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    buffer = Buffer.concat(chunks_1);
                                    htmlContent = buffer.toString("utf8");
                                    dom = new jsdom_1.JSDOM(htmlContent);
                                    metaElement = dom.window.document.querySelector('meta[name="fc:frame:image"]');
                                    mainUrl = metaElement.getAttribute("content");
                                    logo = "data:image/png;base64,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";
                                    desc = "Near Network calling Builders. Grants22 are OPEN Apply now.";
                                    metadataObject = JSON.parse(randomAdDisplay.metadata);
                                    description = metadataObject.description;
                                    title = metadataObject.title;
                                    return [4 /*yield*/, (0, satori_1.default)(mainUrl, logo, description, title)];
                                case 1:
                                    satoriImg = _a.sent();
                                    if (metaElement) {
                                        metaElement.setAttribute("content", satoriImg);
                                    }
                                    modifiedHtml = dom.serialize();
                                    // Send the modified HTML to the client
                                    res.writeHead(response_1.status, {
                                        "Content-Type": "text/html",
                                        charset: "utf-8",
                                    });
                                    res.end(modifiedHtml);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                catch (error) {
                    console.error("Error parsing HTML:", error);
                    // Relay the original response if parsing fails
                    //   res.writeHead(response.status, response.headers);
                    res.end(response_1.data);
                }
                return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                if (axios_1.default.isAxiosError(error_1) && error_1.response) {
                    // Forward the response from the target server to the client
                    //   res.writeHead(error.response.status, error.response.headers);
                    if (error_1.response.data) {
                        error_1.response.data.pipe(res);
                    }
                    else {
                        res.end();
                    }
                }
                else {
                    console.error("Error relaying request:", error_1);
                    res.status(500).send("Failed to relay request");
                }
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, "0.0.0.0", function () {
    console.log("Server is running at http://localhost:".concat(PORT));
});
