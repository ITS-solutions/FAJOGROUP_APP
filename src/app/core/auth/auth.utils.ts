// -----------------------------------------------------------------------------------------------------
// @ AUTH UTILITIES
//
// Methods are derivations of the Auth0 Angular-JWT helper service methods
// https://github.com/auth0/angular2-jwt
// -----------------------------------------------------------------------------------------------------

export class AuthUtils {
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Is token expired?
     *
     * @param token
     * @param offsetSeconds
     */
    static isTokenExpired(token: string, offsetSeconds?: number): boolean {
        // Return if there is no token
        if (!token || token === '') {
            return true;
        }

        // Get the expiration date
        const date = this._getTokenExpirationDate(token);

        offsetSeconds = offsetSeconds || 0;

        if (date === null) {
            return true;
        }

        // Check if the token is expired
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Base64 decoder
     * Credits: https://github.com/atk
     *
     * @param str
     * @private
     */
    private static _b64decode(str: string): string {
        console.log("🚀 ~ AuthUtils ~ _b64decode ~ str:", str)
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';

        str = String(str).replace(/=+$/, '');

        if (str.length % 4 === 1) {
            throw new Error(
                "'atob' failed: The string to be decoded is not correctly encoded."
            );
        }

        /* eslint-disable */
        for (
            // initialize result and counters
            let bc = 0, bs: any, buffer: any, idx = 0;
            // get next character
            (buffer = str.charAt(idx++));
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
                ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                    bc++ % 4)
                ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                : 0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        /* eslint-enable */

        return output;
    }

    /**
     * Base64 unicode decoder
     *
     * @param str
     * @private
     */
    private static _b64DecodeUnicode(str: any): string {
        return decodeURIComponent(
            Array.prototype.map
                .call(
                    this._b64decode(str),
                    (c: any) =>
                        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                )
                .join('')
        );
    }

    /**
     * URL Base 64 decoder
     *
     * @param str
     * @private
     */
    private static _urlBase64Decode(str: string): string {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw Error('Illegal base64url string!');
            }
        }
        return this._b64DecodeUnicode(output);
    }

    /**
     * Decode token
     *
     * @param token
     * @private
     */
    private static _decodeToken(token: string): any {
        const fechaActual = new Date();
        return fechaActual.setDate(fechaActual.getDate() + 2);
    }

    /**
     * Get token expiration date
     *
     * @param token
     * @private
     */
    private static _getTokenExpirationDate(token: string): Date | null {
        // Get the decoded token
        const decodedToken = this._decodeToken(token);

        // Return if the decodedToken doesn't have an 'exp' field
        if (!decodedToken.hasOwnProperty('exp')) {
            return null;
        }

        // Convert the expiration date
        const date = new Date(decodedToken);

        return date;
    }
}

export interface AuthResponse {
    data: {
        access_token: string;
        user: {
            id: number;
            name: string;
            lastame: string; // Posible error en backend, debería ser `lastname`
            email: string;
            avatar?: string;
            status?: string;
        };
    };
}
