import { model, Schema, Model, Document } from 'mongoose';
import { THero } from '@mono-angular-node/mono-libs';

export interface IHero extends THero, Document {}

const heroSchema = new Schema({
  hero_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    unique: true
  }
}, {
  collection: 'heroes'
})

heroSchema.query.byName = function(name: string | RegExp) {
  return this.find({ name: new RegExp(name, 'i') });
};

export const Hero: Model<IHero> = model('Hero', heroSchema);

