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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLabels = void 0;
var axios = require('axios');
var getUserLabels = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var url, headers, data, response, topTopics, addedTopics, _i, _a, item, _b, _c, topic, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                url = 'https://api.mbd.xyz/v1/farcaster/casts/feed/for-you';
                headers = {
                    'HTTP-Referer': 'https://docs.mbd.xyz/',
                    'X-Title': 'mbd_docs',
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'x-api-key': 'mbd-1e4d8dd37944abfd650de2c3cd8a2d39cda43e1b607041ba3939350e84faa736',
                };
                data = {
                    user_id: '389273',
                    return_ai_labels: true,
                };
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios.post(url, data, { headers: headers })];
            case 2:
                response = _d.sent();
                console.log('Response:', response.data);
                topTopics = [];
                addedTopics = new Set();
                // Loop through the items in the response body
                for (_i = 0, _a = response.data.body; _i < _a.length; _i++) {
                    item = _a[_i];
                    // Check if the current item has topics and add unique topics to the array
                    if (item.labels.topics.length > 0) {
                        for (_b = 0, _c = item.labels.topics; _b < _c.length; _b++) {
                            topic = _c[_b];
                            if (!addedTopics.has(topic)) {
                                topTopics.push(topic);
                                addedTopics.add(topic);
                            }
                            // Break if we have collected 3 topics
                            if (topTopics.length >= 3) {
                                break;
                            }
                        }
                    }
                    // Break the loop if we have collected 3 topics
                    if (topTopics.length >= 3) {
                        break;
                    }
                }
                console.log('Top 3 Unique Topics:', topTopics);
                return [2 /*return*/, topTopics]; // Return top topics array if needed
            case 3:
                error_1 = _d.sent();
                console.error('Error:', error_1);
                throw new Error('Failed to fetch user labels.');
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserLabels = getUserLabels;
