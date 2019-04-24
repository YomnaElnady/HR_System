const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const Employees = require('./models/employee');
app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/HR-System', {useNewUrlParser: true} )
.then(() => console.log('connected to db successfully'))
.catch((err) => console.log(err));


Employees.insertMany([    
    { 
         name: 'soha',
        phone: 100447766557,
        salary: 9000,
        skills: ['testing'],
        degree: 'PHP',
        position: 'tester'
    },
    {  
        name: 'osama',
        phone: 9876567,
        salary: 8000,

        skills: ['programming'],
        position: 'programmer'
    },
    {  
        name: 'moaaz',
        phone: 55702256,
        salary: 7900,
        skills: ['analysis'],
        position: 'analysist'
    },
    {  
        name: 'mohannad',
        phone: 765324567,
        salary: 50000,
        skills: ['software engineer'],
        position: 'manager'
    }
])



app.get('/HR-System', async(req,res) => {
    const result = await Employees.find();
    res.send(result);
})

app.get('/HR-System/:name', async(req,res) => {
    const result = await Employees.find({name: req.params.name});
    if(result.length===0){
    res.status(404).send('This Employee is not exist');
    }
    else{
    res.send(result);
    }
    
})

app.post('/HR-System', async(req,res) => {
    const result = await Employees.create(req.body);
    res.send(result);
})

app.delete('/HR-System/:name', async(req,res) => {
   try{
    const result = await Employees.find({name: req.params.name});
    if(result.length>0){
    const deletedEmployee = await Employees.deleteMany({name: result[0].name})
    res.send(`${deletedEmployee.deletedCount} employees have the same name have been deleted`);
    
    }
    else{
        res.status(404).send('This Employee is not exist');

    }    

}

    catch(error){
        console.log(error.message)
    }
})

app.listen(3000, () => console.log('listining for requests...'))