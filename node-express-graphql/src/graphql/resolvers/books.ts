const books = () => {
    return [
        {
            title: 'The Awakening',
            author: 'Kate Chopin',
        },
        {
            title: 'City of Glass',
            author: 'Paul Auster',
        }
        ,
    ]
}

export default {
    Query: {
        books,
    }
}
