const request = require('supertest')
const app  = require('../../app')
const{  mongoConnect,
    mongoDisconnect
} = require('../../services/mongodb')


describe('Launches API',()=>{

    beforeAll(async()=> {
       await mongoConnect ()
    })
    afterAll(async ()=>{
        await mongoDisconnect()
    })

    describe ('Test GET / launches', ()=>{
        test('It should respond with 200 success', async () =>{
            const response = await request(app)
            .get('/launches')
           .expect('content-Type', /json/)  
           .expect(200)
           
        })
    })
    
    describe ('Test POST / launch', () =>{
        const completeLaunchData={
            mission: 'USS Enterprise',
                rocket: 'NCC1701-D',
                target:'Kepler-62 f',
                launchDate:'January 4,2028',
        }
})



    const launchDataWithoutDate={
        mission: 'USS Enterprise',
            rocket: 'NCC1701-D',
            target:'Kepler-62 f',

    }

    const launchDataWithInvalidDate={
        mission: 'USS Enterprise',
            rocket: 'NCC1701-D',
            target:'Kepler-62 f',
            launchDate:'zoot',
    }

    test('It should respond with 201 success', async() => {
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('content-Type', /json/)  
       .expect(201)

       const requestDate = new Date(completeLaunchData.launchDate).valueOf()
       const responseDate = new Date (response.body.launchDate).valueOf()
    expect(responseDate).toBe(requestDate)

       expect(response.body).toMatchObject(launchDataWithoutDate)
    })
    test("it should catch missing required properties", async () =>{
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect('content-Type', /json/)  
       .expect(400)

       expect(response.body).toStrictEqual({
        error: 'Missing required launch property'
       })
    })
test("it should catch invalid dates", async() => {
   const response = await request(app)
    .post('/launches')
        .send(launchDataWithInvalidDate)
        .expect('content-Type', /json/)  
       .expect(400)

       expect(response.body).toStrictEqual({
        error: 'invalid launch date'
       })
})
})