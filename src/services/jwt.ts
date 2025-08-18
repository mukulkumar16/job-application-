type Data = {
    id : string,
}

import jwt from 'jsonwebtoken';

export function createToken(data : Data){
    const token = jwt.sign(data , process.env.JWT_SECRET as string);
    return token;
}

export function verifyToken(token : string){
   try{ const data = jwt.verify(token , process.env.JWT_SECRET as string);
    return data;}
    catch{
        return null;
    }

}