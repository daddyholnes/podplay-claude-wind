import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SettingsMenu } from "@/components/ui/SettingsMenu";
import { BackgroundGradientAnimation } from "../../../../shared-components/src/components/effects/BackgroundGradientAnimation";
import { SplashCursor } from "../../../../shared-components/src/components/effects/SplashCursor";
const AuroraBackground = React.lazy(() => import("../../../../shared-components/src/components/effects/AuroraBackground"));
import AgentPlan from "../../../../shared-components/src/components/ui/AgentPlan";

// Types
type PlanItem = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  progress: number;
  owner: {
    name: string;
    avatar?: string;
  };
};

type ChatMessage = {
  id: string;
  sender: "user" | "mama";
  content: string;
  timestamp: string;
};

type EffectSettings = {
  backgroundGradient: boolean;
  splashCursor: boolean;
  aurora: boolean;
};

const themePresets: Record<string, EffectSettings> = {
  "Purple Delight": { backgroundGradient: true, splashCursor: false, aurora: false },
  "Daydream in the Clouds": { backgroundGradient: false, splashCursor: false, aurora: true },
  "Focus Mode": { backgroundGradient: false, splashCursor: false, aurora: false },
  "Liquid Energy": { backgroundGradient: true, splashCursor: true, aurora: false },
};

export const MamaBearChatPage: React.FC = () => {
  // Theme/effects
  const [theme, setTheme] = useState<string>('Purple Delight');
  const [effectSettings, setEffectSettings] = useState<EffectSettings>(themePresets['Purple Delight']);
  useEffect(() => {
    setEffectSettings(themePresets[theme] || themePresets['Purple Delight']);
  }, [theme]);

  // Plans (live via WebSocket)
import { useLivePlans, AgentPlan as LiveAgentPlan } from "@/hooks/useLivePlans";
const userId = "dev_user"; // Replace with real user/session logic
const { plans: livePlans, loading: plansLoading, error: plansError } = useLivePlans(userId);

  // Chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setSending(true);
    // Simulate backend chat with Mama Bear
    fetch("/mama_bear_chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.content }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to get response from Mama Bear");
        return res.json();
      })
      .then((data) => {
        const mamaMsg: ChatMessage = {
          id: Date.now().toString() + "_mama",
          sender: "mama",
          content: data.reply,
          timestamp: new Date().toISOString(),
        };
        setMessages((msgs) => [...msgs, mamaMsg]);
        setSending(false);
      })
      .catch(() => setSending(false));
  }

  return (
    <>
      {/* Visual Effects */}
      {effectSettings.backgroundGradient && (
        <BackgroundGradientAnimation interactive={theme === 'Liquid Energy'} />
      )}
      {effectSettings.splashCursor && <SplashCursor />}
      {effectSettings.aurora && (
        <React.Suspense fallback={null}>
          <AuroraBackground />
        </React.Suspense>
      )}
      <SettingsMenu
        settings={effectSettings}
        setSettings={setEffectSettings}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="relative z-10 flex flex-col items-center min-h-screen pt-20 pb-8 px-4">
        <Card className="w-full max-w-3xl mb-8">
          <CardHeader>
            <CardTitle>Mama Bear Chat</CardTitle>
            <div className="text-muted-foreground text-sm">Your personal AI lead developer. Ask about plans, code, or anything you need!</div>
          </CardHeader>
          <CardContent>
            <div className="overflow-y-auto h-96 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form className="flex gap-2 mt-4" onSubmit={sendMessage}>
              <input
                className="flex-1 rounded border px-3 py-2"
                placeholder="Type your message..."
                value={input}
                disabled={sending}
                onChange={e => setInput(e.target.value)}
              />
              <button className="btn btn-primary" type="submit" disabled={sending || !input.trim()}>Send</button>
            </form>
          </CardContent>
        </Card>
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Current Plans</CardTitle>
          </CardHeader>
          <CardContent>
            {plansLoading ? (
              <div className="text-center text-muted-foreground py-8">Loading plans...</div>
            ) : plansError ? (
              <div className="text-center text-red-500 py-8">Error loading plans: {plansError}</div>
            ) : livePlans && livePlans.length > 0 ? (
              <div className="mb-6">
                <AgentPlan tasks={livePlans} />
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">No plans found.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MamaBearChatPage;
