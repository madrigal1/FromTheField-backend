import User, { UserModel } from "../models/User";
import Keystore from "../models/keystore";
import KeystoreRepo from "./KeyStoreRepo";


const mentorInfo = "+rating";
export default class UserRepo {
    public static findByEmail(email: string,isMentor?:boolean): Promise<User> {
        return UserModel.findOne({ email })
          .select(isMentor?mentorInfo:" ")
          .lean<User>()
          .exec();
      }
    
  public static findById(id: string): Promise<User> {
    return UserModel.findById(id)
      .lean<User>()
      .exec();
  }
  public static fetchAll():Promise<User[]> {
    return UserModel.find({})
    .lean<User>()
    .exec();
  }
  public static fetchAllMentors():Promise<User[]> {
    return UserModel.find({isMentor:true})
    .select(mentorInfo)
    .lean<User>()
    .exec();
  }

  public static async editRating(
    email: string,
    userRating: number[]
  ): Promise<any> {
    return UserModel.updateOne({ email }, { $set: { rating: userRating } });
  }

  public static async create(
    user: User,
    access_token: string,
    refresh_token: string
  ): Promise<{ user: User; keystore: Keystore }> {
    const now = new Date();

    user.createdAt = user.updatedAt = now;
    const createdUser = await UserModel.create(user);
    const keystore = await KeystoreRepo.create(
      createdUser,
      access_token,
      refresh_token,
    );
    return { user: createdUser.toObject(), keystore };
  }
}
