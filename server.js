<<<<<<< HEAD


const express = require('express');
const app = express();

const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server)



const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');



const User = require('./models/User');
const UserPhoto = require('./models/UserPhoto');
const UserAudio = require('./models/UserAudio');
const Item = require('./models/Item');
const ItemImage = require('./models/ItemImage');
const SpreadChat = require('./models/SpreadChat');
const userBackgroundImage = require('./models/UserBackgroundImage');
const Zone = require('./models/Zone');
const SubZone = require('./models/SubZone');
const Bug = require('./models/Bug');


require('./config/passport')(passport);



// Favicon
app.use(favicon(path.join(__dirname, 'public', 'images/system/widespread_logo_1a1a1a.ico')))

// DB Config
const db = require('./config/keys').MongoURI;
// const { ensureAuthenticated } = require('./config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(function () {

            io.on("connect", async (socket) => {
                console.log(`connect ${socket.id}`);
                /* 
                Jon Olson: P0Idtb5ebM0eV8hlAAAB
                            --AN6rvnuFUcRqYHAAAD
                Beta Tester: v18zGU4jxWY7ke8OAAAD
                
                */

                // when the client emits 'new message', this listens and executes
                socket.on('new message', async (data) => {
                    // we tell the client to execute 'new message'
                    socket.broadcast.emit('new message', (data));
                    const dataId = data.chatIdForm
                    const messageData = {
                        sent_by: data.sendingUserId,
                        message: data.message
                    }


/*                     const thisid = data.id
                    console.log('thisid: ', id)
                    const thisChatSentBy = data.sent_by
                    console.log('thisChatSentBy: ', thisChatSentBy)
                    const thisChatMessage = data.message
                    console.log('thisChatMessage: ', thisChatMessage) */
                    await SpreadChat.findByIdAndUpdate(dataId,
                        { $addToSet: { conversation: messageData } },
                        { safe: true, upsert: true },
                        function (err, doc) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(doc)
                                return
                            }
                        }
                    )
                    
                });


                socket.on("ping", (cb) => {
                    console.log("ping");
                    cb();
                });

                socket.on("disconnect", () => {
                    console.log(`disconnect ${socket.id}`);
                });
            });

            console.log('MongoDB Connected...');
        })
    .catch(err => console.log(err));

io.on('connection', socket => {

    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        console.log('Room ID: ', roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
        console.log('User Connected: ', userId)

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})



// Middleware
app.use(bodyParser.json());

// Static
app.use(express.static('public'));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Method Override
// Connect Flash
app.use(flash());


app.use(async (req, res, next) => {
    const allZones = await Zone.find()
    let zones = []
    allZones.forEach(zone => {
        zones.push(zone)
    })
    next()
})



/* app.use(async (req, res, next) => {
    const userId = req.user || null
    if (userId) {
        const user = await User.findById(userId.id).populate('friends').exec()
        user.friends.forEach(friend => {
            console.log('FRIEND: ', friend.fname)

        })
    }
})
 */
// Global Variables
app.use((req, res, next) => {
    // const userData = User.findById(req.user).populate('friends').exec()
    // console.log(userData)
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null
    res.locals.zones = Zone.find()
    res.locals.spreadChats = req.spreadChats || null

    next();
})

// Multer
let gfs;

//Init gfs
const conn = mongoose.createConnection(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');

    
})

//Create storage object
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = req.user.lname + '-' + req.user.fname + '_' + req.user._id + '_' + buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });




/* SOCKETS */
/* 



io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('disconnect', () => {
        console.log('user disconected')
    })

    socket.on('chat message', (msg, sentBy) => {
        const message = {
            body: msg,
            sent_by: sentBy,

        };
        console.log('MESSAGE: ', message)
            socket.to(to).to(socket.userID).emit("private message", message);
            messageStore.saveMessage(message);


        console.log('Message: ', msg)
        console.log('Sent BY: ', sentBy)

        io.emit('chat message', { body: msg, sent_by: sentBy });

    })

    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data)
    })
})

 */



