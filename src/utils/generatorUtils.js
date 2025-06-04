import { getFakerWithLocale } from "./localeUtils.js";
import seedrandom from 'seedrandom';

export const BookGenerator = (language, seed, avgLikes, avgReviews, count = 20, offset = 0) => {
    const books = [];
    for (let i = offset; i < offset + count; i++) {
        const bookSpecificFaker = getFakerWithLocale(language, parseInt(seed) + i); 
        books.push(BookBuilder(parseInt(seed), i, language, bookSpecificFaker, avgLikes, avgReviews));
    }
    return books;
};

const BookBuilder = (seed, bookIndex, language, fakerInstance, avgLikes, avgReviews) => {
    const reviewAndLikeBaseSeed = `${seed}-${bookIndex}`;

    return  {
        ISBN: fakerInstance.commerce.isbn(13), 
        title: fakerInstance.book.title(),//title,   
        authors: FractionalRepetitionAuthors(1.5, `${reviewAndLikeBaseSeed}-authors`, fakerInstance), 
        format: fakerInstance.book.format(),//generateBookFormat(fakerInstance, language), 
        publishers: fakerInstance.book.publisher(),//publishers, 
        publicationYear: fakerInstance.number.int({ min: 1900, max: new Date().getFullYear()}),
        cover: fakerInstance.image.urlPicsumPhotos(), 
        likes: FractionalRepetitionLikes(avgLikes, `${reviewAndLikeBaseSeed}-likes`), 
        reviews: FractionalRepetitionReviews(avgReviews, `${reviewAndLikeBaseSeed}-reviews`, language) 
    };
}

const fractionalRandomCount = (avg, seedKey) => {
    const base = Math.floor(avg);
    const remainder = avg - base;
    const rng = seedrandom(String(seedKey));
    return rng() < remainder ? base + 1 : base;
};

const FractionalRepetitionLikes = (avg, seedKey) => {
    const count = fractionalRandomCount(avg, seedKey);
    return count;
};

const FractionalRepetitionReviews = (avg, seedKey, language) => {
    const count = fractionalRandomCount(avg, seedKey);
    const reviews = [];

    for (let i = 0; i < count; i++) {
        const reviewContentSeed = `${seedKey}-review-${i}`;
        const tempFaker = getFakerWithLocale(language, reviewContentSeed);
        reviews.push({
            review: tempFaker.lorem.sentence(),
            reviewer: tempFaker.person.fullName()
        });
    }
    return reviews;
};


const FractionalRepetitionAuthors = (avg, seedKey, fakerInstance) => {
    const authors = [];
    const authorCount = fractionalRandomCount(avg, seedKey); 
    for (let i = 0; i < authorCount; i++) {
        authors.push(fakerInstance.person.fullName()); 
    }
    return authors;
};
