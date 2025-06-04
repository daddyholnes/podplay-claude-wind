import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'sanctuary' | 'cyber' | 'forest';
type AccessibilitySettings = {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'larger';
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accessibility: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
};

const defaultAccessibility: AccessibilitySettings = {
  highContrast: false,
  reducedMotion: false,
  fontSize: 'normal',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('sanctuary');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(defaultAccessibility);

  // Load saved settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedAccessibility = localStorage.getItem('accessibility');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedAccessibility) {
      setAccessibility(JSON.parse(savedAccessibility));
    }
  }, []);

  // Apply theme class to body
  useEffect(() => {
    document.body.className = `theme-${theme}`;
    document.body.style.setProperty('--font-size', {
      normal: '16px',
      large: '18px',
      larger: '20px',
    }[accessibility.fontSize]);
    
    document.body.classList.toggle('high-contrast', accessibility.highContrast);
    document.body.classList.toggle('reduced-motion', accessibility.reducedMotion);
  }, [theme, accessibility]);

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    const newSettings = { ...accessibility, ...settings };
    setAccessibility(newSettings);
    localStorage.setItem('accessibility', JSON.stringify(newSettings));
  };

  const value = {
    theme,
    setTheme: (t: Theme) => {
      setTheme(t);
      localStorage.setItem('theme', t);
    },
    accessibility,
    updateAccessibility,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};