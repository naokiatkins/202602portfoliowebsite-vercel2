import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

export const runtime = "nodejs";
export const maxDuration = 30;

const MY_PROFILE = `
Name: Naoki Atkins
Title: Senior Data Engineer / BI Developer
Years of experience: 4

Core skills:
- Python, SQL, TypeScript
- Azure Databricks, dbt, Delta Lake
- Medallion architecture (Bronze/Silver/Gold)
- Azure DevOps, CI/CD pipelines
- Power BI, data visualisation
- Unity Catalog, Azure Data Factory

Industries: enterprise data platforms, analytics engineering
Work style: remote-first, async, structured environments

Highlights:
- Built config-driven ingestion engine using YAML + Pydantic v2
- Implemented dbt-databricks CI gate with schema tests
- Designed medallion architecture across Unity Catalog environments
- Strong communicator; comfortable working with stakeholders

NOT a fit for:
- Pure frontend or mobile roles
- Roles with no data engineering component
- Java or PHP-only stacks
`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("jd") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are accepted" },
        { status: 400 }
      );
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File must be under 5 MB" },
        { status: 400 }
      );
    }

    // ── 1. Upload raw PDF to Vercel Blob ─────────────────────────────────────
    const blobPath = `jd-uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const blob = await put(blobPath, file, {
      access: "public",
      contentType: "application/pdf",
    });

    // ── 2. Extract text from PDF ──────────────────────────────────────────────
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let jdText = "";

    try {
      const pdfParse = (await import("pdf-parse")).default;
      const parsed = await pdfParse(buffer);
      jdText = parsed.text.trim();
    } catch {
      return NextResponse.json(
        { error: "Could not read the PDF. Please try a text-based PDF." },
        { status: 422 }
      );
    }

    if (jdText.length < 100) {
      return NextResponse.json(
        { error: "PDF appears to be empty or image-only. Please use a text-based PDF." },
        { status: 422 }
      );
    }

    // ── 3. Collect recruiter metadata ─────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    // ── 4. TEMPORARY: hardcoded result for testing ────────────────────────────
    const score = 85;
    const parsed = {
      summary: "This is a placeholder result for testing purposes.",
      matchedSkills: ["Python", "SQL", "dbt", "Azure Databricks"],
      gaps: [] as string[],
    };
    // ── When ready: replace above with Claude API call ────────────────────────

    // ── 5. Generate unique tracking token ─────────────────────────────────────
    const token = crypto.randomBytes(16).toString("hex");

    // ── 6. Persist to Neon Postgres ───────────────────────────────────────────
    const sql = neon(process.env.POSTGRES_URL!);
    await sql`
      INSERT INTO jd_submissions (
        token,
        filename,
        blob_url,
        extracted_text,
        score,
        summary,
        matched_skills,
        gaps,
        ip_address,
        user_agent,
        submitted_at
      ) VALUES (
        ${token},
        ${file.name},
        ${blob.url},
        ${jdText.slice(0, 10000)},
        ${score},
        ${parsed.summary},
        ${JSON.stringify(parsed.matchedSkills)},
        ${JSON.stringify(parsed.gaps)},
        ${ip},
        ${userAgent},
        NOW()
      )
    `;

    return NextResponse.json({
      score,
      summary: parsed.summary,
      skills: parsed.matchedSkills,
      gaps: parsed.gaps,
      token,
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}