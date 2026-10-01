'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const ProjectsSlider = ({ images }: { images: string[] }) => {
    const [activeImage, setActiveImage] = useState<string>(images[0]);
    useEffect(() => {
        setActiveImage(images[0]);
    }, [images]);

    return (
        <div className={'flex flex-col w-full items-center gap-4 -mb-10'}>
            <div className={'w-full aspect-[4/3] relative'}>
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0 }}
                                animate={{ opacity: 1}}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                key={activeImage}
                                className={[
                                    'top-0 left-0 absolute w-full h-full rounded-md border border-dark-4 bg-dark-2 bg-center bg-no-repeat bg-contain',
                                    activeImage
                                ].join(' ')}
                    ></motion.div>
                </AnimatePresence>
            </div>
            <div className={'flex flex-row gap-4'}>
                {images.map(imageClass => {
                    const isActive = activeImage === imageClass;

                    return (<button key={imageClass}
                                    aria-label={`Show ${imageClass}`}
                                    onClick={() => setActiveImage(imageClass)}
                                    className={['h-6 aspect-square rounded-full relative flex flex-col items-center justify-center',
                                        isActive
                                            ? [
                                                'before:absolute before:block',
                                                'before:h-1 before:w-1',
                                                'before:rounded-full',
                                                'before:outline-2',
                                                'before:outline-bronze',
                                                'before:shadow-[0_0_0_6px_#ffc16633]',
                                                'before:bg-dark-1'
                                            ].join(' ')
                                            : [
                                                'cursor-pointer',
                                                'before:absolute before:block',
                                                'before:h-1 before:w-1',
                                                'before:rounded-full',
                                                'before:bg-bronze'
                                            ].join(' ')
                                    ].join(' ')}

                    />);
                })
                }
            </div>
        </div>
    );

};

export default ProjectsSlider;