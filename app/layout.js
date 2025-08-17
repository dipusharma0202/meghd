import "./globals.css";

export const metadata = {
  title: "MeghD",
  description: "My Next.js + Firebase App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Simple Navbar */}
        <nav style={{padding:"15px", background:"#0072ff", color:"white", fontWeight:"bold"}}>
          MeghD
        </nav>
        {children}
      </body>
    </html>
  );
}