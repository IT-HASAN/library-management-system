import LibraryCardDao from '../daos/LibraryCardDao';

import { ILibraryCard } from '../models/LibraryCard';
import { LibraryCardDoseNotExistError } from '../utils/CustomErrors';

export async function registerLibraryCard(card:ILibraryCard):Promise<ILibraryCard> {
  try {
    const savedCard = new LibraryCardDao(card);
    return await savedCard.save();
  } catch (error:any) {
    let c = await LibraryCardDao.findOne({user:card.user}).populate('user');
    if (c) return c;
    throw error;
  }
}

export async function findLibraryCard(libraryCardId:string):Promise<ILibraryCard> {
  try {
    let card = await LibraryCardDao.findOne({_id:libraryCardId}).populate('user');
    if (card) return card;

    throw new LibraryCardDoseNotExistError("The library card specified does not exist");
  } catch (error:any) {
    throw error;
  }
}