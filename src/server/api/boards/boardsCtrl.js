const router = require("express").Router();


const boardModel = require('./../../models/boards');


router.route('/').get(async (req, res, next) => { 
    const email = req.user[0].email;
    const boards = await boardModel.find({ email: email }, { __v: 0, _id: 0 });
    console.log(boards);
    res.send(boards);
});

router.route('/:id').get(async (req, res, next) => {
    const email = req.user[0].email;
    const { id } = req.params;
    console.log(email);
    const idData = await boardModel.find({ email: email, id: id }, { __v: 0, _id: 0 });
    res.send(idData[0]);
});

router.route('/newboard').post(async (req, res, next) => {
    console.log('........')
    try {
        const email = req.user[0].email;
        console.log(email);
        const idData = await boardModel.find({ email: email });
        const id = idData.length + 1;
        console.log(id);

        const boardData = new boardModel({
            id,
            email,
            board_name: 'Untitled Board'
        });

        const data = await boardData.save().catch((err) => {
            console.log(err);
            res.status(504).json({
                errMsg: "internal server error",
                status: 504
            })
        });
        if (data.length != 0) {
            console.log(data);
            res.send(data);
        }
    } catch (error) {
        console.log(error);
    }
    

});

module.exports = router;



// const board = {
//     "name": "Untitled Board",
//     "uri": "untitled-board",
//     "id": "355ad979",
//     "settings": {
//         "color": "",
//         "subscribed": true,
//         "cardCoverImages": true
//     },
//     "lists": [],
//     "cards": [],
//     "members": [
//         {
//             "id": "56027c1930450d8bf7b10758",
//             "name": "Alice Freeman",
//             "avatar": "assets/images/avatars/alice.jpg"
//         },
//         {
//             "id": "26027s1930450d8bf7b10828",
//             "name": "Danielle Obrien",
//             "avatar": "assets/images/avatars/danielle.jpg"
//         },
//         {
//             "id": "76027g1930450d8bf7b10958",
//             "name": "James Lewis",
//             "avatar": "assets/images/avatars/james.jpg"
//         },
//         {
//             "id": "36027j1930450d8bf7b10158",
//             "name": "John Doe",
//             "avatar": "assets/images/avatars/Velazquez.jpg"
//         }
//     ],
//     "labels": [
//         {
//             "id": "26022e4129ad3a5sc28b36cd",
//             "name": "High Priority",
//             "class": "bg-red text-white"
//         },
//         {
//             "id": "56027e4119ad3a5dc28b36cd",
//             "name": "Design",
//             "class": "bg-orange text-white"
//         },
//         {
//             "id": "5640635e19ad3a5dc21416b2",
//             "name": "App",
//             "class": "bg-blue text-white"
//         },
//         {
//             "id": "6540635g19ad3s5dc31412b2",
//             "name": "Feature",
//             "class": "bg-green text-white"
//         }
//     ]
// };
