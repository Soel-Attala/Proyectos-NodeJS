const express = require('express')
const { Router } = express;
const routerMenu = Router();
const app = express()
const PORT = 8080
const path = require('path')


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));



let listaDeProductos = [
    {
        title: 'Brisket',
        price: 1800,
        thumbnail: 'https://5sv7.short.gy/tiRxmF',
        id: 1
    },
    {
        title: 'Bondiola Ahumada',
        price: 1300,
        thumbnail: 'https://5sv7.short.gy/H8vebO',
        id: 2
    },
    {
        title: 'Chorizos Ahumados',
        price: 1000,
        thumbnail: 'https://5sv7.short.gy/DpEmKD',
        id: 3
    }
]

let mensajeError = { error: 'producto no encontrado' }

routerMenu.get('/', (req, res) => {
    res.json(listaDeProductos)
})

routerMenu.get('/:id', (req, res) => {
    if (listaDeProductos.indexOf(listaDeProductos[req.params.id - 1]) === -1) {
        res.json(mensajeError);
    } else {
        res.json(listaDeProductos[req.params.id - 1]);
    }
})

routerMenu.post('/', (req, res) => {
    console.log(req.body)
    let lastId = listaDeProductos.reduce((acc, item) =>
        (item.id > acc ? (acc = item.id) : acc), 0)

    let newProduct = {
        id: lastId + 1,
        ...req.body
    }
    listaDeProductos.push(newProduct)
    res.json(newProduct)
})

routerMenu.put('/:id', (req, res) => {
    const product = listaDeProductos[req.params.id - 1]
    if (listaDeProductos.indexOf(product) === -1) {
        res.json(mensajeError)
    } else {
        product.title = req.body.title
        product.price = req.body.price
        product.thumbnail = req.body.thumbnail

        res.json(product)
    }

})

routerMenu.delete('/:id', (req, res) => {
    listaDeProductos.splice(req.params.id - 1, 1)
    res.json(listaDeProductos)
})


app.use('/api/', routerMenu);
app.use('/api/carrito', routerMenu);
app.use('/api/productos', routerMenu);

app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`)
})

