"use client";

import type {
  InitProgressReport,
  MLCEngine,
} from "@mlc-ai/web-llm";

import { INITIAL_SYSTEM_PROMPT } from "@/lib/prompts";

export const DEFAULT_WEBLLM_MODEL = "Llama-3.2-1B-Instruct-q4f16_1-MLC";

let activeEnginePromise: Promise<MLCEngine> | null = null;
let activeModel: string | null = null;

const getEngine = async (
  model: string,
  onProgress?: (report: InitProgressReport) => void
) => {
  if (typeof window === "undefined") {
    throw new Error("WebLLM is only available in the browser.");
  }

  if (!("gpu" in navigator)) {
    throw new Error("WebGPU is not available in this browser.");
  }

  if (activeEnginePromise && activeModel === model) {
    return activeEnginePromise;
  }

  const { CreateMLCEngine } = await import("@mlc-ai/web-llm");
  activeModel = model;
  activeEnginePromise = CreateMLCEngine(model, {
    initProgressCallback: (report) => {
      onProgress?.(report);
    },
  });
  return activeEnginePromise;
};

export const runWebLlmCompletion = async ({
  model,
  prompt,
  html,
  redesignMarkdown,
  onProgress,
  onChunk,
}: {
  model: string;
  prompt: string;
  html?: string;
  redesignMarkdown?: string;
  onProgress?: (report: InitProgressReport) => void;
  onChunk?: (chunk: string) => void;
}) => {
  const engine = await getEngine(model, onProgress);

  const userContent = redesignMarkdown
    ? `Here is my current design as a markdown:\n\n${redesignMarkdown}\n\nNow, please create a new design based on this markdown.`
    : html
    ? `Here is my current HTML code:\n\n\`\`\`html\n${html}\n\`\`\`\n\nNow, please create a new design based on this HTML.`
    : prompt;

  const completion = await engine.chat.completions.create({
    model,
    stream: true,
    messages: [
      { role: "system", content: INITIAL_SYSTEM_PROMPT },
      { role: "user", content: userContent },
    ],
  });

  let fullResponse = "";
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || "";
    if (!content) continue;
    fullResponse += content;
    onChunk?.(content);
  }

  if (!fullResponse.trim()) {
    throw new Error("Model returned empty response.");
  }

  return fullResponse;
};
