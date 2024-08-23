import CryptoJS from "crypto-js";
import { gen } from './zd'
// AES
const decryptAES = (value) => {
    const k = gen("11,8,1,17,0,17,24,27,28,29,30,31,32,33,34,35")
    // Base64 解码
    const encryptedBytes = CryptoJS.enc.Base64.parse(value);
    // AES 解密
    const decryptedBytes = CryptoJS.AES.decrypt(
        { ciphertext: encryptedBytes },
        CryptoJS.enc.Utf8.parse(k),
        {
            iv: CryptoJS.enc.Utf8.parse(k)
        }
    );
    const d = decryptedBytes.toString(CryptoJS.enc.Utf8)
    return d
}

export {
    decryptAES
}