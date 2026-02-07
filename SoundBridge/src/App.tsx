import { Button } from '@/components/ui/button'; // Import the button
import { useEffect } from 'react';
import { auth } from './firebase';

function App() {
  useEffect(() => {
    console.log('Firebase Auth Object', auth);
  });
  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <Button>CLICK ME NOW OR ELSE</Button>
    </div>
  );
}
export default App;
