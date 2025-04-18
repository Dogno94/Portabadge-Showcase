import { useState } from "react";
import { materialColors, useCustomization } from "../contexts/Customization";
import emailjs from "emailjs-com";

const Configurator = () => {
    const {
        facciataColor, setFacciataColor,
        corniceColor, setCorniceColor,
        tastiColor, setTastiColor,
        ariaColor, setAriaColor,
        schermo2Color, setSchermo2Color
    } = useCustomization();

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); // Stato per la gestione dell'invio
    const [isSending, setIsSending] = useState(false); // Stato per il caricamento
    const [showSuccess, setShowSuccess] = useState(false); // Stato per il successo dell'invio
    const [showError, setShowError] = useState(false); // Stato per l'errore dell'invio


    const getRandomColor = () => {
        const index = Math.floor(Math.random() * materialColors.length);
        return materialColors[index];
    };

    const handleRandomizeColors = () => {
        setFacciataColor(getRandomColor());
        setCorniceColor(getRandomColor());
        setTastiColor(getRandomColor());
        setAriaColor(getRandomColor());
        setSchermo2Color(getRandomColor());
    };

    const handleSendConfiguration = () => {
        setShowPopup(true);
        setIsSending(true); // Mostra il loading
        console.log("Invio configurazione...");

    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setIsProcessing(true);

        const config = {
            Cornice: corniceColor.name,
            Facciata: facciataColor.name,
            Tasti: tastiColor.name,
            Speaker: ariaColor.name,
            Schermo: schermo2Color.name
        };

        const templateParams = {
            from_name: customerName,
            reply_to: customerEmail,
            cornice: corniceColor.name,
            facciata: facciataColor.name,
            tasti: tastiColor.name,
            aria: ariaColor.name,
            schermo2: schermo2Color.name,
            message: JSON.stringify(config, null, 2) // Dettaglio configurazione
        };

        emailjs.send(
            'service_rvh1ctn',      // Service ID
            'template_8vwpx1i',     // Template ID
            templateParams,
            'pn54X7GeVa2mMy11g'    // User ID
        ).then(
            (response) => {
                console.log("Configurazione inviata con successo!", response);
                setIsSending(false);  // Nascondi il loading
                setShowPopup(false);  // Chiudi il popup dopo l'invio
                setIsProcessing(false);
                setShowSuccess(true);
                
                setTimeout(() => {
                    setShowSuccess(false);  // Nascondi il messaggio di errore
                }, 1500);

            },
            (error) => {
                console.log("Errore durante l'invio", error);
                setIsSending(false);  // Nascondi il loading
                setIsProcessing(false);
                setShowPopup(false);  // Chiudi il popup dopo l'invio
                setShowError(true); // Mostra il messaggio di errore

                // Chiudere il messaggio di errore dopo 3 secondi
                setTimeout(() => {
                    setShowError(false);  // Nascondi il messaggio di errore
                }, 2000);
            }
        );
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setIsSending(false); // Reset dello stato di invio
        setIsProcessing(false);
    };

    return (
        <>
            {/* Colonna SINISTRA */}
            <div className="configurator configurator--left">
                <div className="configurator__section">
                    <div className="configurator__section__title">Cornice</div>
                    <div className="configurator__section__values">
                        {materialColors.map((item, index) => (
                            <div
                                key={index}
                                className={`item ${item.color === corniceColor.color ? "item--active" : ""}`}
                                onClick={() => setCorniceColor(item)}
                            >
                                <div className="item__dot" style={{ backgroundColor: item.color }} />
                                <div className="item__label">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="configurator__section">
                    <div className="configurator__section__title">Facciata Gameboy</div>
                    <div className="configurator__section__values">
                        {materialColors.map((item, index) => (
                            <div
                                key={index}
                                className={`item ${item.color === facciataColor.color ? "item--active" : ""}`}
                                onClick={() => setFacciataColor(item)}
                            >
                                <div className="item__dot" style={{ backgroundColor: item.color }} />
                                <div className="item__label">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="random-button-floating">
                <button className="random-button" onClick={handleRandomizeColors}>
                    🎲 Random
                </button>
            </div>

            <div className="send-button">
                <button onClick={handleSendConfiguration}>
                    {isSending ? "Invio..." : "📩 Invia configurazione"}
                </button>
            </div>

            {/* Popup per inserire nome ed email */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <button className="popup-close-button" onClick={handleClosePopup}>❌</button>
                        <h3>Inserisci nome e email</h3>
                        <form className="popup-form" onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={isProcessing}>
                                {isProcessing ? "Invio..." : "Invia"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {showSuccess && (
                <div className="popup-overlay success-message">
                    <div className="popup-container success-popup">
                        <p>La tua configurazione è stata inviata con successo!</p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {showError && (
                <div className="popup-overlay error-message">
                    <div className="popup-container error-popup">
                        <p>Si è verificato un errore durante l'invio!</p>
                    </div>
                </div>
            )}

            {/* Colonna DESTRA */}
            <div className="configurator configurator--right">
                <div className="configurator__section">
                    <div className="configurator__section__title">Tasti</div>
                    <div className="configurator__section__values">
                        {materialColors.map((item, index) => (
                            <div
                                key={index}
                                className={`item ${item.color === tastiColor.color ? "item--active" : ""}`}
                                onClick={() => setTastiColor(item)}
                            >
                                <div className="item__dot" style={{ backgroundColor: item.color }} />
                                <div className="item__label">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="configurator__section">
                    <div className="configurator__section__title">Schermo</div>
                    <div className="configurator__section__values">
                        {materialColors.map((item, index) => (
                            <div
                                key={index}
                                className={`item ${item.color === schermo2Color.color ? "item--active" : ""}`}
                                onClick={() => setSchermo2Color(item)}
                            >
                                <div className="item__dot" style={{ backgroundColor: item.color }} />
                                <div className="item__label">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="configurator__section">
                    <div className="configurator__section__title">Speaker</div>
                    <div className="configurator__section__values">
                        {materialColors.map((item, index) => (
                            <div
                                key={index}
                                className={`item ${item.color === ariaColor.color ? "item--active" : ""}`}
                                onClick={() => setAriaColor(item)}
                            >
                                <div className="item__dot" style={{ backgroundColor: item.color }} />
                                <div className="item__label">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Configurator;
