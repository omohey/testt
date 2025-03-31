export type TCategory = {
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    img: string;
    subCategories: TSubCategory[];
}

export type TSubCategory = {
    id: string;
    name: string;
    nameAr: string;
    image: string;
};