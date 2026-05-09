import { PiGearSixFill } from "react-icons/pi";
import { useState, useEffect } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PROVIDERS } from "@/lib/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DEFAULT_WEBLLM_MODEL } from "@/lib/web-llm";

export function Settings({
  open,
  onClose,
  provider,
  error,
  onChange,
  onModelChange,
  onWebLlmModelChange,
}: {
  open: boolean;
  provider: string;
  error?: string;
  isFollowUp?: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (provider: string) => void;
  onModelChange: (model: string) => void;
  onWebLlmModelChange: (model: string) => void;
}) {
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [webLlmModel, setWebLlmModel] = useState(DEFAULT_WEBLLM_MODEL);

  useEffect(() => {
    setApiKey(localStorage.getItem("openai_api_key") || "");
    setBaseUrl(localStorage.getItem("openai_base_url") || "");
    setCustomModel(localStorage.getItem("openai_model") || "");
    setWebLlmModel(
      localStorage.getItem("webllm_model") || DEFAULT_WEBLLM_MODEL
    );
  }, [open]);

  const handleSaveSettings = () => {
    localStorage.setItem("provider", provider);
    localStorage.setItem("openai_api_key", apiKey);
    localStorage.setItem("openai_base_url", baseUrl);
    localStorage.setItem("openai_model", customModel);
    localStorage.setItem("webllm_model", webLlmModel);
    onModelChange(customModel || "gpt-4o-mini");
    onWebLlmModelChange(webLlmModel || DEFAULT_WEBLLM_MODEL);
    toast.success("Settings saved!");
    onClose(false);
  };

  return (
    <div className="">
      <Popover open={open} onOpenChange={onClose}>
        <PopoverTrigger asChild>
          <Button variant="black" size="sm">
            <PiGearSixFill className="size-4" />
            Settings
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="!rounded-2xl p-0 !w-96 overflow-hidden !bg-neutral-900"
          align="center"
        >
          <header className="flex items-center justify-center text-sm px-4 py-3 border-b gap-2 bg-neutral-950 border-neutral-800 font-semibold text-neutral-200">
            Customize Settings
          </header>
          <main className="px-4 pt-5 pb-6 space-y-5">
            {error !== "" && (
              <p className="text-red-500 text-sm font-medium mb-2 flex items-center justify-between bg-red-500/10 p-2 rounded-md">
                {error}
              </p>
            )}
            <label className="block">
              <p className="text-neutral-300 text-sm mb-2.5">Provider</p>
              <select
                value={provider}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-10 rounded-md px-3 !bg-neutral-800 border border-neutral-700 !text-neutral-200 text-sm outline-none"
              >
                <option value="auto">Auto (OpenAI Compatible)</option>
                {Object.values(PROVIDERS).map((providerOption) => (
                  <option key={providerOption.id} value={providerOption.id}>
                    {providerOption.name}
                  </option>
                ))}
              </select>
            </label>
            {provider === "webllm" && (
              <>
                <label className="block">
                  <p className="text-neutral-300 text-sm mb-2.5">
                    WebLLM Model ID
                  </p>
                  <Input
                    type="text"
                    placeholder={DEFAULT_WEBLLM_MODEL}
                    value={webLlmModel}
                    onChange={(e) => setWebLlmModel(e.target.value)}
                    className="!bg-neutral-800 !border-neutral-700 !text-neutral-200"
                  />
                </label>
                <div className="bg-sky-500/10 border-sky-500/20 p-3 text-xs text-sky-300 border rounded-lg">
                  Runs fully in-browser with WebGPU. First load can take time
                  while model files download and cache.
                </div>
              </>
            )}
            {provider !== "webllm" && (
              <>
                <label className="block">
                  <p className="text-neutral-300 text-sm mb-2.5">API Key</p>
                  <Input
                    type="password"
                    placeholder="Enter your api key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="!bg-neutral-800 !border-neutral-700 !text-neutral-200"
                  />
                </label>
                <label className="block">
                  <p className="text-neutral-300 text-sm mb-2.5">Base URL</p>
                  <Input
                    type="text"
                    placeholder="e.g., http://127.0.0.1:11434/v1"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="!bg-neutral-800 !border-neutral-700 !text-neutral-200"
                  />
                </label>
                <label className="block">
                  <p className="text-neutral-300 text-sm mb-2.5">
                    Custom Model
                  </p>
                  <Input
                    type="text"
                    placeholder="e.g., gemma3:1b"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    className="!bg-neutral-800 !border-neutral-700 !text-neutral-200"
                  />
                </label>
              </>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={handleSaveSettings}
              className="mt-2 w-full"
            >
              Save Settings
            </Button>
            {provider !== "webllm" && (
              <div className="bg-amber-500/10 border-amber-500/10 p-3 text-xs text-amber-500 border rounded-lg">
                Accepts any OpenAI-compatible provider. Enter the corresponding
                API key and base URL (e.g., OpenRouter, DeepSeek, etc.).
              </div>
            )}

          </main>
        </PopoverContent>
      </Popover>
    </div>
  );
}
