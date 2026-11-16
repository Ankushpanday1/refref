import { NextRequest, NextResponse } from 'next/server';
import { getGamifyWidgetById, updateGamifyWidget } from '@/lib/gamify-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const widget = getGamifyWidgetById(id);
  if (!widget) {
    return NextResponse.json({ success: false, error: 'Widget not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, widget }, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = updateGamifyWidget(id, body.config || body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Widget not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, widget: updated }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
