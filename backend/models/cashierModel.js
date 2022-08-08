import mongoose from "mongoose";

const cashierSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    cashierFlag: { //true: deposits, false: withdrawals
      type: Boolean,
      required: true
    },
    txHash: {
      type: String,
      requred: true
    },
    coinType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true
    },
    creditAmount: {
      type: Number,
      requred: true
    },
    dateTime: {
      type: Date,
      requred: true,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

// cashierSchema.methods.matchPassword = async function (enteredPassword) {
//   // const salt = await bcrypt.genSalt(10);
//   // const temp = await bcrypt.hash("123", salt);
//   // console.log(temp);
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// cashierSchema.pre("save", async function (next) {
//   // if (!this.isModified("password")) {
//   //   next();
//   // }

//   // const salt = await bcrypt.genSalt(10);
//   // this.password = await bcrypt.hash(this.password, salt);
// });

const Cashier = mongoose.model("Cashier", cashierSchema);

export default Cashier;
