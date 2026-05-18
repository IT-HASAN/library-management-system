import { LibraryCardModel } from '../daos/LibraryCardDao';
import { ILibraryCard, ILibraryCardDocument } from '../models/LibraryCard';
import { LibraryCardDoesNotExistError } from '../utils/CustomErrors';

export async function registerLibraryCard(card: ILibraryCard): Promise<ILibraryCard> {
  const saved = await LibraryCardModel.findOneAndUpdate(
    { user: card.user },
    { $setOnInsert: { user: card.user } },
    { new: true, upsert: true }
  ).lean<ILibraryCardDocument>();

  if (!saved) {
    throw new Error("Failed to register library card");
  }

  return {
    _id: saved._id.toString(),
    user: saved.user.toString()
  };
}

export async function findLibraryCard(libraryCardId: string): Promise<ILibraryCard> {
  const card = await LibraryCardModel
    .findById(libraryCardId)
    .lean<ILibraryCardDocument>();

  if (!card) {
    throw new LibraryCardDoesNotExistError(
      "The library card specified does not exist"
    );
  }

  return {
    _id: card._id.toString(),
    user: card.user.toString()
  };
}