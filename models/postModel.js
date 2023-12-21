const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
      },
      isActive: {
        type: Boolean,
        default: true
      },
      geoLocation: {
        type: {
          type: String,
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          default: [0, 0]
        }
      },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }

    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
});


module.exports = mongoose.model("Post", postSchema);
