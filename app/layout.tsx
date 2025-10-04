import React from "react";
export const metadata = { title: "Materna360" };
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {process.env.NODE_ENV === "production"
          && process.env.NEXT_PUBLIC_FULLSTORY_ORG
          && process.env.NEXT_PUBLIC_ENABLE_FS !== "false" ? (
          <script
            defer
            src="https://edge.fullstory.com/s/fs.js"
            data-org={process.env.NEXT_PUBLIC_FULLSTORY_ORG}
            data-debug="false"
          />
        ) : null}
      </head>
      <body style={{margin:0}}>{children}</body>
    </html>
  );
}
