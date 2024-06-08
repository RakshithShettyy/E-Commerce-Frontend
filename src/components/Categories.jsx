import React from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Categories = ({ data }) => {
  // Example classification logic, you may adjust it based on your needs
  const categoryGroups = {
    Electronics: data.filter((category) =>
      [
        "electronics",
        "amazon-devices",
        "smart-home",
        "software",
        "videogames",
      ].includes(category.id)
    ),
    Fashion: data.filter((category) =>
      [
        "fashion",
        "fashion-womens",
        "fashion-mens",
        "fashion-girls",
        "fashion-boys",
        "fashion-baby",
      ].includes(category.id)
    ),
    Home: data.filter((category) =>
      ["garden", "furniture", "appliances", "lawngarden", "tools"].includes(
        category.id
      )
    ),
    Beauty: data.filter((category) =>
      ["beauty", "hpc", "luxury-beauty"].includes(category.id)
    ),
    Sports: data.filter((category) =>
      ["sporting", "automotive", "mi"].includes(category.id)
    ),
    Others: data.filter((category) =>
      ["stripbooks", "movies-tv", "toys-and-games", "gift-cards"].includes(
        category.id
      )
    ),
  };

  return (
    <div className="bg-blue-500 text-white mt-3">
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="flex items-center space-x-4">
          <div className="font-bold text-xl">Flipkart</div>
          <div className="text-sm">
            Explore <span className="text-yellow-400">Plus</span>
          </div>
        </div>
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full px-4 py-2 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div>Rakshith</div>
          <div>Become a Seller</div>
          <div className="relative group">
            <span className="cursor-pointer flex items-center">
              More
              <ChevronDownIcon className="ml-1 w-4 h-4" />
            </span>
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg hidden group-hover:block">
              <div className="py-1">
                {Object.keys(categoryGroups).map((group) => (
                  <div key={group} className="py-1">
                    <div className="font-bold px-4 py-2">{group}</div>
                    {categoryGroups[group].map((category) => (
                      <a
                        key={category.id}
                        href={`#${category.id}`}
                        className="block px-4 py-2 text-sm hover:bg-gray-100">
                        {category.name}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <span className="flex items-center cursor-pointer">
              Cart
              <span className="bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center ml-1">
                4
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white text-black">
        <div className="container mx-auto flex justify-between items-center py-2">
          {Object.keys(categoryGroups).map((group) => (
            <div key={group} className="group relative">
              <span className="px-4 py-2 cursor-pointer flex items-center">
                {group}
                <ChevronDownIcon className="ml-1 w-4 h-4" />
              </span>
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg hidden group-hover:block">
                <div className="py-1">
                  {categoryGroups[group].map((category) => (
                    <a
                      key={category.id}
                      href={`#${category.id}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100">
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
