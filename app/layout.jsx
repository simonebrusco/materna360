import "./globals.css";
import BottomTabBar from "../components/BottomTabBar";
export const metadata={ title:"Materna360" };
export default function RootLayout({children}){
  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
        <BottomTabBar/>
      </body>
    </html>
  );
}