// Routes
app.use('/', require('./routes/index'));
app.use('/search', require('./routes/search'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));
app.use('/ar', require('./routes/ar'));
app.use('/socialspread', require('./routes/socialspread'));
app.use('/academy', require('./routes/academy'));
app.use('/business', require('./routes/business'));
app.use('/entertainment', require('./routes/entertainment'));
app.use('/news', require('./routes/news'));
app.use('/wellness', require('./routes/wellness'));
app.use('/things', require('./routes/things'));
app.use('/help', require('./routes/help'));
app.use('/vr', require('./routes/vr'));
app.use('/flexfloor', require('./routes/flexfloor'));
app.use('/chat', require('./routes/chat'));
app.use('/spreadshield-dash', require('./routes/spreadshield-dash'));
// app.use('/vr/academy', require('./routes/vr/academy'));



app.get('/zones', async (req, res) => {
    const zones = await Zone.find()
    res.render('zones/home', {zones})
})


app.post('/zones/create', async (req, res) => {
    const zoneData = req.body
    console.log('zoneData: ', zoneData)
    const newZone = new Zone(zoneData)
    newZone.save()
    res.redirect('/zones')
})

app.get('/zones/id/:zoneId', async (req, res) => {
    const zoneId = req.params.zoneId
    const zone = await Zone.findById(zoneId)
    const subZones = await SubZone.find({zone: zoneId})
    console.log(zone)
    res.render('zones/sub-zones', { zone, subZones })
})


app.post('/zones/id/:zoneId/sub-zone/create', async (req, res) => {
    const zoneId = req.params.zoneId
    const subZoneData = req.body
    console.log('zoneData: ', subZoneData)
    const newSubZone = new SubZone(subZoneData)
    newSubZone.save()
    res.redirect(`/zones/id/${zoneId}`)
})
/* Profile Image Upload */
app.patch('/upload-avatar', upload.single('user_profile_image'), (req, res) => {
    const imageOwner = req.user._id;
    const obj = {
        imageOwner: req.user._id,
        img: {
            data: req.file.filename,
            contentType: 'image/png'
        }
    }
    userBackgroundImage.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            console.log(`Image Owner: ${imageOwner} Image Data: ${obj.img.data}`);
            const newImage = obj.img.data;
            User.findByIdAndUpdate(imageOwner,
                { user_avatar: req.file.filename },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                    } else {
                        return
                    }
                }
            )
            res.redirect(`/users/dashboard`);
        }
    })
});

app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if Files
        if (!files || files.lenth === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files do exist
        console.log(files)
        return res.render('all-images', { files })
    })
})

app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }

        // Files do exist
        return res.render('single-image-file', { file })
    })
})

app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }

        // Files do exist
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read the output to the stream
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            })
        }
    })
});


/* Background Image Upload */
app.patch('/upload-item-image/:companyId/:itemId', upload.single('item_image'), (req, res) => {
    const itemId = req.params.itemId;
    const companyId = req.params.companyId;
    const obj = {
        for_item: itemId,
        img: {
            data: req.file.filename,
            contentType: 'image/png'
        }
    }
    ItemImage.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            console.log(`For Item: ${itemId} Image Data: ${obj.img.data}`);
            const newImage = obj.img.data;
            Item.findByIdAndUpdate(itemId,
                { $push: { item_images: req.file.filename } },
                { safe: true, upsert: true },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                    } else {
                        return
                    }
                }
            )
            res.redirect(`/business/admin/${companyId}/manage/store/item/${itemId}`);
        }
    })
});




/* AUDIO FILES */




