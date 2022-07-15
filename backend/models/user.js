import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter an username"],
        unique: [true, 'this username is already taken'],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    savedPlaces: [{
        cityName: {
            type: String,
        }
    }]

});

//Hashing the Password
userSchema.pre("save", async function(next) {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10);
    next();
})

//Matching the Password
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

//generating the token
userSchema.methods.genrateToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
}

export default mongoose.model("User", userSchema);