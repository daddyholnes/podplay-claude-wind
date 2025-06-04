# API Reference

## BrowserControl Component

### Props
- `initialUrl`: string (default: '')
- `theme`: 'sanctuary' | 'cyber' | 'forest' (default: 'sanctuary')
- `onNavigation`: (url: string) => void
- `onError`: (error: Error) => void

### Example
```tsx
<BrowserControl 
  initialUrl="https://example.com"
  theme="cyber"
  onNavigation={console.log}
  onError={console.error}
/>
```
