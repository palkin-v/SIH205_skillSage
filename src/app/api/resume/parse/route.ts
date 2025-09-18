import { NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/resume/parseResume";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
	try {
		const contentType = req.headers.get("content-type") || "";
		if (!contentType.includes("multipart/form-data")) {
			return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
		}
		const form = await req.formData();
		const file = form.get("file");
		if (!file || !(file instanceof File)) {
			return NextResponse.json({ error: "Missing file" }, { status: 400 });
		}
		const parsed = await parseResume(file);
		return NextResponse.json(parsed);
	} catch (error: any) {
		console.error("Resume parse failed", error);
		return NextResponse.json({ error: error?.message || "Failed to parse resume" }, { status: 500 });
	}
} 