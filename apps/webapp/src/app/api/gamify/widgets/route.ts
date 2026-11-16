import { NextResponse } from 'next/server';
import { getGamifyWidgets } from '@/lib/gamify-data';

export async function GET() {
  const widgets = getGamifyWidgets();
  return NextResponse.json({
    success: true,
    total: widgets.length,
    widgets
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
