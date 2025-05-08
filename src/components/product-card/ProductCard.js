import { forwardRef } from 'react'
import styles from './ProductCard.module.css'

const ProductCard = forwardRef((props, ref) => {
    const { product } = props

    return (
        <div
            onClick={props?.onClick}
            ref={ref}
            className={`bg-background row-span-3 grid h-full w-full grid-rows-subgrid place-items-center gap-0 rounded-xl ${styles['root']} ${props?.className}`}
        >
            <img
                className="pointer-events-none aspect-square w-full select-none rounded-lg object-cover object-center"
                src={product?.image}
                alt={product?.name}
            />
            <h2 className="mb-1 mt-2.5 text-sub-2 font-semibold md:mb-2 md:mt-3 xl:text-sub-1">
                {product?.name}
            </h2>
            <p className="line-clamp-3 text-body-2 text-secondary xl:text-body-1">
                {product?.description}
            </p>
        </div>
    )
})

export default ProductCard
