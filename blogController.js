const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}
const blog_edit_get = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
  .then(result =>{
    res.render('edit',{blog:result, title: 'Edit the blog' });
  })
  .catch(err => {
    console.log(err);
    res.render('404', { title: 'Blog not found' });
  });
  
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}
const blog_edit_put = (req, res) => {
  const id = req.params.id;
  
  Blog.findById(id)
  .then(result => {
  Blog.updateOne({'title':result.title},{$set:req.body})
  .then(result => {
    
    res.redirect(`/blogs/${id}`);
  }
  )
});
}


const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete,
  blog_edit_get,
  blog_edit_put
}