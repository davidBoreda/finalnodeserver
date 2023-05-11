About shopeee server
NodeJS build server using Express and implementing MVC, REST and CRUD.
Server is connected to MongoDB for CRUD operations.

shopeee provides online shopping platform with clients and products management including order execute
and adding to favorite list by each client.

On server there are 3 levels of users;
1. Open for all
    - unlisted and listed - can view all products
2. Only registered users after login and with providing a valid token;
    - add to favorite
    - view all favorite
    - preform orders
    - view all orders
    - edit personal details
    - change their password
3. Only admin;
    - Create, edit, delete products
    - unblock user

Internal structure and division of the folders in the project

/bin
    www - server configuration
/config
    bcrypt - handles password encryption - create and compare
    jwt - handles token - create and compare
    multer - NOT IS USE - responsible of uploading pictures
/middleware
    mw.IsAdmin - validate admin
    mw.token.auth - validate registered user
/model
    clients.model - client schema and all needed functions required in working with the server
    favorite.model - favorite schema and all needed functions required in working with the server
    mongoDbConnection - connecting to DB
    orders.model - orders schema and all needed functions required in working with the server
    products.model - products schema and all needed functions required in working with the server
/module
    ResponseError - class for unify error messages
/routes
    /api's
        clientAuth - all API's related to the customer
        favoriteRoute - all API's related to favorite list
        ordersRoute - all API's related to orders
        productsRoute - all API's related to Products
    api - Functions as a switchboard that forwards the request according to the URL address
/validation
    validate all data form users before passing using JOI package



Operating and use instructions

After download and unzipping go in terminal
command;
- npm i

    ***create .env file if not exist 

        .env
            DBCONSTR= "mongodb://127.0.0.1:27017/shopeeedb"
            PORT= 3000
            JWTSECERTKEY= "mfnhk;5u-;y93p9340qen5iotbuo'-j4hre;"
            DEBUG="shopeee:*"

- npm run dev - for development environment
- npm start - in production mode

API list and information;
/api
    /client  (all users can access)
1.      /register - POST - must send body in request as a JSON object
        required fields:  {
                            "fName":"",
                            "lName":"",
                            "email":"",
                            "password":"",
                            "age":(optional),
                            "clientAddress": {
                                                "city":"",
                                                "street":"",
                                                "houseNum":""
                                                }
                            }
        You will get back conformation and welcome massage.

2.      /login - POST - must send body in request as a JSON object (only registered client)
        required fields: {
                            "email":" ",
                            "password":" "
                            }
        You will get back a welcome back message AND a token.

3.      /resetpassword - PATCH - must send body in request as a JSON object (only registered client including valid token in headers)
        required fields: {
                            "password":" ",
                            "repeatPassword":" "
                            }
        You will get back - "msg": "password saved successfully"

4.      /editclient - PUT - must send body in request as a JSON object (only registered client including valid token in headers)
        optional fields: { "fName", "lName", "age", "clientAddress": { "city", "street", "houseNum" } }
        *delete fields not in use.
        You will get back - "msg": "client updated"

5.      /unblock - PATCH - must send body in request as a JSON object (only ADMIN)
        required field: {"email":" "} (email of blocked client)
        You will get back - "msg": "Unblocked User ..."

    /favorite
1.      /newfavorite - POST - must send body in request as a JSON object (only registered client including valid token in headers)
        required fields: {clientId:" ", clientName:" ", favoritesId:" "}
        You will get back - "msg": "favorite created"

2.      /addtofavorite - PATCH - must send body in request as a JSON object (only registered client including valid token in headers)
        required fields: {clientId:" ", favoritesId:" " }
        You will get back - "msg": "favorite added"

3.      /showfavorite?clientId= - GET - must send in as a query in URL clientId (only registered client including valid token in headers)
        You will get back - in Json Array of objects each object is a product. 

4.      /showfavorite2 - GET, only registered client including valid token in headers, no need to provide more data.
        You will get back - in Json Array of objects each object is a product.

    /orders
1.      /neworder - POST - must send body in request as a JSON object (only registered client including valid token in headers)
        required fields: {"productId":" "}
        You will get back - in json object with order and client details.

2.      /clientorders - GET, only registered client including valid token in headers, no need to provide more data.
        You will get back - in Json Array of objects each object is a full detailed order.

    /products
1.      /addnewproduct - POST - must send body in request as a JSON object (only ADMIN)
        required fields: {name: , brand: , description: (optional), price: ,stockQuant: ,picture: (not in use),}
        You will get back - msg: "new product added successfully"

2.      /editproduct - PUT - must send body in request as a JSON object (only ADMIN)
        optional fields to update: {name: , brand: , description: , price: ,stockQuant: ,_id: (required),}
        You will get back - msg: "product updated"

3.      /deleteproduct/:id - DELETE - send in params productId (only ADMIN)
        receive back deleted product conformation

4.      /:pageNum/:itemsPerPage/findbyname - GET open to all
        need to pass request pageNum and itemsPerPage as params and as a query - name or brand.
        for exp: products/1/10/findbyname?brand=HP
        shows all Products filtered

5.      /:pageNum/:itemsPerPage - GET open to all
        need to pass request pageNum and itemsPerPage as params
        shows all Products


There are 2 admin accounts
1. david bor dav@gmail.com password - Aa211111!
2. dana horovitz dan@gmail.com password - Aa211111!

all other users password - Aa123456!
