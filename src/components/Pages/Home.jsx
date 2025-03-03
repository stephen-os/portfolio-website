import React from 'react';

const Home = () => {
    return (
        // Container for the entire layout
        <div className="bg-transparent fixed flex flex-col min-h-screen z-1">
            {/* Header */}
            < header className="p-8" />

            {/* Main content area with sidebars */}
            < div className="flex flex-grow" >
                {/* Left Sidebar */}
                < aside className="w-64 p-4 hidden md:block" />

                {/* Main content */}
                < main className="bg-gray-100/85 flex-grow p-4 rounded-lg" >
                    <h2 className="text-xl text-center font-bold mb-4">Content</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero iusto quaerat non blanditiis doloribus eum, vel laudantium at a! Veniam facere reiciendis voluptate! Dicta eius dolore ullam quis sapiente quae!</p>
                </main >

                < aside className="w-32 p-4 hidden lg:block" />

                < main className="bg-gray-100/85 flex-grow p-4 rounded-lg" >
                    <h2 className="text-xl text-center font-bold mb-4">Content</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste aperiam consequatur, doloribus molestiae atque voluptate. Et at perferendis vel laudantium iste, autem vero ullam a tenetur tempora similique rerum veniam.</p>
                </main >


                {/* Right Sidebar */}
                < aside className="w-64 p-4 hidden lg:block" />
            </div >

            {/* Footer */}
            < footer className="p-8" />
        </div >
    );
};

export default Home;
