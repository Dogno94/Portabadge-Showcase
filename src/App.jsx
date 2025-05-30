import { Canvas } from '@react-three/fiber';
import './App.css'
import Experience from './component/Experience';
import Configurator from './component/Configurator';
import { CustomizationProvider } from './contexts/Customization';
import { PerspectiveCamera } from '@react-three/drei';
import { useEffect, useState } from 'react';
import logo from './assets/logo.png';
import InstagramButton from './component/InstagramButton'; // Aggiungi questa riga

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile(); // run once on mount
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <CustomizationProvider>
      <div className="App">
        
      <header>
        <InstagramButton /> {/* Usa il bottone qui */}
      </header>
      
        <header className="App-header">
          <img src={logo}
            alt="Logo"
            style={{
              filter: "invert(77%) sepia(26%) saturate(4326%) hue-rotate(0deg) brightness(104%) contrast(98%)"
            }} className="logo" />
        </header>
        
        <div className="canvas-wrapper">
          <Canvas dpr={[1, 2]}>
            <color attach="background" args={['#101010']} />
            <fog attach="fog" args={['#101010', 10, 20]} />
            <PerspectiveCamera
              makeDefault position={isMobile ? [0, 0, 10] : [0, 0, 12]}
              fov={isMobile ? 90 : 62.5}
              near={0.1}
              far={1000}
            />
            <Experience isMobile={isMobile} />
          </Canvas>
        </div>
        <Configurator />
      </div>
    </CustomizationProvider>
  );
}
export default App;