const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
   username:{
    type:String,
    required:true,

   },
   email:{
    type:String,
    required:true,
    unique:true,
   },
    password:{
     type:String,
     required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },  
    googleId:{
        type:String,
        unique:true,
        sparse:true,
    },
    // Optional profile fields
    phone:{
        type:String,
        default:'',
    },
    city:{
        type:String,
        default:'',
    },
    location:{
        type:String,
        default:'',
    },
    pincode:{
        type:String,
        default:'',
    },
},
{
    timestamps:true,
    collection: 'users'
}
)

// Add indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ isAdmin: 1 });

const User=mongoose.model('User',userSchema);
module.exports=User;

