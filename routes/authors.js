const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Author Route
router.get('/', (req, res) => {
    res.render('authors/index')
})

// New Author Route (To display the form to register new author)
router.get('/new', (req, res) => {
    
    // with render we can pass variables that can be used in our ejs file, here new.ejs, we pass our Author model.
    res.render('authors/new', { author: new Author() })     // This creates an empty author object that can be used for create, update, delete. This Object will be used in our ejs file.
})

// To CREATE a new author we use a POST Route (From REST, POST is used for Creation)
// As we are creating something we won't use 'render()', we will use send().
router.post('/', async (req, res) => {
    // res.send('Create')

    // We will create a new Author() Object to display the authors created through /new/ejs form via POST action.
    const author = new Author({
        name: req.body.name
    })
    // Saving the above row to the Author table via mongoose save() method. EXPLORE MORE Methods like find(), etc. in Mongoose.
    // author.save((error, newAuthor) => {
    //     if (error) {
    //         res.render('/authors/new', {
    //             author: author,     // To repopulate the input field with the author's name user provided so they don't have to re-enter it.
    //             errorMessage: 'Error creating the Author.'
    //         })
    //     } else {
    //         // res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect(`authors`)
    //     }
    // })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating the Author'
        })
    }





    res.send(req.body.name)     // IMPORTANT ---> We 'post' data using 'body' and 'get' using 'query'. Here we send the author's name.
})





module.exports = router