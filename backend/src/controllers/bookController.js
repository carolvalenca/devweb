const shortid = require('shortid');

let books =[
    {
        id: shortid.generate(),
        name: 'Harry Potter e o Cálice de Fogo',
        author: 'J. K. Rowling',
        finished: false,
        lastPage: 52,
        totalPages: 200,
        startDate: "Wed Dec 01 2021 17:35:33 GMT-0300",
        lastUpdate: "Wed Dec 01 2021 17:35:33 GMT-0300",
    },
    {
        id: shortid.generate(),
        name: 'Orgulho e Preconceito',
        author: 'Jane Austen',
        finished: false,
        lastPage: 85,
        totalPages: 350,
        startDate: "Wed Dec 01 2021 17:35:33 GMT-0300",
        lastUpdate: "Wed Dec 01 2021 17:35:33 GMT-0300",
    },
    {
        id: shortid.generate(),
        name: 'Battle Royale',
        author: 'Koushun Takami',
        finished: false,
        lastPage: 259,
        totalPages: 515,
        startDate: "Wed Dec 01 2021 17:35:33 GMT-0300",
        lastUpdate: "Wed Dec 01 2021 17:35:33 GMT-0300",
    },
    {
        id: shortid.generate(),
        name: 'Capitães de Areia',
        author: 'Jorge Amado',
        finished: true,
        lastPage: 515,
        totalPages: 515,
        startDate: "Wed Dec 01 2021 17:35:33 GMT-0300",
        lastUpdate: "Wed Dec 01 2021 17:35:33 GMT-0300",
    }
]

const getBooks = (_, res) => {
    return res.json(books);
}

const saveBook = (req, res) => {
    let book = req.body;
    let startDate = new Date();
    startDate = startDate + "";
    startDate = startDate.split(' (');

    book = {...book, startDate: startDate[0], lastUpdate: startDate[0], id: shortid.generate()};

    books.push(book);

    return res.status(201).json(book);
}

const editBook = (req, res) => {
    const { id } = req.params;
    const { lastPage, finished } = req.body;
    
    let lastUpdate = new Date();
    lastUpdate = lastUpdate + "";
    lastUpdate = lastUpdate.split(' (');
    lastUpdate = lastUpdate[0];
    
    const ret = books.filter(elem => elem.id === id);

    if (ret.length === 0) {
        res.status(404).json({message: 'Livro não encontrado'});
    } else {
        const lastPageObj = lastPage ? lastPage : ret[0].lastPage;
        const finishedObj = finished ? finished : ret[0].finished;
        
        console.log(lastPage, finished);
    
        ret[0] = {...ret[0], lastPage: lastPageObj, finished: finishedObj, lastUpdate };
    
        books = books.map(elem => {
            if (elem.id == id) elem = ret[0];
            return elem;
        });
    
        res.json(ret);
    }

}

const deleteBook = (req, res) => {
    const { id } = req.params;

    const index = books.findIndex(elem => elem.id === id);

    if (index <= -1) {
        res.status(404).json({message: 'Livro não encontrado'});
    } else {
        const deletedBook = books.splice(index, 1);
        
        res.json(deletedBook);
    }
}

module.exports = {
    getBooks,
    saveBook,
    editBook,
    deleteBook,
}