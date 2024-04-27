import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  return Response.json(
    {
      success: true,
      data: req.cookies.get("NEXT_LOCALE"),
    },
    {
      status: 200,
    }
  );
}
