export interface ParsedContent {
    title: string;
    content: string;
    wordCount: number;
    extractionSuccess: boolean;
    errorMessage?: string;
}

export async function extractContentFromFile(file: File): Promise<ParsedContent> {
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

    try {
        switch (fileExtension) {
            case 'txt':
                return await extractTextFile(file);
            case 'pdf':
                return await extractPdfFile(file);
            case 'docx':
                return await extractDocxFile(file);
            default:
                return {
                    title: file.name.replace(/\.[^/.]+$/, ''),
                    content: await file.text(),
                    wordCount: 0,
                    extractionSuccess: false,
                    errorMessage: `Unsupported file type: .${fileExtension}`
                };
        }
    } catch (error) {
        return {
            title: file.name.replace(/\.[^/.]+$/, ''),
            content: '',
            wordCount: 0,
            extractionSuccess: false,
            errorMessage: error instanceof Error ? error.message : 'Unknown extraction error'
        };
    }
}

async function extractTextFile(file: File): Promise<ParsedContent> {
    const content = await file.text();
    const title = extractTitleFromContent(content);

    return {
        title,
        content,
        wordCount: countWords(content),
        extractionSuccess: true
    };
}

async function extractPdfFile(file: File): Promise<ParsedContent> {
    const arrayBuffer = await file.arrayBuffer();

    try {
        const pdfjsLib = await loadPdfJs();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = '';
        const pageTexts: string[] = [];

        for (let i = 1; i <= Math.min(pdf.numPages, 50); i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: { str?: string }) => item.str || '')
                .join(' ');
            pageTexts.push(pageText);
            fullText += pageText + '\n\n';
        }

        const title = extractTitleFromContent(fullText) || file.name.replace('.pdf', '');

        return {
            title,
            content: fullText.trim(),
            wordCount: countWords(fullText),
            extractionSuccess: true
        };
    } catch {
        return {
            title: file.name.replace('.pdf', ''),
            content: await file.text(),
            wordCount: 0,
            extractionSuccess: false,
            errorMessage: 'PDF extraction failed. Using raw text fallback.'
        };
    }
}

async function extractDocxFile(file: File): Promise<ParsedContent> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const mammoth = await import('mammoth');
        const result = await mammoth.default.extractRawText({ arrayBuffer });

        const title = extractTitleFromContent(result.value) || file.name.replace('.docx', '');

        return {
            title,
            content: result.value,
            wordCount: countWords(result.value),
            extractionSuccess: true
        };
    } catch {
        return {
            title: file.name.replace('.docx', ''),
            content: '',
            wordCount: 0,
            extractionSuccess: false,
            errorMessage: 'DOCX extraction failed. Please convert to PDF or TXT.'
        };
    }
}

async function loadPdfJs(): Promise<any> {
    if (typeof window !== 'undefined' && (window as any).pdfjsLib) {
        return (window as any).pdfjsLib;
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.async = true;
        script.onload = () => {
            const pdfjsLib = (window as any).pdfjsLib;
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve(pdfjsLib);
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function extractTitleFromContent(content: string): string {
    if (!content) return '';

    const lines = content.split('\n').filter(line => line.trim().length > 0);

    if (lines.length === 0) return 'Untitled Document';

    const firstLine = lines[0].trim();

    if (firstLine.length < 3 || firstLine.length > 200) {
        return firstLine.slice(0, 100) || 'Untitled Document';
    }

    return firstLine;
}

function countWords(text: string): number {
    if (!text) return 0;

    const cleanedText = text
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (cleanedText.length === 0) return 0;

    return cleanedText.split(' ').filter(word => word.length > 0).length;
}

export function validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 50 * 1024 * 1024;

    if (file.size > maxSize) {
        return {
            valid: false,
            error: `File too large. Maximum size is 50MB.`
        };
    }

    const allowedTypes = ['.pdf', '.docx', '.txt'];
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(extension)) {
        return {
            valid: false,
            error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`
        };
    }

    return { valid: true };
}
