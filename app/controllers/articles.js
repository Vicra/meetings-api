//====================
// Dependencies
//====================
const articlesService = fw.getService('articles');

//====================
// Methods
//====================
function getArticles(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let response = {
            data: await articlesService.getArticles()
        };
        resolve(response);
    }); 
}

function getArticleById(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        if(isNaN(request.params.id))
        {
            let stResponse = {
                success:false,
                message:'Parameter id is not a number'
            };
            resolve(stResponse);
        }

        let response = {
            data:await articlesService.getArticleById(request.params.id)
        };
        resolve(response);
    }); 
}

function addArticle(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const article = await articlesService.getArticleByName(request.payload.name);
        if(article.length > 0)
        {
            stResponse.message = "Article already exist";
            resolve(stResponse);
            return;
        }

        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description
        }
    
        await articlesService.addArticle(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}


function editArticle(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const article = await articlesService.getArticleById(request.params.id);
        if(article.length != 1)
        {
            stResponse.message = "Article does not exist";
            resolve(stResponse);
            return;
        }

        //Make sure he is not adding an already existing email
        if(request.payload.name != article[0].name)
        {
            const articleExists = await articlesService.getArticleByName(request.payload.name);
            if(articleExists.length > 0 && articleExists.name == request.payload.name)
            {
                stResponse.message = "Article name is already in use.";
                resolve(stResponse);
                return;
            }    
        }
        
        const Params = 
        {
            name: request.payload.name,
            description: request.payload.description,
            id: request.params.id
        }
    
        await articlesService.updateArticle(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

function deleteArticle(request, h)
{
    return fw.promise(async (resolve,reject) => 
    {
        if(isNaN(request.params.id))
        {
            let stResponse = {
                success:false,
                message:'Parameter id is not a number'
            };
            resolve(stResponse);
        }
        
        let stResponse = {success:false,message:''};
        const article = await articlesService.getArticle(request.params.id);
        if(article.length != 1)
        {
            stResponse.message = "Article does not exist";
            resolve(stResponse);
            return;
        }

        await articlesService.deleteArticle(request.params.id);
        stResponse.success = true;
        resolve(stResponse);        
    });    
}

module.exports = 
{
    getArticles,
    getArticleById,
    addArticle,
    editArticle,
    deleteArticle
}