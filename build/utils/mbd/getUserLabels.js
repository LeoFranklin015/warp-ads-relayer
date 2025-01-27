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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLabels = void 0;
const axios = require('axios');
const getUserLabels = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://api.mbd.xyz/v1/farcaster/casts/feed/for-you';
    const headers = {
        'HTTP-Referer': 'https://docs.mbd.xyz/',
        'X-Title': 'mbd_docs',
        'accept': 'application/json',
        'content-type': 'application/json',
        'x-api-key': 'mbd-1e4d8dd37944abfd650de2c3cd8a2d39cda43e1b607041ba3939350e84faa736',
    };
    const data = {
        user_id: '389273',
        return_ai_labels: true,
    };
    try {
        const response = yield axios.post(url, data, { headers });
        console.log('Response:', response.data);
        // Initialize an array to store unique top topics
        const topTopics = [];
        // Initialize a set to track added topics
        const addedTopics = new Set();
        // Loop through the items in the response body
        for (let item of response.data.body) {
            // Check if the current item has topics and add unique topics to the array
            if (item.labels.topics.length > 0) {
                for (let topic of item.labels.topics) {
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
        return topTopics; // Return top topics array if needed
    }
    catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch user labels.');
    }
});
exports.getUserLabels = getUserLabels;
