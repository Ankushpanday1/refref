import { NextRequest, NextResponse } from 'next/server';
import { resetGamifyWidget } from '@/lib/gamify-data';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const reset = resetGamifyWidget(id);
  if (!reset) {
    return NextResponse.json({ success: false, error: 'Widget not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, widget: reset }, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  });
}
