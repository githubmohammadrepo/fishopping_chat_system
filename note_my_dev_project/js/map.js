var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session'); //To Acquire it
var methodOverride = require('method-override');
const hbs = require('hbs');
const { User, UserGroup, GroupAccess, UserProvinceTable } = require('./models/index');
var helpers = require('handlebars-helpers')({ hbs: hbs });
const { Op } = require("sequelize");
const { get_clients_by_room, findClientsSocket } = require('./helpers/socketHelpers');

// api routers
var indexRouter = require('./routes/api/index');
var usersRouter = require('./routes/api/users');
var authRouter = require('./routes/api/auth');
var testRouter = require('./routes/api/test');

//admin routers
const authAdmin = require('./routes/admin/auth');
const groupAdmin = require('./routes/admin/group');
const groupAccessAdmin = require('./routes/admin/groupAccess');
const dashboardAdmin = require('./routes/admin/dashboard');
const { Server } = require("socket.io");
const http = require('http');


var app = express();
const server = http.createServer(app);
const io = new Server(3001, server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    credentials: false
});

require('socketio-auth')(io, {
    authenticate: async function(socket, data, callback) {
        try {
            console.log('authentication')
                //get credentials sent by the client
            var username = data.username;
            var password = data.password;
            var province_name = data.province_name;


            //find province id
            let user_province = await UserProvinceTable.findOne({
                where: {
                    province_name: province_name
                },
                attributes: ['id', 'province_name']
            })
            user_province_id = user_province.id;

            //    find user
            User.findOne({
                where: {
                    username: username,
                    province_table_id: user_province_id,

                },
                include: {
                    model: UserGroup,
                    attributes: ['id', 'name'],
                    include: {
                        model: GroupAccess,
                        as: 'watchingGroupAccess',
                        attributes: ['watching_group_id']
                    }
                }
            }).then(async user => {
                socket.join("room_" + user.UserGroup.name);


                //update user for set socket id
                user.socketId = socket.id;
                user = await user.save();


                //find accessed groups or rooms
                let audienceRooms = await UserGroup.findAll({
                    where: {
                        id: {
                            [Op.in]: user.UserGroup.watchingGroupAccess.map(v => {
                                return v.watching_group_id;
                            })
                        }
                    },
                    attributes: ['name']
                });




                if (!user) return callback(new Error("User not found"));
                socket.handshake.query.user = {
                    username: user.username,
                    groupName: user.UserGroup.name,
                    province_name: user_province.province_name

                };


                if (audienceRooms.length) {
                    let myOnlineClients = [];

                    let clients = await Promise.all(audienceRooms.map(room => {
                        return findClientsSocket(io, 'room_' + room.name);
                    }))

                    clients.forEach(client => {
                        let roomClients = client.map(user => {
                            return {
                                id: user.id,
                                username: user.handshake.query.user.username,
                                groupName: user.handshake.query.user.groupName,
                                province_name: user.handshake.query.user.province_name,
                                isMe: user.id == socket.id
                            }
                        });
                        myOnlineClients = myOnlineClients.concat(roomClients)
                    })



                    socket.emit('onlineUsers', {

                        data: {
                            users: myOnlineClients
                        },
                        status: {
                            type: 'success'
                        },
                        sender: {
                            id: socket.id,
                            // username: user.username
                        }
                    });
                }

                //inform the callback of auth success/failure
                return callback(null, user.password == password);
            }).catch((err) => {
                return callback(new Error("User not found"));

            })
        } catch (error) {
            console.log('authenticatin failed')
            callback(new Error('user forbidden'))
        }
    }
});

io.on('connection', (socket) => {
    console.log('connection')
        // make user online
        // io.sockets.sockets.get(socket.id).emit('publicMessage', 'finded socket id hi')

    // socket.on("private message", (anotherSocketId, msg) => {
    //     socket.to(anotherSocketId).emit("private message", socket.id, msg);
    // });
    const onlineSockets = (findClientsSocket(io, 'room_consumer'))

    //sent all online client as  message for myself



    //send public message based on access group defined in databse
    socket.on('publicMessage', function(message) {
        User.findOne({
                where: { socketId: socket.id },
                attributes: ['id'],

                include: {
                    model: UserGroup,
                    attributes: ['id'],
                    include: {
                        model: GroupAccess,
                        as: 'watchingGroupAccess',
                        attributes: ['watching_group_id']
                    }
                }
            }).then(async user => {

                let audienceRooms = await UserGroup.findAll({
                    where: {
                        id: {
                            [Op.in]: user.UserGroup.watchingGroupAccess.map(v => {
                                return v.watching_group_id;
                            })
                        }
                    },
                    attributes: ['name']
                });


                // io.emit('publicMessage', { message: tradeMsg, audienceUser });
                if (audienceRooms.length) {
                    audienceRooms.forEach(room => {
                        io.sockets.in("room_" + room.name).emit('publicMessage', {
                            data: {
                                message: message.data.message
                            },
                            status: {
                                type: 'success'
                            },
                            sender: {
                                id: socket.id,
                                username: message.sender.username
                            }
                        });
                    })
                }
                // socket.to(user.socketId).emit("publicMessage", socket.id, {
                //     user: user,
                //     message: tradeMsg
                // });


            })
            .catch(error => {
                io.sockets.to(socket.id).emit('publicMessage', {
                    data: {
                        message: "some message"
                    },
                    status: {
                        type: 'error'
                    },
                    sender: {
                        id: null,
                        username: null
                    }
                });

            })
    });


    socket.on("disconnecting", (reason) => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                socket.to(room).emit("publicMessage", {
                    data: {
                        message: "left the connection"
                    },
                    status: {
                        type: 'success'
                    },
                    sender: {
                        id: socket.id,
                        username: null
                    }
                });
            }
        }
    });



    socket.on("disconnect", (reason) => {
        //remove client from database
        console.log('disconnnect')
    });



});


io.on('connect_failed', function() {
    document.write("Sorry, there seems to be an issue with the connection!");
})
io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});


// view engine setup
hbs.registerPartials(__dirname + '/views/partials', function(err) {});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'mohammad',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, path: '/', maxAge: 60000 }
}))

app.use(express.static(path.join(__dirname, 'public')));
// override with the X-HTTP-Method-Override header in the request
// app.use(methodOverride('X-HTTP-Method-Override'))

app.use(methodOverride('_method'))

// api routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/test', testRouter);


// admin routers

app.use('/admin/auth', authAdmin)
app.use('/admin/group', groupAdmin)
app.use('/admin/group', groupAdmin)
app.use('/admin/groupAccess', groupAccessAdmin);
app.use('/admin/dashboard', dashboardAdmin);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    // next(createError(404));
    res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log(err.status)
    console.log(err)
    res.status(err.status || 500);
    res.render('500');
});

module.exports = app;