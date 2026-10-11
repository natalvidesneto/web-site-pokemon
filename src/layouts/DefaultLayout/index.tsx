import type { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./styles.css";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}