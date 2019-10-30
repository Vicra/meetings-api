const ArticlesCtrl = fw.getController('articles');

module.exports = [{
        method: 'GET',
        path: '/article',
        options: {
            handler: ArticlesCtrl.getArticles,
            tags: ['api'],
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/article/{id}',
        options: {
            handler: ArticlesCtrl.getArticleById,
            tags: ['api'],
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/article',
        options: {
            handler: ArticlesCtrl.addArticle,
            tags: ['api'],
            validate: {
                payload: {
                    name: fw.param.string().required(),
                    description: fw.param.string().required()
                }
            }
        },
    },
    {
        method: 'PUT',
        path: '/article/{id}',
        options: {
            handler: ArticlesCtrl.editArticle,
            tags: ['api'],
            validate: {
                payload: {
                    name: fw.param.string().required(),
                    description: fw.param.string().required()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/article/{id}',
        options: {
            handler: ArticlesCtrl.deleteArticle,
            tags: ['api']
        }
    }
];