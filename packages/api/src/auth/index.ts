import jwt from 'jsonwebtoken';

const JWT_SECRET = "asdmflkasmdklfmaklsdmgklasmdgklamsdklgmaslkdgnlasdad"

export const auth = {
    verify: (req: Request) => {
        const token = req.headers.get('authorization')?.replace('Bearer ', '');
        const { id } = jwt.verify(token ?? '', JWT_SECRET) as { id: string };
        return {
            user: { id }
        }
    }
}