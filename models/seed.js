
// everytime the app runs this function makes some dummy data like posts, comments, quotes.

const Post = require('./blog');
const Comment = require('./comment');
const Quote = require('./quote');

const seedPost = {title: 'It\'s a dummy post',
    author: 'Ashraf Bawer',
    body:'               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos magni iste vitae accusamus aspernatur aliquam illo laudantium recusandae a cum labore adipisci, tenetur veritatis sed neque ea amet quam eligendi.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos magni iste vitae accusamus aspernatur aliquam illo laudantium recusandae a cum labore adipisci, tenetur veritatis sed neque ea amet quam eligendi.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos magni iste vitae accusamus aspernatur aliquam illo laudantium recusandae a cum labore adipisci, tenetur veritatis sed neque ea amet quam eligendi.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos magni iste vitae accusamus aspernatur aliquam illo laudantium recusandae a cum labore adipisci, tenetur veritatis sed neque ea amet quam eligendi.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos magni iste vitae accusamus aspernatur aliquam illo laudantium recusandae a cum labore adipisci, tenetur veritatis sed neque ea amet quam eligendi.',
    img: 'address book outline icon',
    intro: '              Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}

    
const seedComment = {
    author: 'Nicolas Cage',
    body: 'This is a dummy comment',
}

const seedQuotes = [
    {author: 'Someone wise probably',
    body: 'Everything has an end and a begining'},
    {author: 'Charlie Brwon',
    body: 'Keep looking up. that\'s the secret of life'},
    {author: 'A wise man',
    body: 'The way I see it, if you want rainbow you have to put up with rain'},
]

function seedDB(){
    Post.deleteMany({}, (err)=> {
        if(err){
            return err;
        }
        console.log('removed data');

        for(let i=0; i<=10; i++){
            Post.create(seedPost, (err, post) => {
                if(err) return err;
                Comment.create(seedComment, (err,comment) => {
                    if(err) return err;
                    post.comments.push(comment);
                    post.save();
                });
            });
        }

        for(let i=0; i<=seedQuotes.length; i++){
            Quote.create(seedQuotes[i], (err,data) => {
                if(err) return err;
            })
        }
    });
}

module.exports = seedDB;