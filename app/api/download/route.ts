import { NextRequest, NextResponse } from 'next/server';

const axios = require('axios');

type GetParams = {
  params: {
    filename: string;
  };
};

async function downloadImage(url: string) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return response.data;
}

export async function GET(request: NextRequest) {
  const newUrl = new URL(request.url);

  const token: string | null = newUrl.searchParams.get('token');
  const filename = newUrl.searchParams.get('filename');

  const url = `https://test-backend.tdd-tool.eu/builder?token=${token}`;

  let data = await downloadImage(url);
  let header = new Headers();
  header.append('Content-Type', 'application/xml');
  header.append('Content-Disposition', `attachment; filename=${filename}.xml`);

  return new NextResponse(data, { headers: header });
}

// ;
