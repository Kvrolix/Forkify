import { TIMEOUT_SEC } from './config.js';

// It will reject the promise after a certain number of seconds, so basically when someone has a low connection it won't crach

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, //in the JSON format
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    console.log(err);
    throw err; // So the promise that is being returned from get JSon will actually reject, so we can then handle the error in different place
  }
};
/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    console.log(err);
    throw err; // So the promise that is being returned from get JSon will actually reject, so we can then handle the error in different place
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, //in the JSON format
      body: JSON.stringify(uploadData),
    });
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    console.log(err);
    throw err; // So the promise that is being returned from get JSon will actually reject, so we can then handle the error in different place
  }
};
*/
