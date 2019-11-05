import bcrypt from 'bcrypt';

export const decryptpw = (userpw, hashedpw) => bcrypt.compareSync(userpw, hashedpw);
