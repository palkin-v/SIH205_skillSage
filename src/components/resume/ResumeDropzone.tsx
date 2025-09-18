"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from "lucide-react";

export interface ResumeParsedData {
	name?: string;
	email?: string;
	phone?: string;
	skills?: string[];
	education?: string[];
	experience?: string[];
	rawText: string;
}

export function ResumeDropzone({ onParsed, onError }: { onParsed: (data: ResumeParsedData) => void; onError?: (message: string) => void }) {
	const [dragOver, setDragOver] = React.useState(false);
	const [uploading, setUploading] = React.useState(false);
	const [fileName, setFileName] = React.useState<string | null>(null);
	const [status, setStatus] = React.useState<string | null>(null);

	const handleFiles = async (files: FileList | null) => {
		if (!files || !files.length) return;
		const file = files[0];
		setFileName(file.name);
		setUploading(true);
		setStatus(null);
		try {
			const form = new FormData();
			form.append("file", file);
			const res = await fetch("/api/resume/parse", { method: "POST", body: form });
			if (!res.ok) throw new Error("Upload failed");
			const data = await res.json();
			onParsed(data);
			setStatus("Parsed successfully");
		} catch (e: any) {
			console.error(e);
			setStatus("Failed to parse resume");
			onError?.(e?.message || "Failed to parse resume");
		} finally {
			setUploading(false);
		}
	};

	return (
		<Card className={"border-dashed " + (dragOver ? "border-primary" : "") }>
			<CardContent className="p-6">
				<label
					onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
					onDragLeave={() => setDragOver(false)}
					onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
					className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md p-8 text-center hover:bg-accent/50"
				>
					{uploading ? (
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					) : (
						<Upload className="h-8 w-8 text-primary" />
					)}
					<div className="space-y-1">
						<div className="text-sm font-medium">Drop your resume here</div>
						<div className="text-xs text-muted-foreground">PDF, DOCX, or TXT up to 10MB</div>
					</div>
					<input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
				</label>
				{fileName && (
					<div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
						<FileText className="h-4 w-4" /> {fileName}
						{uploading && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
						{!uploading && status && <span className="ml-2">• {status}</span>}
					</div>
				)}
				<div className="mt-4 flex justify-center">
					<Button type="button" variant="outline" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()} disabled={uploading}>
						Choose file
					</Button>
				</div>
			</CardContent>
		</Card>
	);
} 