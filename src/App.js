import styles from './App.module.css'
import ProductCarousel from './components/product-carousel/ProductCarousel'

function App() {
    return (
        <section className="flex flex-col items-center justify-center px-4 py-8 text-center md:p-12 xl:p-12">
            <h1
                className={`relative mx-8 mb-8 w-fit text-h-2 font-bold leading-tight md:text-h-1 xl:mb-10 ${styles['title']}`}
            >
                Shadowfang Forge
            </h1>
            <ProductCarousel />
        </section>
    )
}

export default App
