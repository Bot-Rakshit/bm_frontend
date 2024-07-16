import React, { useEffect } from 'react';

export default function Chatbot() {
    useEffect(() => {
        const handleMessage = (event) => {
            const chatIframe = document.getElementById("openassistantgpt-chatbot-iframe");
            const buttonIframe = document.getElementById("openassistantgpt-chatbot-button-iframe");

            if (event.data === "openChat" && chatIframe && buttonIframe) {
                console.log("Toggle chat visibility");
                chatIframe.contentWindow.postMessage("openChat", "*");
                buttonIframe.contentWindow.postMessage("openChat", "*");
                chatIframe.style.pointerEvents = "auto";
                chatIframe.style.display = "block";

                if (window.innerWidth < 640) {
                    Object.assign(chatIframe.style, {
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        zIndex: "9999",
                    });
                } else {
                    Object.assign(chatIframe.style, {
                        position: "fixed",
                        width: "30rem",
                        height: "65vh",
                        bottom: "0",
                        right: "0",
                        top: "",
                        left: "",
                    });
                }
            } else if (event.data === "closeChat" && chatIframe && buttonIframe) {
                chatIframe.style.display = "none";
                chatIframe.style.pointerEvents = "none";
                chatIframe.contentWindow.postMessage("closeChat", "*");
                buttonIframe.contentWindow.postMessage("closeChat", "*");
            } else {
                console.error("iframe not found");
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const customStyle = {
        display: 'none',
        position: 'fixed',
        right: '1rem',
        bottom: '6rem',
        pointerEvents: 'none',
        overflow: 'hidden',
        height: '65vh',
        border: '2px solid #e2e8f0',
        borderRadius: '0.375rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        width: '30rem',
        zIndex: 50,
    };

    return (
        <div>
            <iframe
                src="https://botbyte.in/embed/clynfkmh60003eedmpjl13phw/button?chatbox=false"
                scrolling="no"
                id="openassistantgpt-chatbot-button-iframe"
                className="fixed bottom-0 right-0 mb-4 z-50 flex items-end inline-block mr-4 w-14 h-14 border border-gray-300 rounded-full shadow-md"
            ></iframe>
            {/* <!-- This chatbot is built using Botbyte AI by Sanket Bagad --> */}
            <iframe
                src="https://botbyte.in/embed/clynfkmh60003eedmpjl13phw/window?chatbox=false&withExitX=true"
                style={customStyle}
                id="openassistantgpt-chatbot-iframe"
            ></iframe>
        </div>
    );
}
