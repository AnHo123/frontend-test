// Fuction to calculate the total value of all items in stock
// and apply a discount if the quantity is greater than 5
const productList = [
    {
        name: 'Iron Fang Dagger',
        description: 'Forged in the mountain forges of Halgar.',
        image: './weapons/weapon-1.jpeg',
        quantity: 4,
        price: 120,
    },
    {
        name: 'Abysscaller Harpoon',
        description:
            'Carved from the spine of a leviathan, the Abysscaller Harpoon was once used by deep-sea hunters. Now enchanted, it can pierce through solid steel and drag enemies with aquatic force. Its eerie blue glow reveals its haunting origins.',
        image: './weapons/weapon-2.jpeg',
        quantity: 3,
        price: 300,
    },

    {
        name: 'Orcish Cleaver',
        description:
            'This crude but terrifyingly effective cleaver was designed by orc blacksmiths to maximize raw destruction. While lacking elegance, its sheer weight and brutal edge can cleave through armor and bone alike, making it a fearsome weapon on any battlefield.',
        image: './weapons/weapon-3.jpeg',
        quantity: 5,
        price: 450,
    },
]

function calculateTotalValue(items) {
    let total = 0

    items.forEach((item) => {
        const { price, quantity } = item
        const discount = quantity > 5 ? 0.1 : 0 // 10% discount if quantity > 5
        const discountedPrice = price * (1 - discount)
        total += discountedPrice * quantity
    })

    return total
}
const totalValue = calculateTotalValue(productList)
// Print the result to the console
console.log('Total value of all items in stock:' + totalValue)

// Function to handle click the card to open the modal
const modal = document.querySelector('.modal')
const modalTitle = document.querySelector('.modal__title')
const modalImage = document.querySelector('.modal__image')
const modalDescription = document.querySelector('.modal__description')
const modalCloseBtn = document.querySelector('.modal__close')
const carouselList = document.querySelectorAll('.carousel__item')

modalCloseBtn.addEventListener('click', () => {
    modal.classList.remove('modal__active')
})

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('modal__active')
    }
})

carouselList.forEach((item) => {
    item.addEventListener('click', () => {
        const dataId = Number(item.getAttribute('data-id'))
        const data = productList?.[dataId]
        const { name, description, image } = data
        // Set the modal content
        modalTitle.textContent = name
        modalImage.src = image
        modalDescription.textContent = description
        modal.classList.add('modal__active')
    })
})
