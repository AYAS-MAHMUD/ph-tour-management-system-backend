import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";
import slugify from "slugify";

const divisionSchema = new Schema<IDivision>(
  {
    name: { type: String, required: true, unique: true },

    slug: { type: String, unique: true },

    thumbnail: { type: String },

    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

divisionSchema.pre("save", function () {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });

//   next();
});

export const Division = model<IDivision>("Division", divisionSchema);