# Theming Guide

## Built-in Themes
- `sanctuary`: Light theme
- `cyber`: Dark theme
- `forest`: Nature-inspired

## Custom Theme Example
```tsx
const theme = {
  colors: {
    primary: '#4f46e5',
    background: '#f9fafb',
    text: '#111827'
  }
};

<ThemeProvider theme={theme}>
  <BrowserControl />
</ThemeProvider>
```
