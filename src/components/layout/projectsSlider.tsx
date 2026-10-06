"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SWIPE_THRESHOLD = 50;
const ProjectsSlider = ({ images }: { images: string[] }) => {
    const [activeImage, setActiveImage] = useState<string>(images[0]);

    useEffect(() => {
        setActiveImage(images[0]);
    }, [images]);
    const activeIndex = images.indexOf(activeImage);

    const showNext = () => {
        const nextIndex = (activeIndex + 1) % images.length;
        setActiveImage(images[nextIndex]);
    };
    const showPrevious = () => {
        const previousIndex = (activeIndex - 1 + images.length) % images.length;
        setActiveImage(images[previousIndex]);
    };
    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        const touch = event.touches[0];
        event.currentTarget.dataset.startX = String(touch.clientX);
        event.currentTarget.dataset.startY = String(touch.clientY);
    };
    const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        const startX = Number(event.currentTarget.dataset.startX);
        const startY = Number(event.currentTarget.dataset.startY);
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;

        if (Math.abs(deltaX) <= Math.abs(deltaY)) {
            return;
        }

        if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
            return;
        }
        if (deltaX < 0) {
            showNext();
        } else {
            showPrevious();
        }
    };
    return (<div className="flex w-full flex-col items-center gap-4 -mb-10">
        <div className="relative w-full aspect-[4/3] overflow-hidden touch-pan-y" onTouchStart={handleTouchStart}
             onTouchEnd={handleTouchEnd}>
            <AnimatePresence mode="wait">
                <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={["absolute top-0 left-0", "h-full w-full", "rounded-md border border-dark-4", "bg-dark-2 bg-center bg-no-repeat bg-contain", activeImage].join(" ")} />
            </AnimatePresence>
        </div>
        <div className="flex flex-row gap-4"> {
            images.map((imageClass) => {
                const isActive = activeImage === imageClass;
                return (
                    <button key={imageClass} type="button" aria-label={`Show ${imageClass}`}
                            onClick={() => setActiveImage(imageClass)}
                            className={["relative flex h-6 aspect-square flex-col items-center justify-center",
                                isActive
                                    ? ["before:absolute before:block", "before:h-1 before:w-1", "before:rounded-full", "before:outline-2 before:outline-bronze", "before:shadow-[0_0_0_6px_#ffc16633]", "before:bg-dark-1"].join(" ")
                                    : ["cursor-pointer", "before:absolute before:block", "before:h-1 before:w-1", "before:rounded-full", "before:bg-bronze"].join(" ")].join(" ")} />);
            })}
        </div>
    </div>);
};
export default ProjectsSlider;