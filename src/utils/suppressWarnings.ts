if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    
    if (
      message.includes('Download the React DevTools') ||
      message.includes('React Router Future Flag Warning') ||
      message.includes('v7_startTransition')
    ) {
      return;
    }
    
    originalWarn.apply(console, args);
  };

  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    const errorString = JSON.stringify(args);
    
    if (
      message.includes('CONFIGURATION_NOT_FOUND') ||
      message.includes('identitytoolkit') ||
      errorString.includes('CONFIGURATION_NOT_FOUND') ||
      errorString.includes('identitytoolkit')
    ) {
      return;
    }
    
    originalError.apply(console, args);
  };
}