app.post('/upload-user-audio', upload.single('audio'), async (req, res) => {
    audio_owner = req.user._id;
    const obj = {
        audio_owner: req.user._id,
        album: req.body.album,
        song: req.body.song,
        artist: req.body.artist,
        genre: req.body.genre,
        tags: req.body.tags,
        img: {
            data: req.file.filename,
            contentType: 'audio/mp3'
        }
    }
    console.log(req.file.filename)
    await UserAudio.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            console.log(`Audio Owner: ${audio_owner} Audio Data: ${req.file}`);
            User.findByIdAndUpdate(audio_owner,
                { $push: { user_audio: req.file.filename } },
                { safe: true, upsert: true },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                    } else {
                        return
                    }
                }
            )
            res.redirect(req.get('referer'));
        }
    })
});


app.get('/audio/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }
        // Files do exist
        if (file.contentType === 'audio/mpeg' || file.contentType === 'audio/ogg' || file.contentType === 'audio/mp3') {
            // Read the output to the stream
            const readstream = gfs.createReadStream(file.filename);
            return readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an audio file'
            })
        }
        // Files do exist
        return res.render('single-audio-file', { file })
    })
})


app.get('/audio/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }

        // Files do exist
        if (file.contentType === 'audio/mp3') {
            // Read the output to the stream
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
            console.log(res)
        } else {
            res.status(404).json({
                err: 'Not an audio file'
            })
        }
    })
});


app.delete('/delete-image/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    console.log(`File ID being deleted: ${fileId}`);
    gfs.remove({ _id: fileId, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        } else {
            res.redirect('/files')
        }
    });
    });

app.post('/bug-report', async (req, res) => {
    const data = req.body
    const newBug = new Bug(data)
    newBug.save()
    res.redirect(`${req.body.refering_page}`);
})

// 404 Page
app.use(async function (req, res) {
    res.status(400);
    const referer = req.headers.referer
    console.log(referer)
    res.render('404', { title: '404: File Not Found', referer });
});





const PORT = process.env.PORT || 3000;
server.listen(PORT, console.log(`Server started on http://localhost:${PORT}/users/login`))
=======


const express = require('express');
const app = express();

const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server)



const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');



const User = require('./models/User');
const UserPhoto = require('./models/UserPhoto');
const UserAudio = require('./models/UserAudio');
const Item = require('./models/Item');
const ItemImage = require('./models/ItemImage');
const SpreadChat = require('./models/SpreadChat');
const userBackgroundImage = require('./models/UserBackgroundImage');
const Zone = require('./models/Zone');
const SubZone = require('./models/SubZone');
const Bug = require('./models/Bug');


require('./config/passport')(passport);



// Favicon
app.use(favicon(path.join(__dirname, 'public', 'images/system/widespread_logo_1a1a1a.ico')))

// DB Config
const db = require('./config/keys').MongoURI;
// const { ensureAuthenticated } = require('./config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(function () {

            io.on("connect", async (socket) => {
                console.log(`connect ${socket.id}`);
                /* 
                Jon Olson: P0Idtb5ebM0eV8hlAAAB
                            --AN6rvnuFUcRqYHAAAD
                Beta Tester: v18zGU4jxWY7ke8OAAAD
                
                */

                // when the client emits 'new message', this listens and executes
                socket.on('new message', async (data) => {
                    // we tell the client to execute 'new message'
                    socket.broadcast.emit('new message', (data));
                    const dataId = data.chatIdForm
                    const messageData = {
                        sent_by: data.sendingUserId,
                        message: data.message
                    }


/*                     const thisid = data.id
                    console.log('thisid: ', id)
                    const thisChatSentBy = data.sent_by
                    console.log('thisChatSentBy: ', thisChatSentBy)
                    const thisChatMessage = data.message
                    console.log('thisChatMessage: ', thisChatMessage) */
                    await SpreadChat.findByIdAndUpdate(dataId,
                        { $addToSet: { conversation: messageData } },
                        { safe: true, upsert: true },
                        function (err, doc) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(doc)
                                return
                            }
                        }
                    )
                    
                });


                socket.on("ping", (cb) => {
                    console.log("ping");
                    cb();
                });

                socket.on("disconnect", () => {
                    console.log(`disconnect ${socket.id}`);
                });
            });

            console.log('MongoDB Connected...');
        })
    .catch(err => console.log(err));

