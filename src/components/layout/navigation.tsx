"use client";

import Link from "next/link";
import { Navigation } from "@/config/navigation";

import AppIcon from "@/components/ui/icon/icon";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useSectionPassed } from "@/hooks/useSectionPassed";

import { AnimatePresence, motion } from "motion/react";
import AuthButton from "@/features/auth/components/auth-button/AuthButton";

const sectionIds = Navigation.routing.map(item =>
    item.href.replace("#", "")
);

const AppNavigation = ({ location = Navigation.LOCATION.HEADER }: {
    location?: Navigation.Location,
    className?: string
}) => {
    const activeSection = useScrollSpy(sectionIds);
    const isAboutBelow = useSectionPassed("about");

    const isHeader: boolean = location === Navigation.LOCATION.HEADER;
    const isFooter: boolean = location === Navigation.LOCATION.FOOTER;
    const isSide: boolean = location === Navigation.LOCATION.SIDE;

    const showSideNav =
        isSide &&
        activeSection !== "" &&
        activeSection !== "home" &&
        isAboutBelow;

    const isRouteActive = (item: Navigation.Route): boolean => {
        const fragment = activeSection;
        const itemFragment = item.href.slice(1);

        if (itemFragment === "home") {
            return fragment === "" || fragment === "home";
        }

        return fragment === itemFragment;
    };

    return isSide ? (
        <AnimatePresence>
            {showSideNav && (
                <motion.aside
                    initial={{ opacity: 0, x: -8, scale: 0.95 }}
                    animate={{
                        opacity: 1, x: 0, scale: 1,
                        transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    exit={{
                        opacity: 0, x: -8, scale: 0.95,
                        transition: { duration: 0.2, ease: "easeIn" }
                    }}
                    className="flex flex-row gap-2 items-center fixed z-50 top-6 l+eft-1/2 -t+ranslate-x-[50%] scale-75 self-center
                    lg:flex-col lg:top-1/5 lg:left-4 lg:translate-x-[16%] lg:scale-100"
                >
                    <nav
                        className="flex text-14 relative flex-row lg:flex-col gap-2 bg-dark-1 w-full p-2 rounded-full border border-dark-6 md:left-0">
                        {Navigation.routing.map((item) => {
                            const isActive = isRouteActive(item);

                            return (
                                <Link key={item.id}
                                      href={item.href}
                                      className={[
                                          "p-2 flex items-center transition-colors duration-200 rounded-full",
                                          isActive ? "bg-dark-9 text-dark-6" : ""
                                      ].filter(Boolean).join(" ")}>
                                    <AppIcon name={item.icon} className="h-4! w-4! text-dark-6!" />
                                </Link>
                            );
                        })}
                    </nav>
                    <div className={"h-12"}>
                        <AuthButton location={Navigation.LOCATION.SIDE} />
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    ) : (
        <nav
            className={[
                "flex relative left-0 text-14",
                isHeader ? "flex-row items-center gap-4" : "",
                isFooter ? "flex-col text-left gap-1 md:gap-2" : ""
            ].filter(Boolean).join(" ")}>
            {Navigation.routing.map((item) => {
                const isActive =
                    activeSection === item.href.replace("#", "");

                return (
                    <Link key={item.id}
                          href={item.href}
                          className={[
                              "flex items-center transition-colors duration-200",
                              !isActive || !isHeader ? "cursor-pointer" : "",
                              isActive ? "text-dark-9" : "",
                              isHeader
                                  ? "uppercase text-dark-6 hover:text-dark-8"
                                  : "",
                              !isFooter ? "text-dark-6 hover:text-dark-8" : ""
                          ].filter(Boolean).join(" ")}>
                        {isHeader && item.icon === "home" ? (
                            <AppIcon name={item.icon} className="w-4 h-4" />
                        ) : (
                            item.title
                        )}
                    </Link>
                );
            })}
        </nav>
    );
};

export default AppNavigation;

