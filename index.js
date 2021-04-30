
const { app } = require('./core');
const { db, update } = require('./db')
const port = 3030
// I changed the port to 3030 beacuse port 3000 has crached whole time.  

app.listen(port, () => {
    console.log(`API for smart home is running in port ${port}.`)
})


/* CODE YOUR API HERE */

// By knowing CRUD Methos, (Get, Post, puth, Patch and Delete Method), I used Get (for read )& Patch method in this assingment. 
// for updating the statue we can use Patch Method, however Get Methos is working by giving an extra or specefic id

app.get('/ac/on', (req, res, next) => {
    db
        .get('devices')
        .find({ id: "AC1" })
        .assign({ on: true })
        .value();
    update();
    res.send('the AC is on')
    next()
    res.status(200).json({
        status: 'On',
        messag: 'AC is on Now!'
    })

})

app.get('/ac/off', (req, res) => {
    db
        .get('devices')
        .find({ id: "AC1" })
        .assign({ on: false })
        .value();
    update();
    res.send('the AC is off')
})

 // Another option is using Patch Method! 
//Update with PATCH Method
app.patch('/ac/off', (req, res) => {
    db
        .get('devices')
        .find({ id: 'AC1' })
        .assign({ off: true }) // Turn off the device
        .value();

    update(); // tell frontend to update state.

    res.send('AC is off NOW ! ')
})

///// Blind living room ////////////   
app.get('/blindLivingR', (req, res) => {
    db
        .get('devices')
        .find({ id: 'BLI1' })
        .assign({ on: true }) // Turn on the device
        .value();
    update(); // tell frontend to update state.

    res.status(200).json({
        status: 'Down',
        messag: 'Blind in Living Room is going down now!'
    })

})
//Update with PATCH Method////// 

app.patch('/blindLivingR/:id', (req, res) => {
    db
    .get('devices')
    .find({ id: 'BLI1' })
    .assign({ on: false }) // Turn off the device
    .value();

update(); // tell frontend to update state.

res.status(200).json({
    status:'Up',
    messag:'Blind in Living Room is going Up Now!'
})

})

// // //// Living Room Light

app.get('/lightlLivingRoom', (req, res) => {
    db
        .get('devices')
        .find({ id: 'LIG2' })
        .assign({ on: true, brightness: 0.08 }) //Turn on the device
        .value();

    update(); // tell frontend to update state.

    res.status(200).json({
        status: 'On', 
        messag:'Trun on the lapm in living room!'
    })
})
app.patch('/light/:id', (req, res) => {
    db
    .get('devices')
    .find({ id: 'LIG2' })
    .assign({ off: true }) // Turn off the device
    .value();

update(); // tell frontend to update state.

res.send('Turn off the lamp ! ')
})

// // Light Garden 
app.get('/garden/on', (req, res) => {
    db
        .get('devices')
        .find({ id: 'LIG3' })
        .assign({ on: true, brightness: 1.08 }) // Turn on the device and change brightness
        .value();

    update(); // tell frontend to update state.
    res.status(200).json({
        status:'ON', 
        messag:'Lapm in garden is truned On now!'
    })
  
    })

app.patch('/garden/off', (req, res) => {
    db
    .get('devices')
    .find({ id: 'LIG3' })
    .assign({ on: false }) // Turn off the device
    .value();

update(); // tell frontend to update state.

res.status(200).json({
    status:'Off', 
    messag:'Light is off'
})

})

// // Camera FrontDoor
app.get('/Camera/on', (req, res) => {
    db
        .get('devices')
        .find({ id: 'CAM1' })
        .assign({ on: true }) // Turn on the device
        .value();

    update(); // tell frontend to update state.
    res.status(200).json({
        status:'ON',
        messag:'Camera is working now! '
    })

})

app.patch('/camera/off', (req, res) => {
    db
    .get('devices')
    .find({ id: 'CAM1' })
    .assign({ on: false }) // Turn off the device
    .value();

update(); // tell frontend to update state.

res.status(200).json({
    status:'off',
    messag:'Camera is off now! '
})

})

// // Lock Front Door 

app.get('/lockdoor', (req, res) => {
    db
        .get('devices')
        .find({ id: 'LOC1' })
        .assign({ locked: false }) // Lock the Door
        .value();
    update(); // tell frontend to update state.
    res.send('Door get Locked! ')
})
app.get('/unlockdoor', (req, res) => {
    db
    .get('devices')
    .find({ id: 'LOC1' })
    .assign({ locked: true }) // Unlock the door
    .value();
update(); // tell frontend to update state.

res.status(200).json({
    status:'Success', 
    messag:'Door is unlocked now!'
})

})

// // Vacuum BB 
app.get('/vacuum', (req, res) => {
    db
        .get('devices')
        .find({ id: 'VAC1' })
        .assign({ on: true }) // Turn on the device
        .value();
    update(); // tell frontend to update state.
    
    res.status(200).json({
        status: 'Cleaning',
        messag: 'Vacuum is Working!'
    })
   })
app.get('/vacuum/:id', (req, res) => {
    db
        .get('devices')
        .find({ id: 'VAC1' })
        .assign({ on: false }) // Turn off the device
        .value();

    update(); // tell frontend to update state.

    res.send('Vacuum is Off NOW! ')

})

// //Speaker Living Room
app.get('/speaker', (req, res, next) => {
    db
        .get('devices')
        .find({ id: 'SPE1' })
        .assign({ on: true }) // Turn on the device
        .value();
    update(); // tell frontend to update state.

    res.send('Listen to music! ')
    next()

})

app.patch('/speaker/:id', (req, res) => {

    db
        .get('devices')
        .find({ id: 'SPE1' })
        .assign({ on: false }) // Turn off the device
        .value();
        res.status(200).json({
        status: 'Success',
        messag: 'Trun it Off !'
    })
})


app.get('*', (req, res) => {
    res.status(404).send(`Not found!`)
})