io.on('connection', socket => {

    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        console.log('Room ID: ', roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
        console.log('User Connected: ', userId)

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})



// Middleware
app.use(bodyParser.json());

// Static
app.use(express.static('public'));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Method Override
// Connect Flash
app.use(flash());


app.use(async (req, res, next) => {
    const allZones = await Zone.find()
    let zones = []
    allZones.forEach(zone => {
        zones.push(zone)
    })
    next()
})



/* app.use(async (req, res, next) => {
    const userId = req.user || null
    if (userId) {
        const user = await User.findById(userId.id).populate('friends').exec()
        user.friends.forEach(friend => {
            console.log('FRIEND: ', friend.fname)

        })
    }
})
 */
// Global Variables
app.use((req, res, next) => {
    // const userData = User.findById(req.user).populate('friends').exec()
    // console.log(userData)
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null
    res.locals.zones = Zone.find()
    res.locals.spreadChats = req.spreadChats || null

    next();
})

// Multer
let gfs;

//Init gfs
const conn = mongoose.createConnection(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');

    
})

//Create storage object
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = req.user.lname + '-' + req.user.fname + '_' + req.user._id + '_' + buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });




/* SOCKETS */
/* 



io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('disconnect', () => {
        console.log('user disconected')
    })

    socket.on('chat message', (msg, sentBy) => {
        const message = {
            body: msg,
            sent_by: sentBy,

        };
        console.log('MESSAGE: ', message)
            socket.to(to).to(socket.userID).emit("private message", message);
            messageStore.saveMessage(message);


        console.log('Message: ', msg)
        console.log('Sent BY: ', sentBy)

        io.emit('chat message', { body: msg, sent_by: sentBy });

    })

    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data)
    })
})

 */



// Routes
app.use('/', require('./routes/index'));
app.use('/search', require('./routes/search'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'));
app.use('/ar', require('./routes/ar'));
app.use('/socialspread', require('./routes/socialspread'));
app.use('/academy', require('./routes/academy'));
app.use('/business', require('./routes/business'));
app.use('/entertainment', require('./routes/entertainment'));
app.use('/news', require('./routes/news'));
app.use('/wellness', require('./routes/wellness'));
app.use('/things', require('./routes/things'));
app.use('/help', require('./routes/help'));
app.use('/vr', require('./routes/vr'));
app.use('/flexfloor', require('./routes/flexfloor'));
app.use('/chat', require('./routes/chat'));
app.use('/spreadshield-dash', require('./routes/spreadshield-dash'));
// app.use('/vr/academy', require('./routes/vr/academy'));



app.get('/zones', async (req, res) => {
    const zones = await Zone.find()
    res.render('zones/home', {zones})
})


app.post('/zones/create', async (req, res) => {
    const zoneData = req.body
    console.log('zoneData: ', zoneData)
    const newZone = new Zone(zoneData)
    newZone.save()
    res.redirect('/zones')
})

app.get('/zones/id/:zoneId', async (req, res) => {
    const zoneId = req.params.zoneId
    const zone = await Zone.findById(zoneId)
    const subZones = await SubZone.find({zone: zoneId})
    console.log(zone)
    res.render('zones/sub-zones', { zone, subZones })
})


app.post('/zones/id/:zoneId/sub-zone/create', async (req, res) => {
    const zoneId = req.params.zoneId
    const subZoneData = req.body
    console.log('zoneData: ', subZoneData)
    const newSubZone = new SubZone(subZoneData)
    newSubZone.save()
    res.redirect(`/zones/id/${zoneId}`)
})
/* Profile Image Upload */
app.patch('/upload-avatar', upload.single('user_profile_image'), (req, res) => {
    const imageOwner = req.user._id;
    const obj = {
        imageOwner: req.user._id,
        img: {
            data: req.file.filename,
            contentType: 'image/png'
        }
    }
    userBackgroundImage.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            console.log(`Image Owner: ${imageOwner} Image Data: ${obj.img.data}`);
            const newImage = obj.img.data;
            User.findByIdAndUpdate(imageOwner,
                { user_avatar: req.file.filename },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                    } else {
                        return
                    }
                }
            )
            res.redirect(`/users/dashboard`);
        }
    })
});

