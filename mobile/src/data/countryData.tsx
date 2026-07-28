export type QuickFact = {
  label: string;
  value: string;
  iconName: string;
  iconColor: string;
};

export type Attraction = {
  id: string;
  name: string;
  image: { uri: string };
  rating: number;
  location: string;
};

export type City = {
  id: string;
  name: string;
  image: { uri: string };
  description: string;
};

export type Food = {
  id: string;
  name: string;
  image: { uri: string };
  description: string;
};

export type Country = {
  id: string;
  name: string;
  flag: string;
  subtitle: string;
  heroImage: { uri: string };

  about: {
    title: string;
    description: string;
    image: { uri: string };
  };

  quickFacts: QuickFact[];
  attractions: Attraction[];
  cities: City[];
  foods: Food[];
};

const imageSources = {
  vietnam:
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&h=1000&q=80',

  japan:
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&h=1000&q=80',

  france:
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&h=1000&q=80',

  italy:
    'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800&h=1000&q=80',

  egypt:
    'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&h=1000&q=80',

  southAfrica:
    'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&h=1000&q=80',

  usa:
    'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=800&h=1000&q=80',

  canada:
    'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&h=1000&q=80',

  brazil:
    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&h=1000&q=80',

  argentina:
    'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&h=1000&q=80',

  australia:
    'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',

  newZealand:
    'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&h=1000&q=80',
};

const image = (uri: string) => ({ uri });

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
  countryImage: { uri: string },
  places: string[],
  location: string,
): Attraction[] =>
  places.map((name, index) => ({
    id: `${countryId}-attraction-${index + 1}`,
    name,
    image: countryImage,
    rating: Number((4.9 - index * 0.1).toFixed(1)),
    location,
  }));

const createCities = (
  countryId: string,
  countryImage: { uri: string },
  cities: string[],
): City[] =>
  cities.map((name, index) => ({
    id: `${countryId}-city-${index + 1}`,
    name,
    image: countryImage,
    description:
      index === 0
        ? 'A popular destination with beautiful scenery and unique local culture.'
        : 'A fascinating city with memorable experiences for travellers.',
  }));

const createFoods = (
  countryId: string,
  countryImage: { uri: string },
  foods: string[],
): Food[] =>
  foods.map((name, index) => ({
    id: `${countryId}-food-${index + 1}`,
    name,
    image: countryImage,
    description:
      index === 0
        ? `A delicious traditional dish from ${countryId}.`
        : 'A popular local food worth trying.',
  }));

