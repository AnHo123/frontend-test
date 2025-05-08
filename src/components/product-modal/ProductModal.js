import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './ProductModal.module.css'

const maskVariants = {
    hidden: {
        opacity: 0,
        transition: { duration: 0.3, ease: 'linear' },
    },
    visible: {
        opacity: 1,
        transition: { duration: 0.3, ease: 'linear' },
    },
}

const contentVariants = {
    visible: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    hidden: {
        scale: 0.85,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
}

export default function ProductModal({ product, open, setOpen }) {
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center transition-all">
                    <motion.div
                        onClick={() => setOpen(false)}
                        className="absolute left-0 top-0 h-full w-full bg-black/70"
                        variants={maskVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    />
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={styles['content-wrapper']}
                    >
                        <div className={styles['content']}>
                            <div
                                className="absolute right-0 top-0 flex cursor-pointer select-none items-center justify-center p-2 text-5xl leading-[0.5] transition-all hover:scale-110 xl:right-2 xl:top-3 xl:text-6xl xl:leading-[0.5]"
                                onClick={() => setOpen(false)}
                            >
                                &times;
                            </div>
                            <h2 className="text-h-2 font-bold xl:self-end xl:text-h-1">
                                {product?.name}
                            </h2>
                            <img
                                className={styles['image']}
                                src={product?.image}
                                alt={product?.name || 'Product'}
                            />
                            <p className="text-body-1 text-secondary xl:text-sub-2">
                                {product?.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
