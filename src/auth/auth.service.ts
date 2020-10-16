import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Payload } from 'src/types/payload.types';

@Injectable()
export class AuthService {

    async signPayload(payload: Payload) {
        return sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    }
}
