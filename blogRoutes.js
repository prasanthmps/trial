const express = require('express');
const blogController = require('../controllers/blogController'); //.. to extract it from first folder and then the seconf file.

const router = express.Router();

router.get('/create', blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.get('/:id/edit', blogController.blog_edit_get);
router.put('/:id', blogController.blog_edit_put);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router;