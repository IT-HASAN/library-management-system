import type { Book } from '../../../models/Book';
import type { PageInfo } from '../../../models/Page';

export function generateRandomGenres():string[] {
  const choices = ['Non-Fiction', 'Childrens', 'Fantasy', 'Biography', 'Romance', 'Science Fiction', 'Young Adult'];

  const chosen:string[] = [];

  while(chosen.length !== 5){
    const num = Math.floor(Math.random() * 7);
    if (!chosen.includes(choices[num])) chosen.push(choices[num]);
  }

  return chosen;
}

export function getRandomBooksByGenre(genre:string, books:Book[]):Book[] {
  const filteredBooks = books.filter((book) => book.genre === genre);

  const randomBooks: Book[] = [];

  if (filteredBooks.length < 10) return filteredBooks;

  while (randomBooks.length !== 10) {
    const index = Math.floor(Math.random() * filteredBooks.length);
    if (!randomBooks.some(b => b['barcode'] === filteredBooks[index].barcode)) randomBooks.push(filteredBooks[index]);
  }

  return randomBooks;
}

export function calculatePaging(pageInfo:PageInfo):string[] {
  const pageArr:string[] = [];

  if (pageInfo) {
    const total = pageInfo?.totalPages;
    const current = pageInfo?.currentPage;

    if (total <= 10) {
      for (let i = 1; i <= total; i++) {
        pageArr.push(`${i}`);
      }
    } else if (total > 10 && current - 7 <= 0) {
      for (let i = 1; i <= 8; i++) {
        pageArr.push(`${i}`);
      }
      
      pageArr.push('...');

      for (let i = total - 1; i <= total; i++) {
        pageArr.push(`${i}`);
      }
    } else if (total > 10 && total - 7 > 0 && total - current > 5) {
      for (let i = 1; i <= 2; i++) {
        pageArr.push(`${i}`);
      }

      pageArr.push('...');

      for (let i = current; i <= current + 4; i++) {
        pageArr.push(`${i}`);
      }
      
      pageArr.push('...');

      for (let i = total - 1; i <= total; i++) {
        pageArr.push(`${i}`);
      }
    } else {
      for (let i = 1; i <= 2; i++) {
        pageArr.push(`${i}`);
      } 
      
      pageArr.push('...');
        
      for (let i = total - 5; i <= total; i++) {
        pageArr.push(`${i}`);
      }
    }
  }

  return pageArr;
}