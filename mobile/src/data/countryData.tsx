import type { ImageSourcePropType } from 'react-native';

export type ImageSource = ImageSourcePropType;

export type QuickFact = {
  label: string;
  value: string;
  iconName?: string;
  icon?: string;
  iconColor?: string;
};;

export type Attraction = {
  id: string;
  name: string;
  image: ImageSource;
  rating: number;
  location: string;
};

export type City = {
  id: string;
  name: string;
  image: ImageSource;
  description: string;
};

export type Food = {
  id: string;
  name: string;
  image: ImageSource;
  description: string;
};

export type Country = {
  id: string;
  name: string;
  flag: string;
  subtitle: string;
  heroImage: ImageSource;
  about: {
    title: string;
    description: string;
    image: ImageSource;
  };
  quickFacts: QuickFact[];
  attractions: Attraction[];
  cities: City[];
  foods: Food[];
};

/* =========================================
   IMAGE HELPERS
========================================= */

const image = (uri: string): ImageSource => ({
  uri,
});

const unsplash = (
  id: string,
  width = 800,
  height = 600,
) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=85`;

/*
  Các ảnh dưới đây là ảnh trực tiếp từ Unsplash.
  Mỗi mục sẽ dùng một URL khác nhau.
*/
const imageSources = {
  vietnam: {
    hero: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&h=1000&q=80',
    about: 'https://plus.unsplash.com/premium_photo-1691960159290-6f4ace6e6c4c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Hội An
    attractions: [
      unsplash('photo-1528127269322-539801943592'), // Vịnh Hạ Long
      'https://plus.unsplash.com/premium_photo-1690960644375-6f2399a08ebc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Hội An
      'https://images.unsplash.com/photo-1732098407342-6b6a05e3da3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Sapa
      'https://images.unsplash.com/photo-1558002890-c0b30998d1e6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Đà Nẵng / biển
    ],
    cities: [
      unsplash('photo-1528127269322-539801943592'), // Hạ Long
      'https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Hà Nội / phố cổ
      'https://images.unsplash.com/photo-1674296067534-0f9769040781?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Đà Nẵng
      'https://images.unsplash.com/photo-1558334466-afce6bf36c69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',   // Hội An
    ],
    foods: [
      unsplash('photo-1582878826629-29b7ad1cdc43'), // Phở
      'https://images.unsplash.com/photo-1677354469642-3e4fc5dbbb4a?q=80&w=1959&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Bánh mì
      'https://images.unsplash.com/photo-1583316175701-0bc5f25a0a44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Bún chả
      'https://images.unsplash.com/photo-1734771308348-ad90bf5835ec?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Gỏi cuốn
      'https://images.unsplash.com/photo-1664515725354-d026e950f44c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Cà phê
    ],
  },

  japan: {
    hero: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&h=1000&q=80',
    about: unsplash('photo-1528360983277-13d401cdc186'),
    attractions: [
      unsplash('photo-1490806843957-31f4c9a91c65'), // Mount Fuji
      unsplash('photo-1478436127897-769e1b3f0f36'), // Fushimi Inari
      unsplash('photo-1536098561742-ca998e48cbcc'), // Tokyo
      unsplash('photo-1545569341-9eb8b30979d9'),   // Kinkaku-ji
    ],
    cities: [
      unsplash('photo-1540959733332-eab4deabeeaf'), // Tokyo
      unsplash('photo-1590559899731-a382839e5549'), // Osaka
      unsplash('photo-1493976040374-85c8e12f0c0e'), // Kyoto
      'https://images.unsplash.com/photo-1619338360476-37195f14909e?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Sapporo / Hiroshima
    ],
    foods: [
      unsplash('photo-1579871494447-9811cf80d66c'), // Sushi
      unsplash('photo-1569718212165-3a8278d5f624'), // Ramen
      'https://plus.unsplash.com/premium_photo-1722593856742-085ef5549070?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Takoyaki
      'https://plus.unsplash.com/premium_photo-1732753629952-f692c4789a33?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Tempura
      'https://plus.unsplash.com/premium_photo-1722593856216-a2c1d3271e1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Wagyu
    ],
  },

  france: {
    hero: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85', // Eiffel Tower
    about: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=85',
    attractions: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=85', // Eiffel Tower
      'https://images.unsplash.com/photo-1655573293252-740f354a6756?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Louvre
      'https://images.unsplash.com/photo-1591828353335-197466da2a4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Versailles style
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=85', // Mont Saint-Michel style
    ],
    cities: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=85', // Paris
      'https://images.unsplash.com/photo-1643914729809-4aa59fdc4c17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Nice
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=85', // Lyon
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=85', // Bordeaux
    ],
    foods: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85', // Croissant
      'https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=800&q=85', // Baguette
      'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&w=800&q=85', // Ratatouille
      'https://images.unsplash.com/photo-1582995570162-9dee25247fda?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Crêpe
      'https://images.unsplash.com/photo-1531594652722-292a43e752b4?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Macaron
    ],
  },

  italy: {
    hero: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=85', // Colosseum
    about: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=85',
    attractions: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=85', // Colosseum
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Venice
      'https://images.unsplash.com/photo-1598910332865-0a6b066d5602?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Pisa
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=85', // Trevi Fountain
    ],
    cities: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=85', // Rome
      'https://plus.unsplash.com/premium_photo-1661963047742-dabc5a735357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Venice
      'https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Milan
      'https://images.unsplash.com/photo-1476362174823-3a23f4aa6d76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Florence
    ],
    foods: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85', // Pizza
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85', // Pasta
      'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=85', // Gelato
      'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=800&q=85', // Risotto
      'https://images.unsplash.com/photo-1639744211487-b27e3551b07c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Tiramisu style
    ],
  },

  egypt: {
    hero: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Kim tự tháp Giza hoàng hôn
    about: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=85', // Tượng Nhân sư và Kim tự tháp
    attractions: [
      'https://images.unsplash.com/photo-1600520611035-84157ad4084d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Sphinx & Giza
      'https://images.unsplash.com/photo-1669301038557-f84309ac1269?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Đền Luxor cổ kính
      'https://images.unsplash.com/photo-1519852476561-ec618b0183ba?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Cưỡi lạc đà trên sa mạc Ai Cập
      'https://images.unsplash.com/photo-1553835569-40485611296c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Sông Nile huyền thoại
    ],
    cities: [
      'https://plus.unsplash.com/premium_photo-1697729777503-5a6ff8d6d877?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Thủ đô Cairo
      'https://plus.unsplash.com/premium_photo-1661963854938-e69a4e65c1e3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Thành phố Luxor
      'https://images.unsplash.com/photo-1594808815295-52034d585f56?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Alexandria ven Địa Trung Hải
      'https://images.unsplash.com/photo-1738580426867-03fa8c8b5288?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Giza cityscape
    ],
    foods: [
      'https://everylittlecrumb.com/wp-content/uploads/koshary-3.jpg', // Koshary (Món quốc hồn quốc túy Ai Cập)
      'https://images.unsplash.com/photo-1701688596783-231b3764ef67?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Falafel thơm giòn
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLGP6d6w0NLRqoXlgu21Pj4H9JktrAVrSWTksQSJQ1_YF2LacGnKVdLHk&s=10', // Bánh mì dẹt truyền thống Trung Đông
      'https://images.unsplash.com/photo-1719282431565-3b30bb7d2658?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Thịt nướng Kebab/Kofta
    ],
  },

  southAfrica: {
    hero: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85', // Table Mountain, Cape Town
    about: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85', // Động vật hoang dã Safari
    attractions: [
      'https://images.unsplash.com/photo-1637083963580-9383f3b835bd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Table Mountain
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85', // Safari wildlife (Hươu cao cổ/Thú rừng)
      'https://images.unsplash.com/photo-1721137158885-b92a4f8b641d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Bãi biển Camps Bay, Cape Town
      'https://images.unsplash.com/photo-1565104013743-e8426eb9de33?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D5', // Thiên nhiên hoang dã Nam Phi
    ],
    cities: [
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=85', // Cape Town
      'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Johannesburg
      'https://plus.unsplash.com/premium_photo-1742418150348-371701631845?q=80&w=1989&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ', // Durban
      'https://www.safariwithus.com/wp-content/uploads/2019/11/Pretoria-08-1030x687.jpg', // Pretoria
    ],
    foods: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCOPXNe6dGDTFll9WnHVXc14Jl5LnfZiCgp459kfdb233qlGb2_wFzsGlw&s=10', // Braai (Tiệc thịt nướng Nam Phi)
      'https://images.unsplash.com/photo-1652209695374-7a91c243f12f?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Sườn nướng BBQ đậm vị
      'https://slaghuis.co.uk/wp-content/uploads/2019/01/boerewors1.jpg', // Món ăn đặc sản địa phương
      'https://www.pantsdownapronson.com/wp-content/uploads/south-african-malva-pudding.jpg', // Potjiekos (Món hầm truyền thống)
    ],
  },

  usa: {
    hero: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=85', // Tượng Nữ thần Tự do, New York
    about: 'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=800&q=85', // Times Square, New York về đêm
    attractions: [
      'https://images.unsplash.com/photo-1588384153148-ebd739ac430c?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Statue of Liberty
      'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Grand Canyon
      'https://images.unsplash.com/photo-1595901688281-9cef114adb0b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1521747116042-5a810fda9664?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Cầu Golden Gate, San Francisco
    ],
    cities: [
      'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=800&q=85', // New York
      'https://images.unsplash.com/photo-1609924211018-5526c55bad5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // San Francisco
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1244&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Los Angeles
      'https://images.unsplash.com/photo-1610494475096-ad11c3a21638?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Chicago
    ],
    foods: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85', // Cheeseburger Mỹ
      'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=85', // Pizza kiểu Mỹ
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85', // Texas BBQ Ribs
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=85', // Bánh kếp mật phong (Pancakes)
    ],
  },

  canada: {
    hero: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=85', // Công viên quốc gia Banff & hồ xanh
    about: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=85', // Thành phố Toronto / CN Tower
    attractions: [
      'https://plus.unsplash.com/premium_photo-1697730069404-280d3289650f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ', // Thác Niagara hùng vĩ
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=85', // Banff National Park
      'https://images.unsplash.com/photo-1588733103629-b77afe0425ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Hồ Lake Louise
      'https://images.unsplash.com/photo-1638848424383-c59f174814ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Cảnh quan thiên nhiên Rocky Mountains
    ],
    cities: [
      'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=85', // Toronto
      'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=1218&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Vancouver
      'https://images.unsplash.com/photo-1470181942237-78ce33fec141?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Montreal cổ kính
      'https://images.unsplash.com/photo-1599457480385-83984b998663?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Calgary / Banff area
    ],
    foods: [
      'https://images.unsplash.com/photo-1647482770207-4e8f5ba7b33e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Poutine (Khoai tây chiên sốt phô mai đặc sản Canada)
      'https://images.unsplash.com/photo-1552314971-d2feb3513949?q=80&w=661&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Montreal Smoked Meat
      'https://images.unsplash.com/photo-1559058789-672da06263d8?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Món ăn truyền thống
      'https://images.unsplash.com/photo-1548586832-45302f8374ea?q=80&w=1247&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Maple Syrup Pancakes (Bánh kếp siro phong)
    ],
  },

  brazil: {
    hero: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=85', // Tượng Chúa cứu thế, Rio de Janeiro
    about: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=800&q=85', // Bãi biển Copacabana
    attractions: [
      'https://images.unsplash.com/photo-1700677866571-43199bcbc593?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Christ the Redeemer
      'https://images.unsplash.com/photo-1630410139620-15d3a0791a5b?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1538703012804-b74999aa11b9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1550574364-981d838fa2f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    cities: [
      'https://plus.unsplash.com/premium_photo-1671211307997-f4f552b0601c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1554168848-228452c09d60?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1621693247912-767f47a3c382?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    foods: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLL0keC9O2_3sFDWnpdDMfxkGrD81qhekw8c-6V4avXQ&s=10',
      'https://plus.unsplash.com/premium_photo-1693086421089-847b0a2724f8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1675365352000-0ed2b799d7b3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2h1cnJhc2NvfGVufDB8fDB8fHww',
    ],
  },
  argentina: {
    hero: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1200&q=85',
    about: 'https://images.unsplash.com/photo-1592593640541-9363711fdb2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJnZW50aW5hfGVufDB8fDB8fHww',
    attractions: [
      'https://images.unsplash.com/photo-1552751753-0fc84ae5b6c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1571767750278-ba308a7b4da4?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1721351259165-8893a68424f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnQlMjBmaXR6JTIwcm95fGVufDB8fDB8fHww',
    ],
    cities: [
      'https://images.unsplash.com/photo-1725499267114-15531716d101?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1697729859616-de0cceead7d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVuZG96YXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1598162461164-5cb059c382c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyaWxvY2hlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1615656637621-5aa19f1ef847?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    foods: [
      'https://images.unsplash.com/photo-1624128082323-beb6b8b508db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wYW5hZGFzfGVufDB8fDB8fHww',
      'https://plus.unsplash.com/premium_photo-1663036447682-8f0d918adbed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1705512557389-841efbde54db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvcmlwYW58ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1729673520714-24d728e12cac?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  australia: {
    hero: 'https://plus.unsplash.com/premium_photo-1697730221799-f2aa87ab2c5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXVzdHJhbGlhfGVufDB8fDB8fHww',
    about: 'https://images.unsplash.com/photo-1524820197278-540916411e20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXVzdHJhbGlhfGVufDB8fDB8fHww',
    attractions: [
      'https://images.unsplash.com/photo-1526958977630-bc61b30a2009?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF1c3RyYWxpYXxlbnwwfHwwfHx8MA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1701085275737-99c0abca10a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlYXRlJTIwYmFycmllciUyMHJlZWZ8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWx1cnV8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1551955682-78a3c53ab544?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9uZGklMjBiZWFjaHxlbnwwfHwwfHx8MA%3D%3D',
    ],
    cities: [
      'https://plus.unsplash.com/premium_photo-1697730198238-48ee2f2fe1b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3lkbmV5fGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVsYm91cm5lfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1566734904496-9309bb1798ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJpc2JhbmV8ZW58MHx8MHx8fDA%3D',
      'https://plus.unsplash.com/premium_photo-1697729743874-1d9d21ee467d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVydGh8ZW58MHx8MHx8fDA%3D',
    ],
    foods: [
      'https://plus.unsplash.com/premium_photo-1694981405366-0ffd13044535?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVhdCUyMHBpZXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1634324040880-63dbf9a4e5ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGF2bG92YXxlbnwwfHwwfHx8MA%3D%3D',
      'https://media.istockphoto.com/id/1096814706/photo/traditional-lamington-cakes-or-dessert-for-australia-day-party.webp?a=1&b=1&s=612x612&w=0&k=20&c=L_B4JxwrrWApHfV6_cqhTRyv4hsHS8xzLmPtnipi9UM=',
      'https://plus.unsplash.com/premium_photo-1731287745206-d8077ce4322d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmlzaCUyMGFuZCUyMGNoJUMzJUFEcHxlbnwwfHwwfHx8MA%3D%3D',
    ],
  },
  newZealand: {
    hero: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=85',
    about: 'https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?q=80&w=989&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    attractions: [
      'https://plus.unsplash.com/premium_photo-1661882273771-2d9a593a2a60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWlsZm9yZCUyMHNvdW5kfGVufDB8fDB8fHww',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TMvoE7GCr9gvFh91Z2xY4Vhn4sopfG4ZwKc64bC9pg&s=10',
      'https://images.unsplash.com/photo-1612038032672-b94a10ce7ebd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMHRla2Fwb3xlbnwwfHwwfHx8MA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661885413762-341e689bd8a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnQlMjBjb29rfGVufDB8fDB8fHww',
    ],
    cities: [
      'https://images.unsplash.com/photo-1600466403153-50193d187dde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVlZW5zdG93bnxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1595125990323-885cec5217ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXVja2xhbmR8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1639508693225-02abb67ecf0f?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1609846615884-61b22397f31a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIwemVhbGFuZCUyMGNocmlzdGNodXJjaHxlbnwwfHwwfHx8MA%3D%3D',
    ],
    foods: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2_7aIqb0cOPlvulaR_lTIsywBIs2YftxaCUHC8jT_ZQ&s=10 ',
      'https://images.unsplash.com/photo-1702744754798-4a1d980b03e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGF2bG92YXxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1670819916757-e8d5935a6c65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmV3JTIwemVhbGFuZCUyMGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1693156020329-7d2d787e4fdd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8R3JlZW4tTGlwcGVkJTIwTXVzc2Vsc3xlbnwwfHwwfHx8MA%3D%3D',
    ],
  },
};
/* =========================================
   DATA HELPERS
========================================= */

const createQuickFacts = (
  capital: string,
  currency: string,
  language: string,
  bestTime: string,
  timeZone: string,
  visa: string,
): QuickFact[] => [
    {
      iconName: 'office-building-outline',
      iconColor: '#A855F7',
      label: 'Capital',
      value: capital,
    },
    {
      iconName: 'cash',
      iconColor: '#16A34A',
      label: 'Currency',
      value: currency,
    },
    {
      iconName: 'message-text',
      iconColor: '#2563EB',
      label: 'Language',
      value: language,
    },
    {
      iconName: 'calendar-month',
      iconColor: '#F97316',
      label: 'Best Time',
      value: bestTime,
    },
    {
      iconName: 'clock-outline',
      iconColor: '#9333EA',
      label: 'Time Zone',
      value: timeZone,
    },
    {
      iconName: 'passport',
      iconColor: '#0D9488',
      label: 'Visa',
      value: visa,
    },
  ];

const createAttractions = (
  countryId: string,
  names: string[],
  images: string[],
  location: string,
): Attraction[] =>
  names.map((name, index) => ({
    id: `${countryId}-attraction-${index + 1}`,
    name,
    image: image(images[index] ?? images[0]),
    rating: Number((4.9 - index * 0.1).toFixed(1)),
    location,
  }));

const createCities = (
  countryId: string,
  names: string[],
  images: string[],
): City[] =>
  names.map((name, index) => ({
    id: `${countryId}-city-${index + 1}`,
    name,
    image: image(images[index] ?? images[0]),
    description:
      index === 0
        ? 'A popular destination with beautiful scenery and unique local culture.'
        : 'A fascinating city with memorable experiences for travellers.',
  }));

const createFoods = (
  countryId: string,
  names: string[],
  images: string[],
): Food[] =>
  names.map((name, index) => ({
    id: `${countryId}-food-${index + 1}`,
    name,
    image: image(images[index] ?? images[0]),
    description:
      index === 0
        ? 'A delicious traditional dish worth trying.'
        : 'A popular local food worth trying.',
  }));

type CountryConfig = {
  id: string;
  name: string;
  flag: string;
  subtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  imageSet: keyof typeof imageSources;
  facts: [string, string, string, string, string, string];
  attractions: string[];
  attractionLocation: string;
  cities: string[];
  foods: string[];
};

const createCountry = (config: CountryConfig): Country => {
  const source = imageSources[config.imageSet];

  return {
    id: config.id,
    name: config.name,
    flag: config.flag,
    subtitle: config.subtitle,
    heroImage: image(source.hero),

    about: {
      title: config.aboutTitle,
      description: config.aboutDescription,
      image: image(source.about),
    },

    quickFacts: createQuickFacts(...config.facts),

    attractions: createAttractions(
      config.imageSet,
      config.attractions,
      source.attractions,
      config.attractionLocation,
    ),

    cities: createCities(
      config.imageSet,
      config.cities,
      source.cities,
    ),

    foods: createFoods(
      config.imageSet,
      config.foods,
      source.foods,
    ),
  };
};

/* =========================================
   COUNTRIES
========================================= */

const destinations: Record<string, Country> = {
  '1': createCountry({
    id: '1',
    name: 'Việt Nam',
    flag: '🇻🇳',
    subtitle: 'Vẻ đẹp bất tận',
    aboutTitle: 'About Việt Nam',
    aboutDescription:
      'Việt Nam là đất nước sở hữu cảnh quan thiên nhiên đa dạng, nền văn hoá lâu đời và ẩm thực phong phú. Từ những bãi biển tuyệt đẹp đến các thành phố sôi động, Việt Nam mang đến nhiều trải nghiệm đáng nhớ.',
    imageSet: 'vietnam',
    facts: [
      'Hà Nội',
      'VND (₫)',
      'Vietnamese',
      'Mar – May',
      'GMT +7',
      'Visa available',
    ],
    attractions: [
      'Vịnh Hạ Long',
      'Phố cổ Hội An',
      'Sapa',
      'Đà Nẵng',
    ],
    attractionLocation: 'Việt Nam',
    cities: ['Hạ Long', 'Hà Nội', 'Đà Nẵng', 'Hội An'],
    foods: ['Phở', 'Bánh mì', 'Bún chả', 'Gỏi cuốn', 'Cà phê'],
  }),

  '2': createCountry({
    id: '2',
    name: 'Nhật Bản',
    flag: '🇯🇵',
    subtitle: 'Đất nước mặt trời mọc',
    aboutTitle: 'About Nhật Bản',
    aboutDescription:
      'Nhật Bản là nơi truyền thống cổ xưa giao thoa với công nghệ hiện đại. Những ngôi đền yên bình, cảnh sắc thiên nhiên tuyệt đẹp, thành phố sôi động và nền ẩm thực đặc sắc tạo nên những trải nghiệm khó quên.',
    imageSet: 'japan',
    facts: [
      'Tokyo',
      'JPY (¥)',
      'Japanese',
      'Mar – May',
      'GMT +9',
      'Visa Free',
    ],
    attractions: [
      'Mount Fuji',
      'Fushimi Inari Shrine',
      'Tokyo Tower',
      'Kinkaku-ji Temple',
    ],
    attractionLocation: 'Japan',
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo', 'Hiroshima'],
    foods: ['Sushi', 'Ramen', 'Takoyaki', 'Tempura', 'Wagyu'],
  }),

  '3': createCountry({
    id: '3',
    name: 'Pháp',
    flag: '🇫🇷',
    subtitle: 'Nghệ thuật, thời trang và tình yêu',
    aboutTitle: 'About Pháp',
    aboutDescription:
      'Pháp nổi tiếng với nghệ thuật, kiến trúc, thời trang và nền ẩm thực tinh tế. Từ Paris lãng mạn đến những vùng nông thôn yên bình, Pháp luôn đem đến những trải nghiệm đáng nhớ.',
    imageSet: 'france',
    facts: [
      'Paris',
      'Euro (€)',
      'French',
      'Apr – Jun',
      'GMT +1',
      'Visa required',
    ],
    attractions: [
      'Eiffel Tower',
      'Louvre Museum',
      'Palace of Versailles',
      'Mont Saint-Michel',
    ],
    attractionLocation: 'France',
    cities: ['Paris', 'Nice', 'Lyon', 'Bordeaux'],
    foods: ['Croissant', 'Baguette', 'Ratatouille', 'Crêpe', 'Macaron'],
  }),

  '4': createCountry({
    id: '4',
    name: 'Ý',
    flag: '🇮🇹',
    subtitle: 'Nghệ thuật, lịch sử và ẩm thực',
    aboutTitle: 'About Ý',
    aboutDescription:
      'Ý là điểm đến lý tưởng cho những ai yêu thích lịch sử, nghệ thuật, kiến trúc và ẩm thực. Mỗi thành phố tại Ý đều mang một vẻ đẹp và câu chuyện riêng.',
    imageSet: 'italy',
    facts: [
      'Rome',
      'Euro (€)',
      'Italian',
      'Apr – Jun',
      'GMT +1',
      'Visa required',
    ],
    attractions: [
      'Colosseum',
      'Venice Canals',
      'Leaning Tower of Pisa',
      'Trevi Fountain',
    ],
    attractionLocation: 'Italy',
    cities: ['Rome', 'Venice', 'Milan', 'Florence'],
    foods: ['Pizza', 'Pasta', 'Gelato', 'Risotto', 'Tiramisu'],
  }),

  '5': createCountry({
    id: '5',
    name: 'Ai Cập',
    flag: '🇪🇬',
    subtitle: 'Vùng đất của các Pharaoh',
    aboutTitle: 'About Ai Cập',
    aboutDescription:
      'Ai Cập là vùng đất có lịch sử hàng nghìn năm, nổi tiếng với các kim tự tháp, sông Nile và nền văn minh cổ đại.',
    imageSet: 'egypt',
    facts: [
      'Cairo',
      'EGP',
      'Arabic',
      'Oct – Apr',
      'GMT +2',
      'Visa available',
    ],
    attractions: [
      'Pyramids of Giza',
      'The Sphinx',
      'Nile River',
      'Egyptian Museum',
    ],
    attractionLocation: 'Egypt',
    cities: ['Cairo', 'Luxor', 'Alexandria', 'Aswan'],
    foods: ['Koshari', 'Falafel', 'Ful Medames', 'Shawarma'],
  }),

  '6': createCountry({
    id: '6',
    name: 'Nam Phi',
    flag: '🇿🇦',
    subtitle: 'Thiên nhiên hoang dã và đa dạng',
    aboutTitle: 'About Nam Phi',
    aboutDescription:
      'Nam Phi gây ấn tượng với cảnh quan thiên nhiên hùng vĩ, động vật hoang dã, những bãi biển đẹp và nền văn hoá đa dạng.',
    imageSet: 'southAfrica',
    facts: [
      'Pretoria',
      'ZAR',
      'English',
      'May – Sep',
      'GMT +2',
      'Visa available',
    ],
    attractions: [
      'Table Mountain',
      'Kruger National Park',
      'Boulders Beach',
      'Cape Point',
    ],
    attractionLocation: 'South Africa',
    cities: ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria'],
    foods: ['Bobotie', 'Biltong', 'Boerewors', 'Malva Pudding'],
  }),

  '7': createCountry({
    id: '7',
    name: 'Hoa Kỳ',
    flag: '🇺🇸',
    subtitle: 'Đất nước của những cơ hội',
    aboutTitle: 'About Hoa Kỳ',
    aboutDescription:
      'Hoa Kỳ có những thành phố hiện đại, công viên quốc gia rộng lớn và nền văn hoá đa dạng. Đây là điểm đến phù hợp cho nhiều phong cách du lịch.',
    imageSet: 'usa',
    facts: [
      'Washington, D.C.',
      'USD ($)',
      'English',
      'Apr – Jun',
      'GMT -5',
      'Visa required',
    ],
    attractions: [
      'Statue of Liberty',
      'Grand Canyon',
      'Times Square',
      'Golden Gate Bridge',
    ],
    attractionLocation: 'United States',
    cities: ['New York', 'Los Angeles', 'Chicago', 'San Francisco'],
    foods: ['Burger', 'New York Pizza', 'BBQ Ribs', 'Pancakes'],
  }),

  '8': createCountry({
    id: '8',
    name: 'Canada',
    flag: '🇨🇦',
    subtitle: 'Thiên nhiên rộng lớn',
    aboutTitle: 'About Canada',
    aboutDescription:
      'Canada nổi tiếng với những hồ nước trong xanh, núi non hùng vĩ, thành phố thân thiện và thiên nhiên rộng lớn.',
    imageSet: 'canada',
    facts: [
      'Ottawa',
      'CAD ($)',
      'English',
      'Jun – Sep',
      'GMT -5',
      'Visa required',
    ],
    attractions: [
      'Niagara Falls',
      'Banff National Park',
      'CN Tower',
      'Lake Louise',
    ],
    attractionLocation: 'Canada',
    cities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
    foods: ['Poutine', 'Maple Syrup', 'Salmon', 'Butter Tart'],
  }),

  '9': createCountry({
    id: '9',
    name: 'Brazil',
    flag: '🇧🇷',
    subtitle: 'Năng lượng, âm nhạc và lễ hội',
    aboutTitle: 'About Brazil',
    aboutDescription:
      'Brazil là quốc gia sôi động với những bãi biển nổi tiếng, lễ hội Carnival, âm nhạc đặc sắc và cảnh quan thiên nhiên đa dạng.',
    imageSet: 'brazil',
    facts: [
      'Brasília',
      'BRL (R$)',
      'Portuguese',
      'Dec – Mar',
      'GMT -3',
      'Visa available',
    ],
    attractions: [
      'Christ the Redeemer',
      'Copacabana Beach',
      'Iguazu Falls',
      'Sugarloaf Mountain',
    ],
    attractionLocation: 'Brazil',
    cities: ['Rio de Janeiro', 'São Paulo', 'Salvador'],
    foods: ['Feijoada', 'Pão de Queijo', 'Açaí', 'Churrasco'],
  }),

  '10': createCountry({
    id: '10',
    name: 'Argentina',
    flag: '🇦🇷',
    subtitle: 'Tango, thiên nhiên và đam mê',
    aboutTitle: 'About Argentina',
    aboutDescription:
      'Argentina mang đến sự kết hợp giữa những thành phố quyến rũ, điệu Tango, núi non hùng vĩ và nền ẩm thực nổi tiếng.',
    imageSet: 'argentina',
    facts: [
      'Buenos Aires',
      'ARS',
      'Spanish',
      'Oct – Apr',
      'GMT -3',
      'Visa available',
    ],
    attractions: [
      'Perito Moreno Glacier',
      'Recoleta Cemetery',
      'Mount Fitz Roy',
    ],
    attractionLocation: 'Argentina',
    cities: ['Buenos Aires', 'Mendoza', 'Bariloche', 'Ushuaia'],
    foods: ['Empanadas', 'Asado', 'Choripán', 'Dulce de Leche'],
  }),

  '11': createCountry({
    id: '11',
    name: 'Úc',
    flag: '🇦🇺',
    subtitle: 'Biển xanh và những thành phố hiện đại',
    aboutTitle: 'About Úc',
    aboutDescription:
      'Úc nổi tiếng với những bãi biển tuyệt đẹp, thành phố hiện đại, động vật đặc hữu và những vùng thiên nhiên rộng lớn.',
    imageSet: 'australia',
    facts: [
      'Canberra',
      'AUD ($)',
      'English',
      'Sep – Nov',
      'GMT +10',
      'Visa required',
    ],
    attractions: [
      'Sydney Opera House',
      'Great Barrier Reef',
      'Uluru',
      'Bondi Beach',
    ],
    attractionLocation: 'Australia',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    foods: ['Meat Pie', 'Pavlova', 'Lamington', 'Fish and Chips'],
  }),

  '12': createCountry({
    id: '12',
    name: 'New Zealand',
    flag: '🇳🇿',
    subtitle: 'Thiên nhiên nguyên sơ',
    aboutTitle: 'About New Zealand',
    aboutDescription:
      'New Zealand là điểm đến lý tưởng cho những người yêu thiên nhiên, phiêu lưu và những khung cảnh núi non, hồ nước tuyệt đẹp.',
    imageSet: 'newZealand',
    facts: [
      'Wellington',
      'NZD ($)',
      'English',
      'Dec – Feb',
      'GMT +12',
      'Visa required',
    ],
    attractions: [
      'Milford Sound',
      'Hobbiton',
      'Lake Tekapo',
      'Mount Cook',
    ],
    attractionLocation: 'New Zealand',
    cities: ['Queenstown', 'Auckland', 'Wellington', 'Christchurch'],
    foods: ['Hāngi', 'Pavlova', 'Fruits', 'Green-Lipped Mussels'],
  }),
};

export default destinations;