import React from 'react'
import '@styles/globals.css'

export const metadata = {
    title: "Prep & Learn",
    description: "Practice to your heart content."
}
const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <main className="app">
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout