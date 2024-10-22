import * as crypto from 'crypto-ts';

const key:string = import.meta.env.CRYPTO_KEY

export function encrypt( text: string ): string {
    return crypto.AES.encrypt(text, key).toString()
}
