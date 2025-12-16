import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { AppSidebar } from "./AppSidebar";
import { GlobalCommandPalette } from "./GlobalCommandPalette";
import { Footer } from "./Footer";
import { GtmPageViewTracker } from "./GtmPageViewTracker";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const Layout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
            <GtmPageViewTracker />
            <GlobalCommandPalette />

            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-72 shrink-0 border-r bg-sidebar z-40">
                <AppSidebar />
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 h-full overflow-hidden relative">
                <Header />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 scroll-smooth">
                    <div className="mx-auto max-w-[1600px] min-h-[calc(100vh-10rem)] animate-fade-in flex flex-col">
                        <Suspense fallback={<LoadingSpinner />}>
                            <Outlet />
                        </Suspense>
                        <div className="mt-auto pt-16">
                            <Footer />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
