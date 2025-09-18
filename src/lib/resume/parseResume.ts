import "server-only";
import { Buffer } from "node:buffer";

export interface ParsedResume {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  education?: string[];
  experience?: string[];
  rawText: string;
}

// ---------- Helpers ----------
function extractEmail(text: string): string | undefined {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : undefined;
}

function extractPhone(text: string): string | undefined {
  const match = text.match(
    /(?:\+\d{1,3}[\s-]?)?(?:\(\d{2,4}\)[\s-]?)?\d{3,4}[\s-]?\d{3,4}[\s-]?\d{0,4}/
  );
  return match ? match[0] : undefined;
}

function extractName(text: string): string | undefined {
  const lines = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    if (
      line.length < 60 &&
      !/resume|curriculum vitae|cv/i.test(line)
    ) {
      return line;
    }
  }
  return undefined;
}

function extractSection(text: string, header: RegExp): string[] | undefined {
  const lines = text.split(/\r?\n/);
  const startIdx = lines.findIndex(l => header.test(l.trim().toLowerCase()));
  if (startIdx === -1) return undefined;
  const rest = lines.slice(startIdx + 1);
  const stopIdx = rest.findIndex(l =>
    /^(skills|education|experience|projects|work|summary|certifications|achievements|background|history)\b/i.test(
      l.trim()
    )
  );
  const sectionLines = stopIdx === -1 ? rest : rest.slice(0, stopIdx);
  return sectionLines
    .map(l => l.replace(/^[−\-•\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 30);
}

function extractSkills(text: string): string[] | undefined {
  const skillsSection = extractSection(text, /^(skills|technical skills)\b/i);
  if (skillsSection && skillsSection.length) {
    const combined = skillsSection.join(", ");
    return combined
      .split(/[•,\|\n]/)
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 50);
  }
  const tokens = Array.from(
    new Set(
      (
        text.match(
          /\b(JavaScript|TypeScript|React|Node|Python|Java|SQL|NoSQL|AWS|GCP|Azure|Docker|Kubernetes|Figma|Photoshop|HTML|CSS|Tailwind|Next\.js|Express|Django|Flask|C\+\+|C#|Go|Rust)\b/gi
        ) || []
      ).map(s => s.trim())
    )
  );
  return tokens.length ? tokens : undefined;
}

// ---------- PDF Extraction ----------
async function extractPdfText(buffer: Buffer): Promise<string> {
  try {
    const mod: any = await import("pdf2json");
    const PDFParser = mod.default || mod;
    return await new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();
      pdfParser.on("pdfParser_dataError", (err: any) => reject(err?.parserError || err));
      pdfParser.on("pdfParser_dataReady", () => {
        resolve(pdfParser.getRawTextContent() || "");
      });
      pdfParser.parseBuffer(buffer);
    });
  } catch (e) {
    throw new Error(
      "PDF parsing module not found. Please install 'pdf2json' or upload DOCX/TXT."
    );
  }
}

// ---------- Main ----------
export async function parseResume(file: File | Blob): Promise<ParsedResume> {
  const type = (file as File).type || "";
  const name = (file as File).name || "";
  const lowerName = name.toLowerCase();
  const arrayBuffer = await file.arrayBuffer();
  let rawText = "";

  try {
    if (type.includes("pdf") || lowerName.endsWith(".pdf")) {
      rawText = await extractPdfText(Buffer.from(arrayBuffer));
    } else if (
      type.includes("officedocument.wordprocessingml.document") ||
      type.includes("msword") ||
      lowerName.endsWith(".docx")
    ) {
      const mammothModule = await import("mammoth");
      const mammoth = (mammothModule as any).default || mammothModule;
      const result = await mammoth.extractRawText({
        buffer: Buffer.from(arrayBuffer),
      });
      rawText = result.value || "";
    } else if (type.includes("text") || lowerName.endsWith(".txt")) {
      rawText = new TextDecoder().decode(new Uint8Array(arrayBuffer));
    } else {
      rawText = new TextDecoder().decode(new Uint8Array(arrayBuffer));
    }
  } catch (err: any) {
    console.error("File parsing error:", err);
    throw new Error(err?.message || "Failed to extract text from file");
  }

  rawText = rawText
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, " ")
    .replace(/\n{2,}/g, "\n");

  return {
    name: extractName(rawText),
    email: extractEmail(rawText),
    phone: extractPhone(rawText),
    skills: extractSkills(rawText),
    education: extractSection(rawText, /^(education)\b/i),
    experience: extractSection(
      rawText,
      /^(experience|work experience|professional experience)\b/i
    ),
    rawText,
  };
}
