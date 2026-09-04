// ads — shared data + helpers
(function (global) {
  'use strict';

  var REGIONS = {
    'north america': ['new york', 'los angeles', 'chicago', 'toronto', 'san francisco', 'mexico city'],
    'south america': ['sao paulo', 'buenos aires', 'bogota', 'santiago'],
    'europe': ['london', 'paris', 'berlin', 'madrid', 'rome', 'amsterdam'],
    'asia': ['bangalore', 'mumbai', 'delhi', 'tokyo', 'seoul', 'singapore', 'hong kong', 'dubai', 'bangkok'],
    'africa': ['lagos', 'nairobi', 'cairo', 'johannesburg'],
    'oceania': ['sydney', 'melbourne', 'auckland']
  };

  var CITIES = Object.keys(REGIONS).reduce(function (acc, region) {
    return acc.concat(REGIONS[region]);
  }, []);

  var CURRENCY_BY_CITY = {
    'new york': '$', 'los angeles': '$', chicago: '$', 'san francisco': '$', toronto: 'C$', 'mexico city': 'MX$',
    'sao paulo': 'R$', 'buenos aires': 'AR$', bogota: 'COL$', santiago: 'CLP$',
    london: '£', paris: '€', berlin: '€', madrid: '€', rome: '€', amsterdam: '€',
    bangalore: '₹', mumbai: '₹', delhi: '₹', tokyo: '¥', seoul: '₩', singapore: 'S$', 'hong kong': 'HK$', dubai: 'AED', bangkok: '฿',
    lagos: '₦', nairobi: 'KSh', cairo: 'E£', johannesburg: 'R',
    sydney: 'A$', melbourne: 'A$', auckland: 'NZ$'
  };

  var GENERIC_AREAS = ['downtown', 'uptown', 'north side', 'south side', 'east side', 'west side', 'suburbs', 'old town', 'waterfront', 'airport area'];

  var AREAS = CITIES.reduce(function (acc, city) {
    acc[city] = GENERIC_AREAS.slice();
    return acc;
  }, {});

  var CATEGORIES = {
    community: ['activities', 'artists', 'childcare', 'classes', 'events', 'general', 'groups', 'lost+found', 'volunteers'],
    housing: ['apts / houses', 'rooms / shared', 'sublets / temporary', 'office / commercial', 'parking / storage', 'real estate for sale'],
    'for sale': ['antiques', 'appliances', 'auto parts', 'bikes', 'books', 'cars+trucks', 'cell phones', 'clothing+acc', 'computers', 'electronics', 'furniture', 'free', 'household', 'jewelry', 'musical instruments', 'sporting goods', 'tools', 'toys+games'],
    jobs: ['accounting+finance', 'admin / office', 'customer service', 'food/bev/hosp', 'general labor', 'healthcare', 'marketing / pr / ad', 'sales', 'software / qa / dba', 'transport', 'web / info design'],
    services: ['automotive', 'beauty', 'computer', 'creative', 'event', 'financial', 'household', 'legal', 'lessons', 'pet', 'travel/vac'],
    gigs: ['computer', 'creative', 'event', 'labor', 'talent', 'writing']
  };

  var SWATCHES = ['#c4c4c4', '#a8a8a8', '#dcdcdc', '#909090', '#bfbfbf', '#d4d4d4', '#989898', '#cccccc'];

  var TITLES_BY_CAT = {
    housing: ['2BR apartment for rent, unfurnished', 'Room in shared house, all utilities included', 'Cozy studio, great natural light, quiet street', 'Loft near downtown, move-in ready', 'Shared room available, one roommate'],
    'for sale': ['Smartphone, latest model, mint condition', 'Desk + chair, barely used', 'Motorcycle, single owner, well maintained', 'Sofa set, 3-seater, good condition', 'Mountain bike, 21-speed, well maintained', 'Bookshelf, solid wood', 'Gaming PC, high-end build', 'Washing machine, front load'],
    jobs: ['Frontend developer needed, immediate start', 'Part-time content writer, remote ok', 'Delivery driver, own vehicle preferred', 'Customer support associate, night shift', 'Accountant, 2+ yrs experience'],
    services: ['Home deep cleaning, same day', 'AC repair and servicing', 'Math tutor for high school students', 'Pet grooming at your doorstep', 'Movers, local shifting'],
    community: ['Weekend sports group looking for players', 'Free yoga sessions in the park', 'Lost wallet near the main square', 'Looking for a carpool to downtown', 'Book club meeting every Sunday'],
    gigs: ['Need a photographer for a weekend event', 'Voiceover artist needed for short video', 'One-day helper for moving', 'Freelance logo design gig']
  };

  function seedRandom(seed) {
    var s = seed;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  function pick(arr, rnd) { return arr[Math.floor(rnd() * arr.length)]; }

  function buildFakeListings() {
    var rnd = seedRandom(42);
    var list = [];
    var id = 1;
    var catNames = Object.keys(CATEGORIES);
    catNames.forEach(function (cat) {
      var subcats = CATEGORIES[cat];
      var titles = TITLES_BY_CAT[cat] || ['Listing in ' + cat];
      var count = cat === 'for sale' ? 14 : 8;
      for (var i = 0; i < count; i++) {
        var city = pick(CITIES, rnd);
        var hasPrice = cat === 'for sale' || cat === 'housing' || (cat === 'jobs' && rnd() > 0.5);
        var price = hasPrice ? Math.round((50 + rnd() * 950)) * (cat === 'housing' ? 100 : cat === 'jobs' ? 100 : 10) : null;
        var daysAgo = Math.floor(rnd() * 21);
        list.push({
          id: 'f' + id++,
          cat: cat,
          subcat: pick(subcats, rnd),
          title: pick(titles, rnd) + (rnd() > 0.7 ? ' - ' + pick(AREAS[city], rnd) : ''),
          price: price,
          city: city,
          hood: pick(AREAS[city], rnd),
          daysAgo: daysAgo,
          swatch: pick(SWATCHES, rnd),
          desc: 'This is a demo listing. Contact the poster for more details, condition, and photos. Price is negotiable within reason. Serious inquiries only, please mention this listing when you reach out.',
          user: false
        });
      }
    });
    return list;
  }

  var FAKE_LISTINGS = buildFakeListings();

  function getUserPosts() {
    try {
      return JSON.parse(localStorage.getItem('cl_user_posts') || '[]');
    } catch (e) { return []; }
  }

  function saveUserPost(post) {
    var posts = getUserPosts();
    post.id = 'u' + Date.now();
    post.daysAgo = 0;
    post.user = true;
    posts.unshift(post);
    localStorage.setItem('cl_user_posts', JSON.stringify(posts));
    return post.id;
  }

  function allListings() {
    return getUserPosts().concat(FAKE_LISTINGS);
  }

  function findListing(id) {
    return allListings().filter(function (l) { return l.id === id; })[0] || null;
  }

  function getCity() {
    return localStorage.getItem('cl_city') || 'bangalore';
  }

  function setCity(city) {
    localStorage.setItem('cl_city', city);
  }

  function fmtDate(daysAgo) {
    if (daysAgo === 0) return 'just now';
    if (daysAgo === 1) return '1 day ago';
    return daysAgo + ' days ago';
  }

  function currencySymbol(city) {
    return CURRENCY_BY_CITY[city] || '$';
  }

  function fmtPrice(price, city) {
    if (price == null) return '';
    return currencySymbol(city) + price.toLocaleString('en-US');
  }

  function qs(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  // ---- platform fee model ----
  // A flat ₹20 platform fee applies on every buyer-seller connection. When a listing has
  // a price, it's bundled into the buyer's payment to the seller (buyer pays price + ₹20,
  // platform keeps the ₹20, seller receives the listed price). When there's no price
  // (e.g. a job or community post), it's charged on its own to send a message.
  var LEAD_FEE_INR = 20;
  var LEAD_COUNT_BASE = 184312; // notional leads generated before this browser session

  function getLeadCount() {
    var local = Number(localStorage.getItem('cl_leads') || '0');
    return LEAD_COUNT_BASE + local;
  }

  function recordLead() {
    var local = Number(localStorage.getItem('cl_leads') || '0') + 1;
    localStorage.setItem('cl_leads', String(local));
    return getLeadCount();
  }

  // ---- login (demo only — local to this browser, no real accounts) ----
  function getUser() {
    try { return JSON.parse(localStorage.getItem('cl_user') || 'null'); } catch (e) { return null; }
  }

  function setUser(user) {
    localStorage.setItem('cl_user', JSON.stringify(user));
  }

  function logout() {
    localStorage.removeItem('cl_user');
  }

  function mountAuthLink(el) {
    var user = getUser();
    if (user) {
      el.innerHTML = 'hi ' + user.name + ' &middot; <a href="#" id="logoutLink">log out</a>';
      document.getElementById('logoutLink').addEventListener('click', function (e) {
        e.preventDefault();
        logout();
        window.location.reload();
      });
    } else {
      el.innerHTML = '<a href="login.html">log in</a>';
    }
  }

  global.CL = {
    CITIES: CITIES,
    REGIONS: REGIONS,
    AREAS: AREAS,
    CATEGORIES: CATEGORIES,
    allListings: allListings,
    findListing: findListing,
    saveUserPost: saveUserPost,
    getCity: getCity,
    setCity: setCity,
    fmtDate: fmtDate,
    fmtPrice: fmtPrice,
    currencySymbol: currencySymbol,
    qs: qs,
    LEAD_FEE_INR: LEAD_FEE_INR,
    getLeadCount: getLeadCount,
    getUser: getUser,
    setUser: setUser,
    logout: logout,
    mountAuthLink: mountAuthLink,
    recordLead: recordLead
  };
})(window);
