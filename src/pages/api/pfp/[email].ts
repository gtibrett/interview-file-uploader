// 'use server';

import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {IImage} from '@giphy/js-types/dist/images';
import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from 'next';

const s3Client = new S3Client({
	credentials: {
		accessKeyId:     process.env.AWS_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
	},
	region:      process.env.AWS_REGION
});


type ResponseData = {
	url?: string;
	error?: string;
}

function get(email: string, res: NextApiResponse<ResponseData>) {
	const command = new GetObjectCommand({
		Bucket: process.env.AWS_BUCKET,
		Key:    email as string
	});
	
	s3Client.send(command)
	        .then(result => res.status(200).json({url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${email}`}))
	        .catch(error => {
		        console.error(error);
		        res.status(404).json({error: 'file not found'});
	        });
}

function post(email: string, body: IImage, res: NextApiResponse<any>) {
	const {url} = body;
	
	axios.get(url, {
		     responseType: 'blob'
	     })
	     .then(response => response.data)
	     .then(data => {
		     const command = new PutObjectCommand({
			     Bucket:      process.env.AWS_BUCKET,
			     Key:         email as string,
			     Body:        data, // FIXME: data isn't formatted correctly for S3
			     ContentType: 'image/gif'
		     });
		     
		     s3Client.send(command)
		             .then(result => res.status(200).json({url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${email}`, data}))
		             .catch(error => {
			             console.error(error);
			             res.status(404).json({error: 'file upload failed'});
		             });
	     })
	     .catch(() => res.status(404).json({error: `file could not be retrieved from giphy ${url}`, body}));
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const {email} = req.query;
	
	if (!email) {
		res.status(404).json({error: 'file not found'});
	} else {
		switch (req.method?.toUpperCase()) {
			case 'GET':
				get(email as string, res);
				break;
			
			case 'POST':
				post(email as string, req.body, res);
				break;
			
		}
	}
}