const mongoose = require('mongoose');

// Define the schema
const menuSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Ensure MongoDB ObjectId is used for _id
  menu_id: { type: Number, required: true },
  parent_menu_id: { type: Number, required: true }, // Reference to the parent menu, if any
  module_id: { type: Number, required: true }, // Reference to the module ID
  menu_name: { type: String, required: true },
  menu_icon: { type: String, required: true },
  url: { type: String, required: true },
  sub_menu: { type: String, required: true },
  menu_order: { type: Number, required: true },
  components_page: { type: String, required: true },
  components_load: { type: String, required: true },
  is_deleted: { type: Number, required: true },
});

// Create the model from the schema
const ProMenu = mongoose.model('ProMenu', menuSchema);

module.exports = ProMenu;