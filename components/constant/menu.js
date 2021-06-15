export const MENUITEMS = [
   {
      title: 'products', type: 'sub', children: [
         {
            path: '/shop/left_sidebar', title: 'list_products', type: 'link'
         }],
   },
   {
      title: 'wedding_rings', megaMenu: true, megaMenuType: 'small', type: 'sub', children: [
         {
            title: 'women', type: 'sub', children: [
               { path: '/', title: 'classic_wedding_rings', type: 'link', icon: 'alert' },
               { path: '/', title: 'diamond_rings', type: 'link', icon: 'layout-accordion-merged' },
               { path: '/', title: 'stackable_rings', type: 'link', icon: 'layers' },
            ]
         },
         {
            title: 'men', type: 'sub', children: [
               { path: '/', title: 'classic_wedding_rings', type: 'link', icon: 'list' },
               { path: '/', title: 'carved_rings', type: 'link', icon: 'gallery' },
               { path: '/', title: 'diamond_rings', type: 'link', icon: 'money' },
               { path: '/', title: 'alternative_metal_rings', type: 'link', icon: 'time' },
            ]
         },
         {
            title: 'aniversary', type: 'sub', children: [
               { path: '/', title: 'eternity_rings', type: 'link', icon: 'bar-chart' },
               { path: '/', title: 'anniversary_rings', type: 'link', icon: 'thought' },
            ]
         },
         {
            title: 'diamonds_jewelery', type: 'sub', children: [
               { path: '/', title: 'diamond_studs', type: 'link', icon: 'bar-chart' },
               { path: '/', title: 'diamond_pendants', type: 'link', icon: 'thought' },
               { path: '/', title: 'tennis_bracelets', type: 'link', icon: 'thought' },
            ]
         },
     ]
   },
   {
      title: 'fine_jewelers', megaMenu: true, megaMenuType: 'small', type: 'sub', children: [
         {
            title: 'earrings', type: 'sub', children: [
               { path: '/', title: 'diamond_studs', type: 'link', icon: 'alert' },
               { path: '/', title: 'diamond_earrings', type: 'link', icon: 'layout-accordion-merged' },
               { path: '/', title: 'gemstone_earrings', type: 'link', icon: 'layers' },
               { path: '/', title: 'pearl_earrings', type: 'link', icon: 'layers' },
            ]
         },
         {
            title: 'bracelets', type: 'sub', children: [
               { path: '/', title: 'tennis_bracelets', type: 'link', icon: 'list' },
               { path: '/', title: 'diamond_bracelets', type: 'link', icon: 'gallery' },
               { path: '/', title: 'gemstone_bracelets', type: 'link', icon: 'money' },
               { path: '/', title: 'pearl_bracelets', type: 'link', icon: 'time' },
            ]
         },
         {
            title: 'necklaces', type: 'sub', children: [
               { path: '/', title: 'diamond_pendants', type: 'link', icon: 'bar-chart' },
               { path: '/', title: 'diamond_necklaces', type: 'link', icon: 'thought' },
               { path: '/', title: 'gemstones_necklaces', type: 'link', icon: 'thought' },
               { path: '/', title: 'pearl_necklaces', type: 'link', icon: 'thought' },
            ]
         },
         {
            title: 'rings', type: 'sub', children: [
               { path: '/', title: 'eternity_rings', type: 'link', icon: 'bar-chart' },
               { path: '/', title: 'anniversary_rings', type: 'link', icon: 'thought' },
               { path: '/', title: 'diamond_rings', type: 'link', icon: 'thought' },
               { path: '/', title: 'gemstone_rings', type: 'link', icon: 'thought' },
               { path: '/', title: 'pearl_rings', type: 'link', icon: 'thought' },
            ]
         },
         {
            title: 'design_yourself', type: 'sub', children: [
               { path: '/shop/custom_product', title: 'design_your_chain', type: 'link', icon: 'bar-chart' },
            ]
         },
      ]
   },

   /* {
      title: 'EDUCATION', type: 'sub', children: [
         { path: '/blogs/blog_left_sidebar', title: 'blog left sidebar', type: 'link' },
         { path: '/blogs/blog_right_sidebar', title: 'blog right sidebar', type: 'link' },
         { path: '/blogs/no_sidebar', title: 'no sidebar', type: 'link' },
         { path: '/blogs/blog_detail', title: 'blog detail', type: 'link' },
      ]
   }, */
]

