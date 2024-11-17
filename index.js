const app = require('./app');
const { campaignRouter } = require('./routes/campaign');
const { orderRouter } = require('./routes/order');
const { userRouter } = require('./routes/user');
const { customerRouter } = require('./routes/customer');
const {segmentRouter} = require('./routes/segment');
const { communicationRouter } = require('./routes/communication');
require('dotenv').config()
const PORT  = process.env.PORT || 4000;


app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:'Welcome to the SERVER User ->  Validation with Zod 👊',
    })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/orders', orderRouter )
app.use('/api/v1/campaigns', campaignRouter)
app.use('/api/v1/customers',customerRouter )
app.use('/api/v1/audience',segmentRouter )
app.use('/api/v1/communication',communicationRouter )
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})