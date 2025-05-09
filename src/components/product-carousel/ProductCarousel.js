import React, { useEffect, useRef, useState } from 'react'
import ProductCard from '../product-card/ProductCard'
import productList from '../../data/ProductList'
import { motion, useAnimation } from 'framer-motion'

import ProductModal from '../product-modal/ProductModal'

export default function ProductCarousel() {
    const carouselRef = useRef()
    const firstCardRef = useRef()
    const controls = useAnimation() // Framer Motion animation controls
    const [width, setWidth] = useState(0)
    const [cardWidth, setCardWidth] = useState(0)
    const [activeCard, setActiveCard] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [cardPerView, setCardPerView] = useState(1)
    const [openPopup, setOpenPopup] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleDragEnd = (_, info) => {
        const dragOffset = info.offset.x // Total drag distance
        const dragVelocity = info.velocity.x // Drag velocity

        // Determine the direction of the drag
        if (dragOffset > cardWidth / 3 || dragVelocity > 500) {
            // Dragged right, go to the previous card
            setActiveCard((prev) => Math.max(prev - 1, 0))
        } else if (
            activeCard < Math.ceil(productList.length / cardPerView) - 1 &&
            (dragOffset < -cardWidth / 3 || dragVelocity < -500)
        ) {
            // Dragged left, go to the next card
            setActiveCard((prev) => Math.min(prev + 1, productList.length - 1))
        } else {
            // Snap back to the current card
            snapToActiveCard()
        }

        setIsDragging(false) // Reset dragging state
    }

    const snapToActiveCard = () => {
        let targetX = -activeCard * cardWidth * cardPerView // Default target position

        if (width <= -targetX) {
            controls.start({ x: -width, transition: { ease: 'easeOut' } }) // Animate the carousel to the end
        } else {
            controls.start({ x: targetX, transition: { ease: 'easeOut' } })
        } // Animate the carousel to the target position
    }

    useEffect(() => {
        // Snap to the active card whenever it changes
        snapToActiveCard()
    }, [activeCard])

    useEffect(() => {
        const updateCardWidth = () => {
            const screenWidth = window.innerWidth
            if (screenWidth >= 1280) {
                setCardPerView(3) // 3 cards per view
            } else if (screenWidth >= 768) {
                setCardPerView(2) // 2 cards per view
            } else {
                setCardPerView(1) // 1 card per view
            }

            if (carouselRef.current) {
                const cardElement = firstCardRef.current
                setWidth(
                    carouselRef.current.scrollWidth -
                        carouselRef.current.clientWidth
                )
                if (cardElement) {
                    // get card width and spacing
                    const margin = parseFloat(
                        getComputedStyle(cardElement).marginRight
                    )
                    const width = cardElement.getBoundingClientRect().width
                    setCardWidth(width + margin * 2)
                    setActiveCard(0) // Reset active card to 0 on resize
                    controls.start({ x: 0, transition: { ease: 'easeOut' } }) // Reset the carousel position
                }
            }
        }

        // Set initial card width
        updateCardWidth()

        // Update card width on window resize
        window.addEventListener('resize', updateCardWidth)

        return () => {
            window.removeEventListener('resize', updateCardWidth)
        }
    }, [controls])

    return (
        <div className="flex w-full flex-col items-center">
            <motion.div
                ref={carouselRef}
                className="w-full max-w-[26rem] overflow-hidden md:max-w-[60rem] xl:max-w-[91.5rem]"
            >
                <motion.div
                    drag="x"
                    dragConstraints={{
                        left: -width,
                        right: 0,
                    }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    animate={controls} // Use Framer Motion's animation controls
                    whileTap={{ cursor: 'grabbing' }}
                    className="grid w-fit cursor-grab grid-flow-col justify-start"
                >
                    {productList.map((product, index) => (
                        <ProductCard
                            ref={index === 0 ? firstCardRef : null} // Assign ref to the first card
                            className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                            product={product}
                            key={index}
                            onClick={() => {
                                if (isDragging) return // Prevent click if dragging
                                setOpenPopup(true)
                                setSelectedProduct(product)
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
            <div className="mt-5 flex w-full items-center justify-center gap-5 md:mt-8">
                <button
                    className={`bg-background rounded-md px-3 py-1 text-body-2 transition-all hover:text-highlight md:px-4 md:py-1.5 md:text-body-1 ${
                        activeCard === 0
                            ? 'user-select-none pointer-events-none select-none opacity-80'
                            : ''
                    }`}
                    onClick={() =>
                        setActiveCard((prev) => Math.max(prev - 1, 0))
                    }
                >
                    Prev
                </button>
                <div className="hidden items-center justify-center gap-2 md:flex">
                    {Array.from(
                        { length: Math.ceil(productList.length / cardPerView) },
                        (_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-full transition-all ${
                                    index === activeCard
                                        ? 'w-6 bg-highlight'
                                        : 'bg-gray-300'
                                }`}
                                onClick={() => setActiveCard(index)} // Set active card on dot click
                            ></div>
                        )
                    )}
                </div>
                <div className="min-w-16 text-body-1 md:hidden">
                    <span className="font-semibold text-highlight">
                        {productList?.findIndex(
                            (_, idx) => idx === activeCard
                        ) + 1}{' '}
                    </span>
                    / {Math.ceil(productList.length / cardPerView)}
                </div>
                <button
                    className={`bg-background rounded-md px-3 py-1 text-body-2 transition-all hover:text-highlight md:px-4 md:py-1.5 md:text-body-1 ${
                        activeCard ===
                        Math.ceil(productList.length / cardPerView) - 1
                            ? 'user-select-none pointer-events-none select-none opacity-80'
                            : ''
                    }`}
                    onClick={() =>
                        setActiveCard((prev) =>
                            Math.min(prev + 1, productList.length - 1)
                        )
                    }
                >
                    Next
                </button>
            </div>
            <ProductModal
                product={selectedProduct}
                open={openPopup}
                setOpen={setOpenPopup}
            />
        </div>
    )
}
