import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HTOO_MYAT_NYI_NYI",
  description: "inperfect results is better than perfect excuses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider clientId="420918966550-5grrctb40mudr1ebtatnmgb8ahq87vub.apps.googleusercontent.com">
          <div className="bg-white dark:bg-black">
            <Navbar />
            {children}
            <Footer />
          </div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
