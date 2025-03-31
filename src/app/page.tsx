"use client";
import ProductsGrid from "@/components/ProductsGrid";
import { TCategory } from "@/types/Categories";
import { TProduct } from "@/types/Product";


export default function Home() {

  return (
    <div className="flex items-end justify-end">
      <main className="p-[20px] py-20 w-full">
        <ProductsGrid products={products} categories={categories} currency="AED" onAddToCartClick={(productId, count) => { console.log(productId); console.log(count); }} onAddToWishlistClick={(productId) => { console.log(productId) }} />
      </main>
      <footer className=""></footer>
    </div>
  );
}

const categories: TCategory[] =
  [
    {
      "description": "",
      "img": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F1715589861857%20?alt=media&token=b138045a-d661-4b7b-8b16-ea7c9dab23ff",
      "descriptionAr": "العطور",
      "subCategories": [
        {
          "image": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F%D8%A7%D9%84%D8%A7%D9%83%D8%AB%D8%B1%20%D9%85%D8%A8%D9%8A%D8%B9%D9%8B%D8%A7?alt=media&token=2804985f-0ab9-43c9-aecb-8371df8b8b60",
          "name": "Most Sold",
          "nameAr": "الاكثر مبيعًا",
          "id": "1730845747590"
        },
        {
          "name": "Ben Har",
          "nameAr": "بن حر",
          "image": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F%D8%A8%D9%86%20%D8%AD%D8%B1?alt=media&token=c951f07d-5658-41e4-9de8-cb9ebed7eda0",
          "id": "1730845764708"
        },
        {
          "nameAr": "عبدالرشيد",
          "id": "1730845769873",
          "image": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%B4%D9%8A%D8%AF?alt=media&token=9557ac3a-6c64-4841-b95d-98e94240ba96",
          "name": "Abdul Rashid"
        },
        {
          "nameAr": "يونس",
          "name": "Yunis",
          "image": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F%D9%8A%D9%88%D9%86%D8%B3?alt=media&token=7d15aaec-ed6f-4d3b-adcf-ffe67b16bb3e",
          "id": "1730845773895"
        },
        {
          "nameAr": "غزالي",
          "id": "1730845777559",
          "name": "Ghazali",
          "image": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F%D8%BA%D8%B2%D8%A7%D9%84%D9%8A?alt=media&token=b43e646c-7700-455b-964b-256299454b2d"
        },
        {
          "id": "1730845782240",
          "nameAr": "أجمل",
          "image": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F%D8%A3%D8%AC%D9%85%D9%84?alt=media&token=9d8c3257-3bad-43d9-b52e-c70cafd27834",
          "name": "Ajmal"
        },
        {
          "image": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F%D8%A7%D9%88%D8%AA%D9%84%D8%AA?alt=media&token=d7467bc1-0663-4378-9ccb-0f267b59e883",
          "name": "Outlet",
          "nameAr": "اوتلت",
          "id": "1731263701497"
        }
      ],
      "title": "Perfumes",
      "titleAr": "العطور",
      "id": "1713964709779"
    },
    {
      "subCategories": [
        {
          "id": "1730845814591",
          "nameAr": "يومي",
          "image": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F%D9%8A%D9%88%D9%85%D9%8A?alt=media&token=f8f472c8-5c66-4fa7-b603-ec76b4f076f8",
          "name": "Daily"
        },
        {
          "image": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A7%D8%AA?alt=media&token=ec426f12-bf11-4f77-8957-d99268c58f9c",
          "id": "1730845820185",
          "nameAr": "مناسبات",
          "name": "Occasions"
        },
        {
          "image": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F%D8%A7%D9%88%D8%AA%D9%84%D8%AA?alt=media&token=4dd66a10-e7f8-4ed4-a7b6-185ceadd2d99",
          "nameAr": "اوتلت",
          "id": "1731303717657",
          "name": "Outlet"
        }
      ],
      "id": "1713965745399",
      "description": "",
      "title": "Dukhoon",
      "img": "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fcategories%2F1715589861857%20?alt=media&token=b138045a-d661-4b7b-8b16-ea7c9dab23ff",
      "titleAr": "الدخون",
      "descriptionAr": "الدخون"
    }
  ];



