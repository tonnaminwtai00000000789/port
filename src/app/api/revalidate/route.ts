import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = body?.path || "/";
    revalidatePath(path);
    revalidatePath("/works");
    revalidatePath("/blogs");
    return NextResponse.json({ success: true, revalidated: true, path });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
