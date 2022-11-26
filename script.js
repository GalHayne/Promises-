let id = 101;

let articles = [
    {id: id++,
    title: `Walmart shooting gunman bought gun hours before deadly rampage and left a "death note" on his phone`
    },
    {
        id:id++,
        title: `U.S. bans imports of Chinese tech from Huawei, ZTE`
    },
    {
        id:id++,
        title: `After upset win over Germany in World Cup, Japanese players leave dressing room "spotless"`
    },
    {
        id:id++,
        title: `article without comments`
    },
    {
        id:id++,
        title: `testComments"`
    }
]

let comments = [
    {
        refernce: articles[2].id,
        Comment: "comment1"
    },
    
    {
        refernce: articles[0].id,
        Comment: "comment2"
    },
    
    {
        refernce: articles[1].id,
        Comment: "comment3"
    },
    {
        refernce: articles[4].id,
        Comment: "comment5"
    },
]

let articlesPromise = new Promise((res,rej) => {
    res(articles);
    rej("Cant load the articles");
})

let commentsPromise = new Promise((res,rej) => {
    res(comments);
    rej("Cant load the comments");
})

let commentsAndRefernce = [];

function getCommentToArticles(arr){
    if (commentsAndRefernce.length === 0){
        arr.forEach(element => {
            commentsAndRefernce.push(element);
        });
        return commentsAndRefernce;

    }else{
        for (i = 0 ; i < arr.length; ++i){
            for (j = 0 ; j < commentsAndRefernce.length; ++j){
                if (arr[i].refernce === commentsAndRefernce[j].id){
                    commentsAndRefernce[j].refernce = arr[i].Comment;
                }
            }
        }
    }
    return commentsAndRefernce;
}



function printToHTML(arr){
    let elComments = document.querySelector('.comments');
    elStr = "";

    arr.forEach(element => {
        if (element.refernce){
            elStr +=  `<p>The article: <span> ${element.title} </span> get comment: <span> ${element.refernce} </span> </p>`
        }
        else{
            elStr +=  `<p>The article: <span> ${element.title} </span>doesn't get comment</p>`
            
        }
    });

    elComments.innerHTML = elStr;
}

articlesPromise
.then((getCommentToArticles))
.then(commentsPromise.then(getCommentToArticles))
.then(printToHTML);