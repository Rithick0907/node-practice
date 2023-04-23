import * as yup from "yup";
import { Types } from "mongoose";

// class ObjectIdSchema extends yup.mixed {
//   constructor() {
//     super({ type: "objectId" });

//     this.withMutation((schema) => {
//       schema.transform(function (value) {
//         if (this.isType(value)) return value;
//         return new ObjectId(value);
//       });
//     });
//   }

//   _typeCheck(value) {
//     return Types.ObjectId(value).isValid();
//   }
// }

// yup.objectId = () => new ObjectIdSchema();

export default yup;
