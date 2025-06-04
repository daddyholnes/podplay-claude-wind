import React, { useState } from "react";

interface EffectSettings {
  backgroundGradient: boolean;
  splashCursor: boolean;
  aurora: boolean;
}

interface ThemeOption {
  name: string;
  description: string;
  effects: Partial<EffectSettings>;
}

const themes: ThemeOption[] = [
  {
    name: "Purple Delight",
    description: "Vivid purple gradients with gentle cursor trails.",
    effects: { backgroundGradient: true, splashCursor: false, aurora: false },
  },
  {
    name: "Daydream in the Clouds",
    description: "Soft aurora and gentle motion for a dreamy vibe.",
    effects: { backgroundGradient: false, splashCursor: false, aurora: true },
  },
  {
    name: "Focus Mode",
    description: "Minimal, distraction-free, no effects.",
    effects: { backgroundGradient: false, splashCursor: false, aurora: false },
  },
  {
    name: "Liquid Energy",
    description: "Animated gradients and interactive splash cursor.",
    effects: { backgroundGradient: true, splashCursor: true, aurora: false },
  },
];

export interface SettingsMenuProps {
  settings: EffectSettings;
  setSettings: (settings: EffectSettings) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ settings, setSettings, theme, setTheme }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((v) => !v);

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        className="btn btn-sm btn-secondary rounded-full shadow-lg"
        onClick={handleToggle}
        aria-label="Open settings menu"
      >
        ⚙️
      </button>
      {open && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 mt-2 w-80 border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-lg mb-2">Sanctuary Settings</h2>
          <div className="mb-4">
            <div className="font-semibold mb-1">Theme</div>
            <select
              className="w-full p-2 rounded border"
              value={theme}
              onChange={e => setTheme(e.target.value)}
            >
              {themes.map(t => (
                <option key={t.name} value={t.name}>{t.name} – {t.description}</option>
              ))}
            </select>
          </div>
          <div className="font-semibold mb-1">Visual Effects</div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.backgroundGradient}
                onChange={e => setSettings({ ...settings, backgroundGradient: e.target.checked })}
              />
              Animated Gradient
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.splashCursor}
                onChange={e => setSettings({ ...settings, splashCursor: e.target.checked })}
              />
              Splash Cursor
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.aurora}
                onChange={e => setSettings({ ...settings, aurora: e.target.checked })}
              />
              Aurora Background
            </label>
          </div>
          <button
            className="btn btn-sm btn-primary mt-4 w-full"
            onClick={handleToggle}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
