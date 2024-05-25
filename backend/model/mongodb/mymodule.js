const mongoose = require('mongoose');

// Define the schema
const moduleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  module_id: { type: Number, required: true },
  module_name: { type: String, required: true },
  key: { type: String, required: true },
  components: { type: String, required: true },
  module_icon: { type: String, required: true },
  description: { type: String, required: true },
  is_deleted: { type: Number, default: 0 }
});

// Create the model from the schema
const ProModule = mongoose.model('ProModule', moduleSchema);

module.exports = ProModule;