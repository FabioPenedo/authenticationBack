import {Request, Response, NextFunction } from 'express';
import {User} from '../models/User'
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let success = false;
        
        if(req.headers.authorization){
            const [authToken, token] = req.headers.authorization.split(' ');
            if(authToken === 'Bearer'){
                try {
                    JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    );
                    success = true
                } catch (err) {
                    
                }
            }
        };

        if(success){
            next()
        } else {
            res.status(403); // Not authorized
            res.json({error: 'Não autorizado'});
        };
    }
};