import { useState, useEffect } from 'react';

function States() {
    const [counter, setCounter] = useState({ challenges: 0, shared: 0, success: 0 });

    useEffect(() => {
        const target = { challenges: 6, shared: 200, success: 37 };

        const interval = setInterval(() => {
            setCounter((prevState) => {
                const updatedState = { ...prevState };

                if (updatedState.challenges < target.challenges) {
                    updatedState.challenges++;
                }
                if (updatedState.shared < target.shared) {
                    updatedState.shared += Math.floor(Math.random() * 50);
                }
                if (updatedState.success < target.success) {
                    updatedState.success++;
                }

                return updatedState;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                        Our Community&apos;s Achievements
                    </h2>
                    <p className="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
                        Discover the collective impact of Challengify&apos;s thriving community, as we grow
                        together through daily AI-generated challenges.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-24 sm:gap-x-8 md:grid-cols-3">
                    <div className="p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
                        <h3 className="font-bold text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                                {counter.challenges}+
                            </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-gray-900">Challenges Generated</p>
                        <p className="text-base mt-0.5 text-gray-500">Fueling personal growth & creativity</p>
                    </div>

                    <div className="p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
                        <h3 className="font-bold text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                                {counter.shared}
                            </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-gray-900">Total Challenges Shared</p>
                        <p className="text-base mt-0.5 text-gray-500">By our dedicated community</p>
                    </div>

                    <div className="p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
                        <h3 className="font-bold text-7xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                                {counter.success}+
                            </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-gray-900">Success Stories Shared</p>
                        <p className="text-base mt-0.5 text-gray-500">Inspiring personal achievements</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default States;