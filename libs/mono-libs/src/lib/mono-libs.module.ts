
export type THero = {
  id: string;
  name: string;
}

const SYMBOL = {
  MongoDb: Symbol.for("MongoDb"),
  HeroService: Symbol.for("HeroService")
};

export { SYMBOL };