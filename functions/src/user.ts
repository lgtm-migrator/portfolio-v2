// External Imports
import Joi from "joi";
import { firestore } from "./helpers/admin";

// Internal Imports
import { onCall } from "./helpers/functions";
import { PublicUserDoc, ImmutableUserDoc } from "../../types/firestore";

type CreateUserData = PublicUserDoc & ImmutableUserDoc;

const createUserDataSchema = Joi.object<CreateUserData, true>({
  name: Joi.string().required().allow(""),
  email: Joi.string().required().allow(""),
  picture: Joi.string().required().allow(""),
});

export const createUserDoc = onCall<CreateUserData>({
  name: "Create User Doc",
  schema: createUserDataSchema,
  handler: async (data, context) => {
    if (!context.auth) {
      throw new Error("Cannot create user doc as the user is not logged in.");
    }

    const publicData = {
      name: data.name,
      picture: data.picture,
    };
    const publicRef = firestore
      .collection("users")
      .doc(
        context.auth.uid
      ) as FirebaseFirestore.DocumentReference<PublicUserDoc>;
    await publicRef.create(publicData);

    const immutableData = {
      email: data.email,
    };
    const immutableRef = firestore
      .collection("users_immutable")
      .doc(
        context.auth.uid
      ) as FirebaseFirestore.DocumentReference<ImmutableUserDoc>;
    await immutableRef.create(immutableData);
  },
});
