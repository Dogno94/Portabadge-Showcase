import { createContext, useContext, useState } from "react";

export const materialColors = [
    {
        color: "#FFFFFF",
        name: "bianco",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#8E9089",
        name: "grigio",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#000000",
        name: "nero",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#F7E6DE",
        name: "beige",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#886543",
        name: "marrone",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#F4EE2A",
        name: "giallo",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#FF6A13",
        name: "arancio",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#C12E1F",
        name: "rosso",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#16C344",
        name: "verde",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#59D9AA",
        name: "verde menta",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#0086D6",
        name: "azzurro",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#0A2989",
        name: "blu",
        metalness: 0,
        roughness: 0.5,
    },
    {
        color: "#5E43B7",
        name: "viola",
        metalness: 0,
        roughness: 0.5,

    },
    {
        color: "#D1D5CD",
        name: "argento",
        metalness: 0.5,
        roughness: 0.1,
    },
    {
        color: "#9B8874",
        name: "oro",
        metalness: 0.5,
        roughness: 0.3,
    },
];

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
    const [facciataColor, setFacciataColor] = useState(materialColors[0]);
    const [corniceColor, setCorniceColor] = useState(materialColors[0]);
    const [tastiColor, setTastiColor] = useState(materialColors[0]);
    const [ariaColor, setAriaColor] = useState(materialColors[0]);
    const [schermo2Color, setSchermo2Color] = useState(materialColors[0]);

    return (
        <CustomizationContext.Provider
            value={{
                facciataColor,
                setFacciataColor,
                corniceColor,
                setCorniceColor,
                tastiColor,
                setTastiColor,
                ariaColor,
                setAriaColor,
                schermo2Color,
                setSchermo2Color,
                materialColors,
            }}
        >
            {props.children}
        </CustomizationContext.Provider>
    );
};

export const useCustomization = () => {
    const context = useContext(CustomizationContext);
    return context;
};