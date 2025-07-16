import { useEffect, useState } from 'react';
import { initializeData } from '../scripts/initializeData';

function DataInitializer({ children }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initData = async () => {
      if (!localStorage.getItem('dataInitialized')) {
        try {
          await initializeData();
          localStorage.setItem('dataInitialized', 'true');
          console.log('Data initialization completed');
        } catch (error) {
          console.error('Failed to initialize data:', error);
        }
      }
      setInitialized(true);
    };

    initData();
  }, []);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Initializing application data...</p>
        </div>
      </div>
    );
  }

  return children;
}

export default DataInitializer;