const destinations: Record<string, Country> = {
  '1': {
    id: '1',
    name: 'Việt Nam',
    flag: '🇻🇳',
    subtitle: 'Vẻ đẹp bất tận',
    heroImage: image(imageSources.vietnam),

    about: {
      title: 'About Việt Nam',
      description:
        'Việt Nam là đất nước sở hữu cảnh quan thiên nhiên đa dạng, nền văn hoá lâu đời và ẩm thực phong phú. Từ những bãi biển tuyệt đẹp đến các thành phố sôi động, Việt Nam mang đến nhiều trải nghiệm đáng nhớ.',
      image: image(imageSources.vietnam),
    },

    quickFacts: createQuickFacts(
      'Hà Nội',
      'VND (₫)',
      'Vietnamese',
      'Mar – May',
      'GMT +7',
      'Visa available',
    ),

    attractions: createAttractions(
      'vietnam',
      image(imageSources.vietnam),
      ['Vịnh Hạ Long', 'Phố cổ Hội An', 'Sapa', 'Đà Nẵng'],
      'Việt Nam',
    ),

    cities: createCities(
      'vietnam',
      image(imageSources.vietnam),
      ['Hạ Long', 'Hà Nội', 'Đà Nẵng', 'Hội An'],
    ),

    foods: createFoods(
      'vietnam',
      image(imageSources.vietnam),
      ['Phở', 'Bánh mì', 'Bún chả', 'Gỏi cuốn', 'Cà phê'],
    ),
  },

  '2': {
    id: '2',
    name: 'Nhật Bản',
    flag: '🇯🇵',
    subtitle: 'Đất nước mặt trời mọc',
    heroImage: image(imageSources.japan),

    about: {
      title: 'About Nhật Bản',
      description:
        'Nhật Bản là nơi truyền thống cổ xưa giao thoa với công nghệ hiện đại. Những ngôi đền yên bình, cảnh sắc thiên nhiên tuyệt đẹp, thành phố sôi động và nền ẩm thực đặc sắc tạo nên những trải nghiệm khó quên.',
      image: image(imageSources.japan),
    },

    quickFacts: createQuickFacts(
      'Tokyo',
      'JPY (¥)',
      'Japanese',
      'Mar – May',
      'GMT +9',
      'Visa Free',
    ),

    attractions: createAttractions(
      'japan',
      image(imageSources.japan),
      [
        'Mount Fuji',
        'Fushimi Inari Shrine',
        'Tokyo Tower',
        'Kinkaku-ji Temple',
      ],
      'Japan',
    ),

    cities: createCities(
      'japan',
      image(imageSources.japan),
      ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo', 'Hiroshima'],
    ),

    foods: createFoods(
      'japan',
      image(imageSources.japan),
      ['Sushi', 'Ramen', 'Takoyaki', 'Tempura', 'Wagyu'],
    ),
  },

  '3': {
    id: '3',
    name: 'Pháp',
    flag: '🇫🇷',
    subtitle: 'Nghệ thuật, thời trang và tình yêu',
    heroImage: image(imageSources.france),

    about: {
      title: 'About Pháp',
      description:
        'Pháp nổi tiếng với nghệ thuật, kiến trúc, thời trang và nền ẩm thực tinh tế. Từ Paris lãng mạn đến những vùng nông thôn yên bình, Pháp luôn đem đến những trải nghiệm đáng nhớ.',
      image: image(imageSources.france),
    },

    quickFacts: createQuickFacts(
      'Paris',
      'Euro (€)',
      'French',
      'Apr – Jun',
      'GMT +1',
      'Visa required',
    ),

    attractions: createAttractions(
      'france',
      image(imageSources.france),
      [
        'Eiffel Tower',
        'Louvre Museum',
        'Palace of Versailles',
        'Mont Saint-Michel',
      ],
      'France',
    ),

    cities: createCities(
      'france',
      image(imageSources.france),
      ['Paris', 'Nice', 'Lyon', 'Bordeaux'],
    ),

    foods: createFoods(
      'france',
      image(imageSources.france),
      ['Croissant', 'Baguette', 'Ratatouille', 'Crêpe', 'Macaron'],
    ),
  },

  '4': {
    id: '4',
    name: 'Ý',
    flag: '🇮🇹',
    subtitle: 'Nghệ thuật, lịch sử và ẩm thực',
    heroImage: image(imageSources.italy),

    about: {
      title: 'About Ý',
      description:
        'Ý là điểm đến lý tưởng cho những ai yêu thích lịch sử, nghệ thuật, kiến trúc và ẩm thực. Mỗi thành phố tại Ý đều mang một vẻ đẹp và câu chuyện riêng.',
      image: image(imageSources.italy),
    },

    quickFacts: createQuickFacts(
      'Rome',
      'Euro (€)',
      'Italian',
      'Apr – Jun',
      'GMT +1',
      'Visa required',
    ),

    attractions: createAttractions(
      'italy',
      image(imageSources.italy),
      [
        'Colosseum',
        'Venice Canals',
        'Leaning Tower of Pisa',
        'Trevi Fountain',
      ],
      'Italy',
    ),

    cities: createCities(
      'italy',
      image(imageSources.italy),
      ['Rome', 'Venice', 'Milan', 'Florence'],
    ),

    foods: createFoods(
      'italy',
      image(imageSources.italy),
      ['Pizza', 'Pasta', 'Gelato', 'Risotto', 'Tiramisu'],
    ),
  },

  '5': {
    id: '5',
    name: 'Ai Cập',
    flag: '🇪🇬',
    subtitle: 'Vùng đất của các Pharaoh',
    heroImage: image(imageSources.egypt),

    about: {
      title: 'About Ai Cập',
      description:
        'Ai Cập là vùng đất có lịch sử hàng nghìn năm, nổi tiếng với các kim tự tháp, sông Nile và nền văn minh cổ đại.',
      image: image(imageSources.egypt),
    },

    quickFacts: createQuickFacts(
      'Cairo',
      'EGP',
      'Arabic',
      'Oct – Apr',
      'GMT +2',
      'Visa available',
    ),

    attractions: createAttractions(
      'egypt',
      image(imageSources.egypt),
      [
        'Pyramids of Giza',
        'The Sphinx',
        'Nile River',
        'Egyptian Museum',
      ],
      'Egypt',
    ),

    cities: createCities(
      'egypt',
      image(imageSources.egypt),
      ['Cairo', 'Luxor', 'Alexandria', 'Aswan'],
    ),

    foods: createFoods(
      'egypt',
      image(imageSources.egypt),
      ['Koshari', 'Falafel', 'Ful Medames', 'Shawarma'],
    ),
  },

  '6': {
    id: '6',
    name: 'Nam Phi',
    flag: '🇿🇦',
    subtitle: 'Thiên nhiên hoang dã và đa dạng',
    heroImage: image(imageSources.southAfrica),

    about: {
      title: 'About Nam Phi',
      description:
        'Nam Phi gây ấn tượng với cảnh quan thiên nhiên hùng vĩ, động vật hoang dã, những bãi biển đẹp và nền văn hoá đa dạng.',
      image: image(imageSources.southAfrica),
    },

    quickFacts: createQuickFacts(
      'Pretoria',
      'ZAR',
      'English',
      'May – Sep',
      'GMT +2',
      'Visa available',
    ),

    attractions: createAttractions(
      'south-africa',
      image(imageSources.southAfrica),
      [
        'Table Mountain',
        'Kruger National Park',
        'Boulders Beach',
        'Cape Point',
      ],
      'South Africa',
    ),

    cities: createCities(
      'south-africa',
      image(imageSources.southAfrica),
      ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria'],
    ),

    foods: createFoods(
      'south-africa',
      image(imageSources.southAfrica),
      ['Bobotie', 'Biltong', 'Boerewors', 'Malva Pudding'],
    ),
  },

  '7': {
    id: '7',
    name: 'Hoa Kỳ',
    flag: '🇺🇸',
    subtitle: 'Đất nước của những cơ hội',
    heroImage: image(imageSources.usa),

    about: {
      title: 'About Hoa Kỳ',
      description:
        'Hoa Kỳ có những thành phố hiện đại, công viên quốc gia rộng lớn và nền văn hoá đa dạng. Đây là điểm đến phù hợp cho nhiều phong cách du lịch.',
      image: image(imageSources.usa),
    },

    quickFacts: createQuickFacts(
      'Washington, D.C.',
      'USD ($)',
      'English',
      'Apr – Jun',
      'GMT -5',
      'Visa required',
    ),

    attractions: createAttractions(
      'usa',
      image(imageSources.usa),
      [
        'Statue of Liberty',
        'Grand Canyon',
        'Times Square',
        'Golden Gate Bridge',
      ],
      'United States',
    ),

    cities: createCities(
      'usa',
      image(imageSources.usa),
      ['New York', 'Los Angeles', 'Chicago', 'San Francisco'],
    ),

    foods: createFoods(
      'usa',
      image(imageSources.usa),
      ['Burger', 'New York Pizza', 'BBQ Ribs', 'Pancakes'],
    ),
  },

  '8': {
    id: '8',
    name: 'Canada',
    flag: '🇨🇦',
    subtitle: 'Thiên nhiên rộng lớn',
    heroImage: image(imageSources.canada),

    about: {
      title: 'About Canada',
      description:
        'Canada nổi tiếng với những hồ nước trong xanh, núi non hùng vĩ, thành phố thân thiện và thiên nhiên rộng lớn.',
      image: image(imageSources.canada),
    },

    quickFacts: createQuickFacts(
      'Ottawa',
      'CAD ($)',
      'English',
      'Jun – Sep',
      'GMT -5',
      'Visa required',
    ),

    attractions: createAttractions(
      'canada',
      image(imageSources.canada),
      [
        'Niagara Falls',
        'Banff National Park',
        'CN Tower',
        'Lake Louise',
      ],
      'Canada',
    ),

    cities: createCities(
      'canada',
      image(imageSources.canada),
      ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
    ),

    foods: createFoods(
      'canada',
      image(imageSources.canada),
      ['Poutine', 'Maple Syrup', 'Salmon', 'Butter Tart'],
    ),
  },

  '9': {
    id: '9',
    name: 'Brazil',
    flag: '🇧🇷',
    subtitle: 'Năng lượng, âm nhạc và lễ hội',
    heroImage: image(imageSources.brazil),

    about: {
      title: 'About Brazil',
      description:
        'Brazil là quốc gia sôi động với những bãi biển nổi tiếng, lễ hội Carnival, âm nhạc đặc sắc và cảnh quan thiên nhiên đa dạng.',
      image: image(imageSources.brazil),
    },

    quickFacts: createQuickFacts(
      'Brasília',
      'BRL (R$)',
      'Portuguese',
      'Dec – Mar',
      'GMT -3',
      'Visa available',
    ),

    attractions: createAttractions(
      'brazil',
      image(imageSources.brazil),
      [
        'Christ the Redeemer',
        'Copacabana Beach',
        'Iguazu Falls',
        'Sugarloaf Mountain',
      ],
      'Brazil',
    ),

    cities: createCities(
      'brazil',
      image(imageSources.brazil),
      ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Brasília'],
    ),

    foods: createFoods(
      'brazil',
      image(imageSources.brazil),
      ['Feijoada', 'Pão de Queijo', 'Açaí', 'Churrasco'],
    ),
  },

  '10': {
    id: '10',
    name: 'Argentina',
    flag: '🇦🇷',
    subtitle: 'Tango, thiên nhiên và đam mê',
    heroImage: image(imageSources.argentina),

    about: {
      title: 'About Argentina',
      description:
        'Argentina mang đến sự kết hợp giữa những thành phố quyến rũ, điệu Tango, núi non hùng vĩ và nền ẩm thực nổi tiếng.',
      image: image(imageSources.argentina),
    },

    quickFacts: createQuickFacts(
      'Buenos Aires',
      'ARS',
      'Spanish',
      'Oct – Apr',
      'GMT -3',
      'Visa available',
    ),

    attractions: createAttractions(
      'argentina',
      image(imageSources.argentina),
      [
        'Iguazu Falls',
        'Perito Moreno Glacier',
        'Recoleta Cemetery',
        'Mount Fitz Roy',
      ],
      'Argentina',
    ),

    cities: createCities(
      'argentina',
      image(imageSources.argentina),
      ['Buenos Aires', 'Mendoza', 'Bariloche', 'Ushuaia'],
    ),

    foods: createFoods(
      'argentina',
      image(imageSources.argentina),
      ['Empanadas', 'Asado', 'Choripán', 'Dulce de Leche'],
    ),
  },

  '11': {
    id: '11',
    name: 'Úc',
    flag: '🇦🇺',
    subtitle: 'Biển xanh và những thành phố hiện đại',
    heroImage: image(imageSources.australia),

    about: {
      title: 'About Úc',
      description:
        'Úc nổi tiếng với những bãi biển tuyệt đẹp, thành phố hiện đại, động vật đặc hữu và những vùng thiên nhiên rộng lớn.',
      image: image(imageSources.australia),
    },

    quickFacts: createQuickFacts(
      'Canberra',
      'AUD ($)',
      'English',
      'Sep – Nov',
      'GMT +10',
      'Visa required',
    ),

    attractions: createAttractions(
      'australia',
      image(imageSources.australia),
      [
        'Sydney Opera House',
        'Great Barrier Reef',
        'Uluru',
        'Bondi Beach',
      ],
      'Australia',
    ),

    cities: createCities(
      'australia',
      image(imageSources.australia),
      ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    ),

    foods: createFoods(
      'australia',
      image(imageSources.australia),
      ['Meat Pie', 'Pavlova', 'Lamington', 'Fish and Chips'],
    ),
  },

  '12': {
    id: '12',
    name: 'New Zealand',
    flag: '🇳🇿',
    subtitle: 'Thiên nhiên nguyên sơ',
    heroImage: image(imageSources.newZealand),

    about: {
      title: 'About New Zealand',
      description:
        'New Zealand là điểm đến lý tưởng cho những người yêu thiên nhiên, phiêu lưu và những khung cảnh núi non, hồ nước tuyệt đẹp.',
      image: image(imageSources.newZealand),
    },

    quickFacts: createQuickFacts(
      'Wellington',
      'NZD ($)',
      'English',
      'Dec – Feb',
      'GMT +12',
      'Visa required',
    ),

    attractions: createAttractions(
      'new-zealand',
      image(imageSources.newZealand),
      [
        'Milford Sound',
        'Hobbiton',
        'Lake Tekapo',
        'Mount Cook',
      ],
      'New Zealand',
    ),

    cities: createCities(
      'new-zealand',
      image(imageSources.newZealand),
      ['Queenstown', 'Auckland', 'Wellington', 'Christchurch'],
    ),

    foods: createFoods(
      'new-zealand',
      image(imageSources.newZealand),
      ['Hāngi', 'Pavlova', 'Meat Pie', 'Green-Lipped Mussels'],
    ),
  },
};

export default destinations;