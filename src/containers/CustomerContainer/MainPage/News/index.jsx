import React from 'react'

function News() {
    const products = [
        {
          id: 1,
          name: 'Adidas Springblade Razor',
          href: '#',
          imageSrc: 'https://img.favpng.com/24/16/20/nike-mag-nike-hyperadapt-1-0-sneakers-self-tying-shoes-png-favpng-UscFG0PjSJVPcsCXrGU7MMXj1.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        {
            id: 2,
            name: 'Adidas Springblade Razor',
            href: '#',
            imageSrc: 'https://wallpaper.dog/large/10890189.png',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$44',
            color: 'Black',
          },
          {
            id: 3,
            name: 'Nike off white foam black',
            href: '#',
            imageSrc: 'https://www.kasneaker.com/wp-content/uploads/2018/10/Off-White-Nike-Zoom-Fly-Black-AJ4588-001-Release-Date-1.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$69',
            color: 'Black',
          },
          
        // More products...
      ]
  return (
    <div className="bg-gray-nike mb-[100px]">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">NEWS</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href} className='text-black' >
                      <span aria-hidden="true" className="absolute inset-0 text-black" style={{color: 'black', textDecoration: 'none'}} />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default News