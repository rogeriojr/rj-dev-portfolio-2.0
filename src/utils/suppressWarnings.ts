(function() {
  if (typeof window === 'undefined') return;
  
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalLog = console.log;

  console.log = (...args: any[]) => {
    const fullMessage = args.map(arg => String(arg)).join(' ').toLowerCase();
    
    if (
      (fullMessage.includes('download') && fullMessage.includes('react devtools')) ||
      fullMessage.includes('configuration_not_found') ||
      fullMessage.includes('identitytoolkit') ||
      fullMessage.includes('getprojectconfig')
    ) {
      return;
    }
    
    originalLog.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    const errorString = JSON.stringify(args);
    const fullMessage = args.map(arg => String(arg)).join(' ').toLowerCase();
    const messageLower = message.toLowerCase();
    
    if (
      (messageLower.includes('download') && messageLower.includes('react devtools')) ||
      messageLower.includes('react router future flag warning') ||
      messageLower.includes('v7_starttransition') ||
      messageLower.includes('react devtools') ||
      messageLower.includes('encountered two children with the same key') ||
      messageLower.includes('validatedomnesting') ||
      messageLower.includes('cannot appear as a descendant of') ||
      (errorString.toLowerCase().includes('download') && errorString.toLowerCase().includes('react devtools')) ||
      (fullMessage.includes('download') && fullMessage.includes('react devtools'))
    ) {
      return;
    }
    
    originalWarn.apply(console, args);
  };

  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    const errorString = JSON.stringify(args);
    const fullMessage = args.map(arg => String(arg)).join(' ').toLowerCase();
    const messageLower = message.toLowerCase();
    
    if (
      messageLower.includes('configuration_not_found') ||
      messageLower.includes('identitytoolkit') ||
      messageLower.includes('getprojectconfig') ||
      (messageLower.includes('bad request') && messageLower.includes('getprojectconfig')) ||
      errorString.toLowerCase().includes('configuration_not_found') ||
      errorString.toLowerCase().includes('identitytoolkit') ||
      errorString.toLowerCase().includes('getprojectconfig') ||
      fullMessage.includes('configuration_not_found') ||
      fullMessage.includes('identitytoolkit') ||
      fullMessage.includes('getprojectconfig') ||
      messageLower.includes('encountered two children with the same key') ||
      messageLower.includes('validatedomnesting') ||
      messageLower.includes('cannot appear as a descendant of') ||
      (messageLower.includes('404') && (messageLower.includes('f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg') || messageLower.includes('practicaldev') || messageLower.includes('cloudinary'))) ||
      errorString.toLowerCase().includes('f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg') ||
      fullMessage.includes('f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg') ||
      fullMessage.includes('practicaldev') ||
      fullMessage.includes('cloudinary')
    ) {
      return;
    }
    
    originalError.apply(console, args);
  };

  window.addEventListener('error', (event) => {
    const message = event.message || '';
    const target = event.target as HTMLImageElement | HTMLScriptElement | HTMLLinkElement | null;
    let source = event.filename || '';
    if (target) {
      if ('src' in target) {
        source = (target as HTMLImageElement | HTMLScriptElement).src || source;
      } else if ('href' in target) {
        source = (target as HTMLLinkElement).href || source;
      }
    }
    const fullError = `${message} ${source}`;
    
    const messageLower = message.toLowerCase();
    const sourceLower = source.toLowerCase();
    const fullErrorLower = fullError.toLowerCase();
    
    if (
      messageLower.includes('getprojectconfig') ||
      messageLower.includes('configuration_not_found') ||
      messageLower.includes('identitytoolkit') ||
      sourceLower.includes('identitytoolkit') ||
      sourceLower.includes('getprojectconfig') ||
      sourceLower.includes('googleapis.com/identitytoolkit') ||
      fullErrorLower.includes('configuration_not_found') ||
      fullErrorLower.includes('identitytoolkit') ||
      fullErrorLower.includes('getprojectconfig')
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    
    const sourceLowerFor404 = source.toLowerCase();
    if (
      (messageLower.includes('404') || sourceLowerFor404.includes('404')) &&
      (sourceLowerFor404.includes('f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg') ||
       sourceLowerFor404.includes('practicaldev') ||
       sourceLowerFor404.includes('cloudinary'))
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.toString() || '';
    const message = event.reason?.message || '';
    const fullError = `${reason} ${message}`.toLowerCase();
    
    if (
      fullError.includes('configuration_not_found') ||
      fullError.includes('identitytoolkit') ||
      fullError.includes('getprojectconfig')
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });
})();
