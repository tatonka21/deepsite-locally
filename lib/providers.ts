export const PROVIDERS = {
  "openai-compatible": {
    name: "OpenAI Compatible",
    max_tokens: 128_000,
    id: "openai-compatible",
  },
  webllm: {
    name: "WebLLM (Browser/WebGPU)",
    max_tokens: 8_192,
    id: "webllm",
  },
};

export const MODELS = [
  {
    value: "gpt-4o-mini", // Default model, can be overridden by user
    label: "GPT-4o Mini (Default)",
    providers: ["openai-compatible"],
    autoProvider: "openai-compatible",
    isThinker: false,
  },
  {
    value: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
    label: "Llama 3.2 1B (WebLLM)",
    providers: ["webllm"],
    autoProvider: "webllm",
    isThinker: false,
  },
];
