import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    facode: {
      type:String,
    },
    isFacode: {
      type:Boolean,
      required: true,
      default:false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
    balance: {
      type: Number,
      required: true,
      default: 0
    },
    walletInfo: {
      bitcoin: {
        address: {
          type: String,
          required: true
        },
        privateKey: {
          type: String,
          required: true
        }
      },
      ethereum: {
        address: {
          type: String,
          required: true
        },
        privateKey: {
          type: String,
          required: true
        }
      },
      solana: {
        address: {
          type: String,
          required: true
        },
        privateKey: {
          type: String,
          required: true
        }
      },
      
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  // const salt = await bcrypt.genSalt(10);
  // const temp = await bcrypt.hash("123", salt);
  // console.log(temp);
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
