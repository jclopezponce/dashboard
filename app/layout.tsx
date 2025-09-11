import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeRegistry } from "@/components/theme-registry";
import AppTopbar from "@/components/app-top-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Manage your store with ease",
};

export default function RootLayout({
  children,

}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeRegistry>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
               <AppTopbar />
              <div className="p-4">{children}</div>
            </main>
          </SidebarProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
