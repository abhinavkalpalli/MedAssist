import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { join } from 'path';
dotenv.config({ path: join('./src', '.env') });


// Define interfaces for the payload and tokens
export interface Payload {
  _id?: string;
  email?: string;
  userId?: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// @desc    Sign JWT Refresh token
// @file    < Middleware-function >
// @access  Private
const generateRefreshToken = (payload: Payload): Promise<string> => {
  return new Promise((resolve, reject) => {
    const options = { expiresIn: '10d' };
    // signing new refresh token with an expiration time of 10 days
    jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET as string,
      options,
      (err, refreshToken) => {
        if (err) {
          reject(err);
        } else {
          resolve(refreshToken as string);
        }
      }
    );
  });
};

// @desc    Sign JWT token
// @file    < Middleware >
// @access  Private
const generateJwt = (data: Payload): Promise<Tokens> => {
  return new Promise((resolve, reject) => {
    try {
      const tokens: Tokens = { accessToken: '', refreshToken: '' };
      const options = { expiresIn: '1hr' }; // Adjusted to 1 hour as per your requirement
      const payload: Payload = {};

      if (data._id) {
        payload.userId = data._id as string; // Ensure _id is treated as string
      } else if (data.email) {
        payload.email = data.email;
      }

      // signing new access token with an expiration time of 1 hr
      jwt.sign(
        payload,
        process.env.JWT_KEY_SECRET as string,
        options,
        (err, accessToken) => {
          if (err) {
            reject(err);
          } else {
            tokens.accessToken = accessToken as string;

            // calling function to generate refresh token
            generateRefreshToken(payload)
              .then((refreshToken) => {
                tokens.refreshToken = refreshToken;
                resolve(tokens);
              })
              .catch((err) => {
                reject(err);
              });
          }
        }
      );
    } catch (error) {
      reject(error);
      console.log('Error generating JWT', error);
    }
  });
};

export default generateJwt;
