
const postmodel = require('../models/post');

const getPosts =  async (req, res) => {
    let data = await postmodel.getJsonData();
    res.json(data);
};

const createPost = async (req, res) => {
    let data ;
    if (!req.body.title || !req.body.content) {
        res.status(400).json({error: 'title and content are required'});   
    }

    try{
     data = await postmodel.getJsonData();
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'error'});
    }

    let newId = data.length + 1;
    const post = req.body;
    post.id = newId;
    data.push(post);
    try {
        await postmodel.postJsonData(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'error'});
    }   
    res.json('data added');
};

const updatePost = async (req, res) => {
    const {id} = req.params;
    //update handeling
    let toUpdata = await postmodel.getJsonData();
    let toUpPostIndex = toUpdata.indexOf(toUpdata.find((post) => post.id === parseInt(id)));
    toUpdata[toUpPostIndex] = req.body;

    await postmodel.postJsonData(toUpdata);
    res.json(toUpdata);
};

const deletePost = async (req, res) => {
    const {id} = req.params;
    const data = await postmodel.getJsonData();
    let toDelete = data.filter((post) => post.id !== parseInt(id));
    await postmodel.postJsonData(toDelete);
    res.json(toDelete);
};


module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
};