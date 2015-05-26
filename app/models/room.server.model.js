'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Room Schema
 */
var RoomSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Room name',
		trim: true
	},
	id : {
		type: Number,
		default: null
	},
	switches: [
		{
			name: {
				type: String,
				default: null
			},
			id: {
				type: Number,
				default: null
			},
			state: {
				type: Boolean,
				default: true
			}
		}
	],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Room', RoomSchema);
