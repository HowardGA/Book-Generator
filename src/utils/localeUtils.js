import { Faker, en, pt_BR,pl	 } from '@faker-js/faker'; 

export const getFakerWithLocale = (language, seed) => {
  const localeMap = {
    en,              
    pt_BR,  
    pl	  
  };

  const selectedLocale = localeMap[language] || en; 
  return new Faker({ locale: selectedLocale, seed }); 
};

