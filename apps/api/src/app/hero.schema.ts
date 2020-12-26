import { model, Schema, Model, Document } from 'mongoose';

interface IHero extends Document {
    id: string;
    name: string;
}

const heroSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: String
}, {
  collection: 'Heroes'
})

heroSchema.query.byName = function(name: string | RegExp) {
  return this.find({ name: new RegExp(name, 'i') });
};

export const Hero: Model<IHero> = model('Hero', heroSchema);

