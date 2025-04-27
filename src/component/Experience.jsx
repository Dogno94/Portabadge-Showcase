import { PresentationControls, Stage, MeshReflectorMaterial, } from "@react-three/drei";
import PortaBadge from "./PortaBadge";

const Experience = ({ isMobile }) => {
    return (
        <PresentationControls
            speed={isMobile ? 0.5 : 2}
            polar={isMobile ? [-Math.PI / 20, Math.PI / 10] : [-Math.PI / 4, Math.PI / 3]}
            // Limita la rotazione verticale             
            azimuth={isMobile ? [-Math.PI / 5, Math.PI / 5] : [-Math.PI / 3, Math.PI / 3]}
            // Limita la rotazione orizzontale da -60° a +60°
            snap={false} // disattiva snap
            global={false} // evita recenter globale
            config={{ mass: 1, tension: 170, friction: 26 }}
            touch={{ enabled: true }}
            rotation={[0, 0, 0]} // importante: partenza sicura
            cursor={true} // così ti fa anche vedere che puoi trascinare
        >
            <group
                position={isMobile ? [0, 2, 0] : [0, 0, 0]}
                rotation={[Math.PI / 2, 0, 0]}>
                <PortaBadge />
            </group>

            <Stage
                environment="city"
                intensity={0.6}
                contactShadow={false}
                adjustCamera={false}
            >
            </Stage>

            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={isMobile ? [0, -4, 0] : [0, -6, 0]}>
                <planeGeometry args={[170, 170]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={40}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#101010"
                    metalness={0.5}
                />
            </mesh>
        </PresentationControls>
    );
};
export default Experience;