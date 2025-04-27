import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCustomization } from '../contexts/Customization'

const PortaBadge = (props) => {
  const { nodes, materials } = useGLTF('./models/PortaBadge.glb');
  const { facciataColor, corniceColor, tastiColor, ariaColor, schermo2Color } = useCustomization();

  const facciataMaterial = useRef();
  const corniceMaterial = useRef();
  const tastiMaterial = useRef();
  const schermoMaterial = useRef();
  const ariaMaterial = useRef();
  const schermo2Material = useRef();

  // Clona il materiale una sola volta
  if (!facciataMaterial.current) {
    facciataMaterial.current = materials['Gold Iridium_Metal'].clone();
  }
  if (!corniceMaterial.current) {
    corniceMaterial.current = materials['Gold Iridium_Metal'].clone();
  }
  if (!tastiMaterial.current) {
    tastiMaterial.current = materials['Gold Iridium_Metal'].clone();
  }
  if (!schermoMaterial.current) {
    schermoMaterial.current = materials['Gold Iridium_Metal'].clone();
  }
  if (!ariaMaterial.current) {
    ariaMaterial.current = materials['Gold Iridium_Metal'].clone();
  }
  if (!schermo2Material.current) {
    schermo2Material.current = materials['Gold Iridium_Metal'].clone();
  }

  // Quando cambia il colore selezionato, aggiorna il materiale clonato
  useEffect(() => {
    facciataMaterial.current.color.set(facciataColor.color);
    facciataMaterial.current.metalness = facciataColor.metalness;
    facciataMaterial.current.roughness = facciataColor.roughness;
  }, [facciataColor]);

  useEffect(() => {
    corniceMaterial.current.color.set(corniceColor.color);
    corniceMaterial.current.metalness = corniceColor.metalness;
    corniceMaterial.current.roughness = corniceColor.roughness;
  }, [corniceColor]);

  useEffect(() => {
    tastiMaterial.current.color.set(tastiColor.color);
    tastiMaterial.current.metalness = tastiColor.metalness;
    tastiMaterial.current.roughness = tastiColor.roughness;
  }, [tastiColor]);

  useEffect(() => {
    schermoMaterial.current.color.set("#000000");
    schermoMaterial.current.metalness = 0.0;
    schermoMaterial.current.roughness = 0.5;
  }, []);

  useEffect(() => {
    ariaMaterial.current.color.set(ariaColor.color);
    ariaMaterial.current.metalness = ariaColor.metalness;
    ariaMaterial.current.roughness = ariaColor.roughness;
  }, [ariaColor]);

  useEffect(() => {
    schermo2Material.current.color.set(schermo2Color.color);
    schermo2Material.current.metalness = schermo2Color.metalness;
    schermo2Material.current.roughness = schermo2Color.roughness;
  }, [schermo2Color]);


  return (
    <group {...props} dispose={null}>
      <group position={[-0.017, 0.75, -0.005]}>
        <mesh
          geometry={nodes.Plane010.geometry}
          material={facciataMaterial.current}
        />
        <mesh
          geometry={nodes.Plane010_1.geometry}
          material={ariaMaterial.current} />
      </group>

      <mesh
        geometry={nodes.PB_Cornice.geometry}
        material={corniceMaterial.current}
        position={[-0.017, 0.75, -0.005]} />

      <mesh
        geometry={nodes.Tasto1001.geometry}
        material={tastiMaterial.current}
        position={[0, 0, 0.004]} />
      <mesh
        geometry={nodes.Tasto3001.geometry}
        material={tastiMaterial.current}
        position={[0, 0, 0.004]} />
      <mesh
        geometry={nodes.Tasto2001.geometry}
        material={tastiMaterial.current}
        position={[0, 0, 0.004]} />
      <mesh
        geometry={nodes.Tasto4001.geometry}
        material={tastiMaterial.current}
        position={[0, -0.027, 0.004]} />

      <mesh geometry={nodes.Schermo001.geometry}
        material={schermo2Material.current}
        position={[0, 0, 0.004]} />

      <mesh geometry={nodes.Schermo2.geometry}
        material={schermoMaterial.current}
        position={[0, 0, 0.004]} />
    </group>
  );
}

useGLTF.preload('./models/PortaBadge.glb')
export default PortaBadge;
