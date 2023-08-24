import React from "react";

const Layout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en">
        <head>
        <title>Header</title>
        </head>
        <body style={{margin: 0}}>
        <div id="root">{children}</div>
        </body>
    </html>        
  )
}

export default Layout;