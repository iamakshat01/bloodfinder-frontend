// Routes for /donor

// get(/donor)

res = {
    users
}

// post(/donor/register)

req.body = {
    "name" : "",
    "username" : "",
    "password" : "",
    "phone" : "",
    "email" : "",
    "blood_group" : "",
    "location": {
        "type": "Point", //optional
        "coordinates": [longitude, latitude]
    },
    birth_date: ""
}

res = {token, donor};

// post(/donor/login)

req.body = {
    "username" : "",
    "password" : ""
}

res = { id, username, token}

// get(/donor/logout)

res = {
    message: "You hav signed out"
}


// Routes for /med

// get(/med)

res = {
    users
}

// post(/med/search)

req.body = {
    "blood" : "",
    "mxdist" : Number
}

res = {
    availdonors : []
}

// post(/med/register)

req.body = {
    "name" : "",
    "username" : "",
    "password" : "",
    "phone" : "",
    "email" : "",
    "location" : {
        "type" : "Point",
        "coordinates" : [longitude, latitude]
    }
}

res = {
    token, medOrg
}

// post(/med/login)

req.body = {
    "username" : "",
    "password" : ""
}

res = {
    id, username, token
}

// get(/med/logout)

res = {
    message : "You have signed out."
}

// get(/med/requests)

res = {
    response : reqs
}

// post(/med/requests/generate)

req.body = {
    "blood_group" : "",
    "units" : Number,
    "donors_list" : [DonorIDs]
}

res = {
    response: "Request has been successfully created."
}

// get(/requests/:req_id)

res = {
    response : request
}

// delete(/requests/:req_id)

res = {
    response : "Request has been successfully deleted."
}

// get(/requests/:req_id/responses)

res = {
    response : [
        {
            status: "",
            donors: [Donor]
        }
    ]
}

