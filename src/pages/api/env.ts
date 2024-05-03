import type {NextApiRequest, NextApiResponse} from 'next';
import {clientEnv} from '../../env/schema.mjs';
import {env} from '../../env/server.mjs';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	res.status(200).json({process: process.env, clientEnv, env});
}