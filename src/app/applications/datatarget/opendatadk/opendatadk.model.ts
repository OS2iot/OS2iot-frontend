export class OpenDataDK {
    name: string; //reqired - max 120
    title: string;
    description: string;
    tags: string[];
    licens = 'http://portal.opendata.dk/dataset/open-data-dk-licens'
    accessLevel = 'public';
    author: string; //required
    authorEmail: string; //reqired
    url: string; // autogenereret
    acceptTerms = false;
}