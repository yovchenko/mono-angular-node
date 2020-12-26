
export type THero = {
  id: number;
  name: string;
}

const SYMBOL = {
  MongoDb: Symbol.for("MongoDb"),
  HeroService: Symbol.for("HeroService")
};

export { SYMBOL };