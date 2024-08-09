import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeArena",
  description: "Online Coding Arena",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          
          <div className="">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
