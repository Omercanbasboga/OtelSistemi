import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    age:{
        type: Number,
        min: 18,
        max: 65
    },
    work:{
        type: String,
        enum: ['Founder and CEO','Partner & co-founder','Chairmen','Manager','chef', 'housekeeper', 'receptionist',],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Örnek: 10 haneli bir numara
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Basit bir regex ile e-posta doğrulama
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    address:{
        type: String,
        trim: true,
        maxlength: 100
    },
    img: {
        type: String,
        default: 'default-profile.jpg'
      },
    password: {
        required: true,
        type: String
    },
    facebookURL: {
        type: String,
        default: 'https://www.facebook.com/'
      },
    twitterURL: {
        type: String,
        default: 'https://x.com/'
      },
    testimonail: {
        type: String,
        required: true,
      }
},
{ 
    timestamps: true 
});

personSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
});

personSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(update.password, salt);
            this.getUpdate().password = hashedPassword;
            next();
        } catch (err) {
            return next(err);
        }
    } else {
        next();
    }
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
};

const Person = mongoose.model('Person', personSchema);

export default Person;