const products: TProduct[] = [
  {
    "createdAt": 1631533200000, // 13 sep 2021
    "productWithOutVat": false,
    "hide": false,
    "subCategories": [
      {
        "titleAr": "عبدالرشيد",
        "id": "1730845769873",
        "value": "1741392229258-1",
        "title": "",
        "label": "- عبدالرشيد"
      },
      {
        "titleAr": "الاكثر مبيعًا",
        "id": "1730845747590",
        "value": "1741392229258-2",
        "title": "Most Sold",
        "label": "- Most Sold"
      },
    ],
    "productQuantity": 7,
    "reviews": "[{\"name\":\"John Doe\",\"phone\":\"+971504999602\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Great service, fast delivery\"},{\"name\":\"Jane Smith\",\"phone\":\"+971507184116\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":3,\"description\":\"Waiting for confirmation\"},{\"name\":\"Ali Ahmed\",\"phone\":\"+971504652569\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Product was excellent!\"},{\"name\":\"Sara Al Mansoori\",\"phone\":\"+971509616229\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Very satisfied with the order\"},{\"name\":\"Mohammed Ali\",\"phone\":\"+971503499333\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":2,\"description\":\"Order is delayed\"},{\"name\":\"Fatima Zahra\",\"phone\":\"+971507475454\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Good, but expected faster delivery\"},{\"name\":\"Omar Khalid\",\"phone\":\"+971555555747\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Product was as expected\"},{\"name\":\"Layla Ahmed\",\"phone\":\"+971563220246\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":3,\"description\":\"Not yet received\"},{\"name\":\"Ayesha Al Zayed\",\"phone\":\"+971524120000\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Awesome quality and service\"},{\"name\":\"Khalid Saeed\",\"phone\":\"+971566681662\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":3,\"description\":\"Received product, but packaging was damaged\"}]",
    "description": "<p></p>",
    "showProductSales": false,
    "productSize": "0.2",
    "cost": 18.9,
    "popular": false,
    "new": false,
    "newPrice": 0,
    "arabicDescription": "<p style=\"line-height: 2;\">للي ما يقدرون يطلبون عطر إلا بعد ما يجربونه و يبون يشترون بس مترددين لقينا لكم حل ! </p><p style=\"line-height: 2;\">وفرنالكم تستر من العطر بحجم 6 ملي </p><p style=\"line-height: 2;\">جربوه و نحن متأكدين انكم بترجعون تشترونه </p><p style=\"line-height: 2;\">بينفعكم للسفر بعد بدال ما تاخذون العطر نفسه تقدرون تخشون التستر في أي شنطة عندكم و بتكونون موفرين  مساحة لأغراضكم الباقية</p><p></p>",
    "arabicName": "تستر عطر عود ازرق ",
    "tags": [
      {
        "titleAr": "اجمل",
        "label": "- اجمل",
        "value": "1741329258-3",
        "title": "Ajmal",
        "id": "1741398415"
      }
    ],
    "price": 40,
    "inStock": true,
    "name": "Oud Azraq Perfume Tester",
    "packages": false,
    "options": "[{\"id\":\"1732025193848\",\"typeId\":1,\"type\":\"selectList\",\"mandatory\":true,\"values\":[{\"arValue\":\"\",\"qty\":100000,\"available\":true,\"image\":\"\",\"value\":\"6ml\",\"price\":0}],\"toggleOpen\":true}]",
    "tagsEn": "",
    "sales": false,
    "quantity": "",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2FOud%20Azraq%20Perfume%20Tester%2F1732025177993%2B1?alt=media&token=ebfd56ec-f21a-40d3-8b7f-421a00dad9e6",
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AA%D8%B3%D8%AA%D8%B1%20%D8%A8%D8%B1%D9%83%D8%A9%20%D8%A3%D8%AC%D9%85%D9%84%2F1732015095815%2B1?alt=media&token=7cd2d693-a931-4230-9b93-5f9210f67301",
    ],
    "ribbon": "",
    "id": "1732025216184",
    "categoryId": "1713964709779",
    "acceptInternationalDelivery": true
  },
  {
    "createdAt": 1713533200000, // 19 april 2024
    "options": "[{\"id\":\"1732018256808\",\"typeId\":1,\"type\":\"selectList\",\"mandatory\":true,\"values\":[{\"arValue\":\"6ml\",\"qty\":100000,\"available\":true,\"image\":\"\",\"value\":\"\",\"price\":0}],\"toggleOpen\":true}]",
    "inStock": false,
    "productSize": "0.2",
    "id": "1731948768670",
    "cost": 20.1,
    "video": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B1?alt=media&token=b03a4a3b-2ffe-430f-b2bc-71082ef0010f",
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B2?alt=media&token=6a96be39-15e8-4ccf-a828-b212802bbb0f",
      "",
      ""
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AA%D8%B3%D8%AA%D8%B1%20%D8%A8%D8%B1%D9%83%D8%A9%20%D8%A3%D8%AC%D9%85%D9%84%2F1732015095815%2B1?alt=media&token=7cd2d693-a931-4230-9b93-5f9210f67301"
    ],
    "name": "Barakt Ajmal Tester",
    "tags": [
      {
        "titleAr": "اجمل",
        "label": "- اجمل",
        "value": "1741329258-3",
        "title": "Ajmal",
        "id": "1741398415"
      },
      {
        "titleAr": "اسرع",
        "label": "- اسرغ",
        "value": "1741324239258-3",
        "title": "Fast",
        "id": "17423441398415"
      }
    ],
    "showProductSales": false,
    "categoryId": "1713964709779",
    "description": "<p></p>",
    "reviews": "[{\"name\":\"John Doe\",\"phone\":\"+971504999602\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Great service, fast delivery\"},{\"name\":\"Jane Smith\",\"phone\":\"+971507184116\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":3,\"description\":\"Waiting for confirmation\"},{\"name\":\"Ali Ahmed\",\"phone\":\"+971504652569\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Product was excellent!\"},{\"name\":\"Sara Al Mansoori\",\"phone\":\"+971509616229\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Very satisfied with the order\"},{\"name\":\"Mohammed Ali\",\"phone\":\"+971503499333\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":2,\"description\":\"Order is delayed\"},{\"name\":\"Fatima Zahra\",\"phone\":\"+971507475454\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Good, but expected faster delivery\"},{\"name\":\"Omar Khalid\",\"phone\":\"+971555555747\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Product was as expected\"},{\"name\":\"Layla Ahmed\",\"phone\":\"+971563220246\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":3,\"description\":\"Not yet received\"},{\"name\":\"Ayesha Al Zayed\",\"phone\":\"+971524120000\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Awesome quality and service\"},{\"name\":\"Khalid Saeed\",\"phone\":\"+971566681662\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":3,\"description\":\"Received product, but packaging was damaged\"}]",
    "productQuantity": 0,
    "newPrice": 0,
    "price": 25,
    "popular": false,
    "sales": false,
    "new": false,
    "arabicDescription": "<p style=\"line-height: 2;\">للي ما يقدرون يطلبون عطر إلا بعد ما يجربونه و يبون يشترون بس مترددين لقينا لكم حل !</p><p style=\"line-height: 2;\">وفرنالكم تستر من العطر بحجم 6 ملي </p><p style=\"line-height: 2;\">جربوه و نحن متأكدين انكم بترجعون تشترونه</p><p style=\"line-height: 2;\">بينفعكم للسفر بعد بدال ما تاخذون العطر نفسه تقدرون تخشون التستر في أي شنطة عندكم و بتكونون موفرين  مساحة لأغراضكم الباقية</p><p></p>",
    "hide": false,
    "arabicName": "تستر عطر بركة أجمل",
    "subCategories": [
      {
        "titleAr": "اجمل",
        "label": "- اجمل",
        "value": "1741392229258-3",
        "title": "",
        "id": "1730845782240"
      },
    ]
  },
  {
    "createdAt": 1710533200000, // 15 march 2024
    "showProductSales": false,
    "tagsAr": "",
    "arabicName": "تستر عطر عنبر ابيض",
    "hide": false,
    "newPrice": 0,
    "subCategories": [
      {
        "label": "- عبدالرشيد",
        "titleAr": "عبدالرشيد",
        "title": "",
        "value": "1741392229258-1",
        "id": "1741392786612"
      }
    ],
    "new": false,
    "arabicDescription": "<p style=\"line-height: 2;\">للي ما يقدرون يطلبون عطر إلا بعد ما يجربونه و يبون يشترون بس مترددين لقينا لكم حل ! </p><p style=\"line-height: 2;\">وفرنالكم تستر من العطر بحجم 6 ملي </p><p style=\"line-height: 2;\">جربوه و نحن متأكدين انكم بترجعون تشترونه </p><p style=\"line-height: 2;\">بينفعكم للسفر بعد بدال ما تاخذون العطر نفسه تقدرون تخشون التستر في أي شنطة عندكم و بتكونون موفرين  مساحة لأغراضكم الباقية</p><p></p>",
    "popular": false,
    "acceptInternationalDelivery": true,
    "reviews": "[{\"name\":\"John Doe\",\"phone\":\"+971504999602\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Great service, fast delivery\"},{\"name\":\"Jane Smith\",\"phone\":\"+971507184116\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":3,\"description\":\"Waiting for confirmation\"},{\"name\":\"Ali Ahmed\",\"phone\":\"+971504652569\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Product was excellent!\"},{\"name\":\"Sara Al Mansoori\",\"phone\":\"+971509616229\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Very satisfied with the order\"},{\"name\":\"Mohammed Ali\",\"phone\":\"+971503499333\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":2,\"description\":\"Order is delayed\"},{\"name\":\"Fatima Zahra\",\"phone\":\"+971507475454\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Good, but expected faster delivery\"},{\"name\":\"Omar Khalid\",\"phone\":\"+971555555747\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Product was as expected\"},{\"name\":\"Layla Ahmed\",\"phone\":\"+971563220246\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":3,\"description\":\"Not yet received\"},{\"name\":\"Ayesha Al Zayed\",\"phone\":\"+971524120000\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Awesome quality and service\"},{\"name\":\"Khalid Saeed\",\"phone\":\"+971566681662\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":3,\"description\":\"Received product, but packaging was damaged\"}]",
    "inStock": true,
    "ribbon": "",
    "productWithOutVat": false,
    "sales": false,
    "price": 30,
    "name": "White Amber Perfume Tester",
    "packages": false,
    "tagsEn": "",
    "cost": 26.7,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F1732024198697%2B1?alt=media&token=fad96ec2-c84e-4043-8963-4ef5679c075a"
    ],
    "productQuantity": 8,
    "video": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B1?alt=media&token=b03a4a3b-2ffe-430f-b2bc-71082ef0010f",
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B2?alt=media&token=6a96be39-15e8-4ccf-a828-b212802bbb0f",
      "",
      ""
    ],
    "options": "[{\"id\":\"1732024251065\",\"typeId\":1,\"type\":\"selectList\",\"mandatory\":true,\"values\":[{\"arValue\":\"\",\"qty\":100000,\"available\":true,\"image\":\"\",\"value\":\"6ml\",\"price\":0}],\"toggleOpen\":true}]",
    "productSize": "0.2",
    "categoryId": "1713964709779",
    "id": "1732024280794",
    "description": "<p></p>"
  },
  {
    "createdAt": 1739003320000, // 8 feb 2025
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D9%82%D8%B7%D9%86%20%D9%87%D9%86%D8%AF%D9%8A%20%D8%B2%D8%B1%D9%8A%2F1731138919827%2B1?alt=media&token=76d93442-17ca-4681-962e-94216f4d8dd2"
    ],
    "productType": "physical product",
    "new": false,
    "video": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B1?alt=media&token=b03a4a3b-2ffe-430f-b2bc-71082ef0010f",
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B2?alt=media&token=6a96be39-15e8-4ccf-a828-b212802bbb0f",
      "",
      ""
    ],
    "productWithOutVat": false,
    "popular": false,
    "newPrice": 0,
    "showProductSales": false,
    "cost": 36,
    "name": "Cotton Hindi Zari",
    "productQuantity": 4,
    "acceptInternationalDelivery": true,
    "id": "1731138956974",
    "quantity": "",
    "options": null,
    "subCategories": [
      {
        "value": "1713965880443-0",
        "id": "1739787508022",
        "titleAr": "قطن",
        "label": "- قطن",
        "title": ""
      }
    ],
    "price": 10,
    "ribbon": "",
    "sales": false,
    "packages": false,
    "tagsAr": "",
    "arabicName": "قطن هندي زري",
    "hide": false,
    "description": "<p></p>",
    "categoryId": "1713965880443",
    "inStock": true,
    "productSize": "0.5",
    "tagsEn": "",
    "arabicDescription": "<p></p>"
  },
  {
    "createdAt": 1742003320000, // 15 mar 2025
    "newPrice": 0,
    "productWithOutVat": false,
    "id": "1741785191873",
    "inStock": true,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F1741785135442%2B1?alt=media&token=c22537b3-2f53-4625-8646-5ac041440053"
    ],
    "arabicDescription": "<p></p>",
    "name": "",
    "categoryId": "1713965880443",
    "packages": false,
    "productQuantity": 1,
    "ribbon": "",
    "price": 200,
    "video": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B1?alt=media&token=b03a4a3b-2ffe-430f-b2bc-71082ef0010f",
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B2?alt=media&token=6a96be39-15e8-4ccf-a828-b212802bbb0f",
      "",
      ""
    ],
    "hide": false,
    "popular": false,
    "productType": "physical product",
    "new": false,
    "sales": false,
    "acceptInternationalDelivery": true,
    "quantity": "",
    "productSize": "0.5",
    "tagsAr": "",
    "options": null,
    "description": "<p></p>",
    "cost": 40,
    "reviews": "[{\"name\":\"John Doe\",\"phone\":\"+971504999602\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Great service, fast delivery\"},{\"name\":\"Jane Smith\",\"phone\":\"+971507184116\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":3,\"description\":\"Waiting for confirmation\"},{\"name\":\"Ali Ahmed\",\"phone\":\"+971504652569\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Product was excellent!\"},{\"name\":\"Sara Al Mansoori\",\"phone\":\"+971509616229\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Very satisfied with the order\"},{\"name\":\"Mohammed Ali\",\"phone\":\"+971503499333\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":2,\"description\":\"Order is delayed\"},{\"name\":\"Fatima Zahra\",\"phone\":\"+971507475454\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Good, but expected faster delivery\"},{\"name\":\"Omar Khalid\",\"phone\":\"+971555555747\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Product was as expected\"},{\"name\":\"Layla Ahmed\",\"phone\":\"+971563220246\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":3,\"description\":\"Not yet received\"},{\"name\":\"Ayesha Al Zayed\",\"phone\":\"+971524120000\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Awesome quality and service\"},{\"name\":\"Khalid Saeed\",\"phone\":\"+971566681662\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":3,\"description\":\"Received product, but packaging was damaged\"}]",
    "showProductSales": false,
    "arabicName": "حرير جاكارد",
    "subCategories": [
      {
        "title": "",
        "titleAr": "حرير جاكارد",
        "value": "1713965880443-4",
        "label": "- حرير جاكارد",
        "id": "1739787560473"
      }
    ]
  },
  {
    "createdAt": 1671533200000, // 20 dec 2022
    "acceptInternationalDelivery": true,
    "subCategories": [
      {
        "titleAr": "حرير مطفي",
        "title": "",
        "label": "- حرير مطفي",
        "value": "1713965880443-5",
        "id": "1739787573055"
      }
    ],
    "size": "",
    "productWithOutVat": false,
    "arabicName": "حرير مطفي",
    "name": "Matte Silk",
    "arabicDescription": "",
    "newPrice": 0,
    "subCategory": "",
    "video": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B1?alt=media&token=b03a4a3b-2ffe-430f-b2bc-71082ef0010f",
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B2?alt=media&token=6a96be39-15e8-4ccf-a828-b212802bbb0f",
      "",
      ""
    ],
    "new": false,
    "imgType": "vertical",
    "description": "",
    "seoTitle": "",
    "tagsAr": "",
    "showProductSales": false,
    "packages": false,
    "cost": "47",
    "sales": false,
    "ribbon": "",
    "reviews": "[{\"name\":\"John Doe\",\"phone\":\"+971504999602\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Great service, fast delivery\"},{\"name\":\"Jane Smith\",\"phone\":\"+971507184116\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":3,\"description\":\"Waiting for confirmation\"},{\"name\":\"Ali Ahmed\",\"phone\":\"+971504652569\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Product was excellent!\"},{\"name\":\"Sara Al Mansoori\",\"phone\":\"+971509616229\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Very satisfied with the order\"},{\"name\":\"Mohammed Ali\",\"phone\":\"+971503499333\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":2,\"description\":\"Order is delayed\"},{\"name\":\"Fatima Zahra\",\"phone\":\"+971507475454\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Good, but expected faster delivery\"},{\"name\":\"Omar Khalid\",\"phone\":\"+971555555747\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":4,\"description\":\"Product was as expected\"},{\"name\":\"Layla Ahmed\",\"phone\":\"+971563220246\",\"statusOrder\":\"Not Paid\",\"paid\":false,\"stars\":3,\"description\":\"Not yet received\"},{\"name\":\"Ayesha Al Zayed\",\"phone\":\"+971524120000\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":5,\"description\":\"Awesome quality and service\"},{\"name\":\"Khalid Saeed\",\"phone\":\"+971566681662\",\"statusOrder\":\"Paid\",\"paid\":true,\"stars\":3,\"description\":\"Received product, but packaging was damaged\"}]",
    "id": "1728593525203",
    "popular": false,
    "options": null,
    "categoryId": "1713965880443",
    "price": 105,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B1?alt=media&token=b03a4a3b-2ffe-430f-b2bc-71082ef0010f",
      "https://firebasestorage.googleapis.com/v0/b/swipetapfreetrail.appspot.com/o/elbogshah%2Fproduct%2F%D8%AD%D8%B1%D9%8A%D8%B1%20%D9%85%D8%B7%D9%81%D9%8A%2F1728593525203%2B2?alt=media&token=6a96be39-15e8-4ccf-a828-b212802bbb0f",
      "",
      ""
    ],
    "quantity": "",
    "inStock": true,
    "tagsEn": "",
    "productQuantity": "1",
    "hide": false,
    "productSold": 0
  }
]