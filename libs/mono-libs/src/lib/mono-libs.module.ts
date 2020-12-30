
export type THero = {
  hero_id: number;
  name: string;
}

const SYMBOL = {
  MongoDb: Symbol.for("MongoDb"),
  HeroService: Symbol.for("HeroService")
};

export { SYMBOL };