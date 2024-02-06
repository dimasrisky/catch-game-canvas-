const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// Deklarasi Variabel yang dibutuhkan
const canvas_width = 1400
const canvas_height = 700
let xMousePosition = 0
let yMousePosition = 0
let score = 0
let koinJatuh = 0
// ====================================

// Class Karakter
class Karakter{
    x = 0
    y = 0

    constructor(path, width, height){
        this.path = path
        this.width = width
        this.height = height
    }

    animate(x, y){
        this.x = x
        this.y = y
        generateImage(this.path, this.x, this.y, this.width, this.height)
    }
}

// Class Coin
class Coin extends Karakter{
    constructor(path, frameWidth, frameHeight, width, height){
        super(path, width, height)
        this.image = new Image()
        this.image.src = path
        this.sfx = new Audio('assets/sfx/coin.mp3')
        this.frameWidth = frameWidth
        this.frameHeight = frameHeight
        this.frameCounter = 0
        this.counterStaging = 0
        this.counterY = 0
        this.x = Math.random() * canvas_width
        this.y = 0
    }

    // method untuk mengembalikan koin ke posisi awal
    #initializeCoinPosition(){
        this.y = 0
        this.counterY = 0
        this.x = Math.random() * canvas_width
    }
    // ================================================

    animateCoin(){
        ctx.drawImage(this.image, this.frameWidth * this.frameCounter, 0, this.frameWidth, this.frameHeight, this.x, this.y += this.counterY, this.width, this.height)
        if(this.counterStaging % 4 === 0) this.frameCounter === 7? this.frameCounter = 0 : this.frameCounter++

        // Ketika koin mencapai bagian bawah canvas
        if(this.y > canvas_height) {
            koinJatuh++
            this.#initializeCoinPosition()
        }
        // ========================================
        
        // ketika coin bersentuhan dengan keranjang
        if(keranjang.x + keranjang.width > this.x && keranjang.x < this.x + this.width && keranjang.y + keranjang.height > this.y && keranjang.y < this.y + this.height){
            this.sfx.play()
            koinJatuh++
            score++
            this.#initializeCoinPosition()
        }
        // ========================================

        this.counterY += 0.1
        this.counterStaging++
    }
}

// event ketika cursor bergerak
canvas.addEventListener('mousemove', eventObject => {
    xMousePosition = eventObject.offsetX
    yMousePosition = eventObject.offsetY
})
// ===================================

// Function untuk generate image
const generateImage = (path, x, y, w, h) => {
    const img = new Image()
    img.src = path
    ctx.drawImage(img, x, y, w, h)
}
// ==============================

// Function untuk generate tulisan
const generateText = (value, fontName, size, x, y) => {
    ctx.font = `${size}px ${fontName}`
    ctx.fillStyle = '#000'
    ctx.fillText(value, x, y)
}
// ==============================

// membuat object keranjang dan koin
const keranjang = new Karakter('assets/icons/keranjang.png', 70, 70)
const koin = new Coin('assets/icons/coin.png', 16, 16, 50, 50,)


// Loop Animation
const animateLoop = () => {
    ctx.clearRect(0, 0, canvas_width, canvas_height)
    // Animasi Koin
    koin.animateCoin(keranjang)
    // =====
    // Animasi Keranjang
    keranjang.animate(xMousePosition, yMousePosition)
    // =====
    generateText(`Score anda adalah : ${score}`, 'Offbit-bold', 40, 500, 350)
    generateText(`Koin yang jatuh : ${koinJatuh}`, 'Offbit-bold', 40, 500, 600)
    generateImage('assets/icons/cloud.svg', -70, -120, 1600, 300)
    generateImage('assets/icons/cloud.svg', -70, 550, 1600, 300)
    requestAnimationFrame(animateLoop)
}
animateLoop()