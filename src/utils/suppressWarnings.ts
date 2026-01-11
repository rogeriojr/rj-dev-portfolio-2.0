if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalLog = console.log;

  // Interceptar console.log (alguns erros podem ser logados assim)
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

  // Interceptar console.warn
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

  // Interceptar console.error
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
      // Suprimir erros de imagem 404 específicos
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

  // Interceptar erros de rede e recursos não encontrados
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
    
    // Suprimir erros do Firebase
    if (
      message.includes('getProjectConfig') ||
      message.includes('CONFIGURATION_NOT_FOUND') ||
      message.includes('identitytoolkit') ||
      source.includes('identitytoolkit') ||
      source.includes('getProjectConfig') ||
      fullError.includes('CONFIGURATION_NOT_FOUND') ||
      fullError.includes('identitytoolkit')
    ) {
      event.preventDefault();
      return false;
    }
    
    // Suprimir erros 404 de imagem específica
    if (
      (message.includes('404') || source.includes('404')) &&
      (source.includes('f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg') ||
       source.includes('practicaldev') ||
       source.includes('cloudinary'))
    ) {
      event.preventDefault();
      return false;
    }
  }, true);

  // Interceptar erros de recursos (imagens, etc)
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.toString() || '';
    const message = event.reason?.message || '';
    const fullError = `${reason} ${message}`;
    
    if (
      fullError.includes('CONFIGURATION_NOT_FOUND') ||
      fullError.includes('identitytoolkit') ||
      fullError.includes('getProjectConfig')
    ) {
      event.preventDefault();
      return false;
    }
  });
}
