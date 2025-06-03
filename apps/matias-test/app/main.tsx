import { createRoot } from 'react-dom/client';
import { App } from './components';
import '../styles.css';

// Root element check with strict null checking
const rootElement = document.getElementById('root');
if (rootElement === null) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(<App />);
