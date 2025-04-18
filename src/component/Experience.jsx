import {
    PresentationControls,
    Stage,
    MeshReflectorMaterial,
} from "@react-three/drei";
import PortaBadge from "./PortaBadge";

const Experience = () => {
    return (

        <PresentationControls
            speed={2}
            polar={[-Math.PI / 4, Math.PI / 3]}  // Limita la rotazione verticale da -30° a +30°
            azimuth={[-Math.PI / 3, Math.PI / 3]} // Limita la rotazione orizzontale da -60° a +60°
            snap={false} // disattiva snap
            global={false} // evita recenter globale

        >
            <group rotation={[Math.PI / 2, 0, 0]}>
                <PortaBadge />
            </group>


            <Stage environment={"city"} intensity={0.6} contactShadow={false}>
            </Stage>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
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