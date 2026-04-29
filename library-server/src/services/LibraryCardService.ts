import { LibraryCardModel } from '../daos/LibraryCardDao';
import { ILibraryCard, ILibraryCardDb } from '../models/LibraryCard';
import { LibraryCardDoesNotExistError } from '../utils/CustomErrors';

export async function registerLibraryCard(card: ILibraryCard): Promise<ILibraryCard> {
  const saved = await LibraryCardModel.findOneAndUpdate(
    { user: card.user },
    { $setOnInsert: { user: card.user } },
    { new: true, upsert: true }
  ).lean<ILibraryCardDb>();

  if (!saved) {
    throw new Error("Failed to register library card");
  }

  return {
    user: saved.user.toString()
  };
}

export async function findLibraryCard(libraryCardId: string): Promise<ILibraryCard> {
  const card = await LibraryCardModel
    .findById(libraryCardId)
    .lean<ILibraryCardDb>();

  if (!card) {
    throw new LibraryCardDoesNotExistError(
      "The library card specified does not exist"
    );
  }

  return {
    user: card.user.toString()
  };
}