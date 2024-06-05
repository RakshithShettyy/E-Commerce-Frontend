// src/utils/crypto.js

const secretKey = 123; // You can use any number as a simple key

// XOR and Base64 encoding
export const encodeId = (id) => {
  let encoded = "";
  for (let i = 0; i < id.length; i++) {
    encoded += String.fromCharCode(id.charCodeAt(i) ^ secretKey);
  }
  return btoa(encoded);
};

// XOR and Base64 decoding
export const decodeId = (encodedId) => {
  let decoded = atob(encodedId);
  let decrypted = "";
  for (let i = 0; i < decoded.length; i++) {
    decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ secretKey);
  }
  return decrypted;
};
