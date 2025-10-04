import "./globals.css";
import BottomTabBar from "../components/BottomTabBar";
export const metadata = { title:"Materna360", description:"Bem-vinda ao seu espaço de bem-estar." };
export default function RootLayout({children}) {
  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
        <BottomTabBar />
      </body>
    </html>
  );
}
