import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { AppSidebar } from "./AppSidebar";
import { GlobalCommandPalette } from "./GlobalCommandPalette";
import { Footer } from "./Footer";
import { GtmPageViewTracker } from "./GtmPageViewTracker";
import { Suspense, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

export const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
            <GtmPageViewTracker />
            <GlobalCommandPalette />

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:block shrink-0 border-r bg-sidebar z-40 transition-all duration-300 ease-in-out overflow-hidden",
                    isSidebarOpen ? "w-72" : "w-0 border-none"
                )}
            >
                <div className="w-72 h-full">
                    <AppSidebar />
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 h-full overflow-hidden relative">
                <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 scroll-smooth">
                    <div className="mx-auto w-full min-h-[calc(100vh-10rem)] animate-fade-in flex flex-col">
                        <Suspense fallback={<LoadingSpinner />}>
                            <Outlet />
                        </Suspense>
                        {location.pathname === "/" && (
                            <div className="mt-auto pt-16">
                                <Footer />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};
