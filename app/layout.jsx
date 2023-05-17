import React from 'react'
import '@styles/globals.css'

export const metadata = {
    title: "Prep & Learn",
    description: "Practice to your heart content."
}
const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <main className="app">
                {children}
            </main>
        </html>
    )
}

export default RootLayout