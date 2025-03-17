// This page should contain information about different subscription tiers

// Each card of tier should push a different value to the database for the users level of subscrption
// Display their current sub status
// Integrate payment system from Stripe API
// If sub tier premium selected, edit users subscription table to have premium instead of current (Could be enterprise if previously subscribed at that level)
//

// UI Design
// User sees all cards pertaining to the different sub tiers available to them: Free, Premium, Enterprise
// Each tier has their perks listed in a small section below the pricing / month.
// Below that a button with "Subscribe" and if the card is their current tier, replace the button text with "Current Tier" instead

// Step one
// User clicks tier they want to subscribe to.
// Redirected to the Stripe API endpoint which then redirects to the corresponding middleman page
// From there the Stripe API response determines the actions we take on the database.
// If they were free and select Premium we will use a router.put("users/subscription" endpoint with their newly subbed tier)

import React from "react";

const PricingPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 items-center mx-65 h-screen py-10">
            <div className="flex flex-col justify-between text-left border p-6 w-full max-w-[350px] h-[400px] rounded-xl">
                <h1 className="text-center text-3xl divide-x-2">Free Tier</h1>
                <hr className="mb-4" />
                <ul className="mt-auto text-center place-content-center">
                    <li className="text-xl">30 Win Cards</li>
                    <li className="text-xl">10 Custom Categories</li>
                </ul>
                <button className="mt-auto bg-gray-500 text-white px-4 py-2 rounded">
                    Current Tier
                </button>
            </div>
            <div className="flex flex-col justify-between text-center border p-6 w-full max-w-[350px] h-[400px] rounded-xl">
                <h1 className="text-3xl">Premium</h1>
                <hr className="mb-4" />
                <ul>
                    <li className="">All features in the Free Tier</li>
                    <li className="font-bold">AND</li>

                    <li className="font-bold underline mb-4">An additional</li>
                    <li className="text-xl">300 Win Cards</li>
                    <li className="text-xl">30 Custom Categories</li>
                </ul>
                <h1 className="mt-auto text-2xl">
                    $4.99 <h1 className="text-sm inline">/month</h1>
                </h1>
                <button className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-400 cursor-pointer">
                    Subscribe
                </button>
            </div>
            <div className="flex flex-col justify-between text-center border p-6 w-full max-w-[350px] h-[400px] rounded-xl">
                <h1 className="text-center text-3xl">Enterprise</h1>
                <hr className="mb-4" />
                <ul>
                    <li className="text-inherit">
                        All features in Free & Premium Tier
                    </li>
                    <li className="font-bold">AND</li>

                    <li className="font-bold underline mb-4">An additional</li>
                    <li className="text-xl">3000 Win Cards</li>
                    <li className="text-xl">300 Custom Categories</li>
                </ul>
                <h1 className="mt-auto text-2xl">
                    $20.99 <h1 className="text-sm inline">/month</h1>
                </h1>
                <button className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-400 cursor-pointer">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default PricingPage;
