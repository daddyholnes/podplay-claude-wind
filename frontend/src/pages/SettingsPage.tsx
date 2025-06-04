import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SanctuaryWorkspaceCard } from '../../shared-components/src/components/sanctuary/SanctuaryWorkspaceCard';

const SettingsPage: React.FC = () => {
  const {
    theme,
    setTheme,
    accessibility,
    updateAccessibility,
  } = useTheme();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Settings</h1>
      
      <SanctuaryWorkspaceCard 
        name="Theme Settings"
        status="active"
        theme={theme}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Theme</h2>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            {['sanctuary', 'cyber', 'forest'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t as any)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  background: theme === t ? '#8b5cf6' : '#f3f4f6',
                  color: theme === t ? 'white' : '#374151',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Accessibility</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={accessibility.highContrast}
                onChange={(e) => updateAccessibility({ highContrast: e.target.checked })}
              />
              High Contrast Mode
            </label>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={accessibility.reducedMotion}
                onChange={(e) => updateAccessibility({ reducedMotion: e.target.checked })}
              />
              Reduced Motion
            </label>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Font Size</label>
            <select
              value={accessibility.fontSize}
              onChange={(e) => updateAccessibility({ 
                fontSize: e.target.value as 'normal' | 'large' | 'larger' 
              })}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #e5e7eb',
              }}
            >
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="larger">Larger</option>
            </select>
          </div>
        </div>
      </SanctuaryWorkspaceCard>

      <div style={{ marginTop: '2rem' }}>
        <SanctuaryWorkspaceCard 
          name="Account Settings"
          status="active"
          theme={theme}
        >
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Profile</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
              <input 
                type="text" 
                defaultValue="user@example.com"
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #e5e7eb',
                  width: '100%',
                  maxWidth: '400px',
                }}
              />
            </div>
            <button
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Save Changes
            </button>
          </div>
        </SanctuaryWorkspaceCard>
      </div>
    </div>
  );
};

export default SettingsPage;