import React from "react"
import { useTheme } from "./context/ThemeContext"
import Navbar from "./components/Navbar"
import MessageUI from "./components/MessageUI"

function AppContent() {
    const { isDarkMode } = useTheme()

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <Navbar />
            <MessageUI />
        </div>
    )
}

function App() {
    return <AppContent />
}

export default App
