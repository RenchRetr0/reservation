import * as crypto from 'crypto';

export function convertObjectToHash<T>(object: T): string {
    return crypto
        .createHash('sha256')
        .update(JSON.stringify(object), 'utf-8')
        .digest('hex' as crypto.BinaryToTextEncoding);
}
