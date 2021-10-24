import React from "react";


export default function NodeLeader({node}) {


    return (
    <div className="bg-white">
    <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
        <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Líder de Nodo {node.name}</h2>
            <p className="mt-4 text-gray-500">
                Este Nodo tiene {`${node.members.length}`} miembros
            </p>
            <p className="mt-4 text-gray-500">
                Tu código de invitación es {`${node.invitation_token}`}
            </p>


            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {node.members.map((user, i) => (
                    <div key={user.username} className="border-t border-gray-200 pt-4">
                        <dt key={user.username} className="font-medium text-gray-900">{user.username}</dt>
                        <dd key={user._id} className="mt-2 text-sm text-gray-500">{user._id}</dd>
                    </div>
                ))}
            </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                className="bg-gray-100 rounded-lg"
            />
            <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
                alt="Top down view of walnut card tray with embedded magnets and card groove."
                className="bg-gray-100 rounded-lg"
            />
            <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                alt="Side of walnut card tray with card groove and recessed card area."
                className="bg-gray-100 rounded-lg"
            />
            <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                alt="Walnut card tray filled with cards and card angled in dedicated groove."
                className="bg-gray-100 rounded-lg"
            />
        </div>
    </div>
</div>
    )
}