app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if Files
        if (!files || files.lenth === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files do exist
        console.log(files)
        return res.render('all-images', { files })
    })
})

app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }

        // Files do exist
        return res.render('single-image-file', { file })
    })
})

app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }

        // Files do exist
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read the output to the stream
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            })
        }
    })
});


/* Background Image Upload */
app.patch('/upload-item-image/:companyId/:itemId', upload.single('item_image'), (req, res) => {
    const itemId = req.params.itemId;
    const companyId = req.params.companyId;
    const obj = {
        for_item: itemId,
        img: {
            data: req.file.filename,
            contentType: 'image/png'
        }
    }
    ItemImage.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            console.log(`For Item: ${itemId} Image Data: ${obj.img.data}`);
            const newImage = obj.img.data;
            Item.findByIdAndUpdate(itemId,
                { $push: { item_images: req.file.filename } },
                { safe: true, upsert: true },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                    } else {
                        return
                    }
                }
            )
            res.redirect(`/business/admin/${companyId}/manage/store/item/${itemId}`);
        }
    })
});




/* AUDIO FILES */




app.post('/upload-user-audio', upload.single('audio'), async (req, res) => {
    audio_owner = req.user._id;
    const obj = {
        audio_owner: req.user._id,
        album: req.body.album,
        song: req.body.song,
        artist: req.body.artist,
        genre: req.body.genre,
        tags: req.body.tags,
        img: {
            data: req.file.filename,
            contentType: 'audio/mp3'
        }
    }
    console.log(req.file.filename)
    await UserAudio.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            console.log(`Audio Owner: ${audio_owner} Audio Data: ${req.file}`);
            User.findByIdAndUpdate(audio_owner,
                { $push: { user_audio: req.file.filename } },
                { safe: true, upsert: true },
                function (err, doc) {
                    if (err) {
                        console.log(err)
                    } else {
                        return
                    }
                }
            )
            res.redirect(req.get('referer'));
        }
    })
});


app.get('/audio/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }
        // Files do exist
        if (file.contentType === 'audio/mpeg' || file.contentType === 'audio/ogg' || file.contentType === 'audio/mp3') {
            // Read the output to the stream
            const readstream = gfs.createReadStream(file.filename);
            return readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an audio file'
            })
        }
        // Files do exist
        return res.render('single-audio-file', { file })
    })
})


app.get('/audio/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if Files
        if (!file || file.lenth === 0) {
            return res.status(404).json({
                err: 'That file does not exist'
            });
        }

        // Files do exist
        if (file.contentType === 'audio/mp3') {
            // Read the output to the stream
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
            console.log(res)
        } else {
            res.status(404).json({
                err: 'Not an audio file'
            })
        }
    })
});


app.delete('/delete-image/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    console.log(`File ID being deleted: ${fileId}`);
    gfs.remove({ _id: fileId, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        } else {
            res.redirect('/files')
        }
    });
    });

app.post('/bug-report', async (req, res) => {
    const data = req.body
    const newBug = new Bug(data)
    newBug.save()
    res.redirect(`${req.body.refering_page}`);
})

// 404 Page
app.use(async function (req, res) {
    res.status(400);
    const referer = req.headers.referer
    console.log(referer)
    res.render('404', { title: '404: File Not Found', referer });
});





const PORT = process.env.PORT || 3000;
server.listen(PORT, console.log(`Server started on http://localhost:${PORT}/users/login`))
>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
