const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./Config/db');
const studentroute = require('./Routes/Student.route');
const departmentroute= require('./Routes/department.route');
const teacherroute= require('./Routes/teacher.route');
const feesroute= require('./Routes/fees.route');
const subjectroute= require('./Routes/subject.route');



const port = process.env.PORT || 4000;




app.use(cors({ origin: "*" }));

app.use(express.json());

app.use('/api/student', studentroute);
app.use('/api/department', departmentroute);
app.use('/api/teacher', teacherroute);
app.use('/api/fees', feesroute);
app.use('/api/subject', subjectroute);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);