export class OpenDataDkDataset {
    name: string; //reqired - max 120
    resourceTitle: string;
    description: string;
    keywords: string[];
    license = 'http://portal.opendata.dk/dataset/open-data-dk-licens'
    accessLevel = 'public';
    authorName: string; //required
    authorEmail: string; //reqired
    url: string; // autogenereret
    acceptTerms = false;
}