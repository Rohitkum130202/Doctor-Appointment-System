const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "FirstName  is Required"],
    },
    lastName: {
      type: String,
      required: [true, "LastName is Required"],
    },
    phone: {
      type: String,
      required: [true, "Phone no is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialiaztion is required"],
    },
    experience: {
      type: String,
      required: [true, "Expericence is required"],
    },
    feesPerconsultation: {
      type: String,
      required: [true, "Fees is required"],
    },
    timings: {
      type: Object,
      required: [true, "Work timing is required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("users", doctorSchema);
module.exports = doctorSchema;
