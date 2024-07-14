const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="container mx-auto flex flex-col items-center px-6 py-12">
        <h2 className="text-4xl font-semibold text-center mb-8">
          Manage Your Time Efficiently with{" "}
          <span className="text-blue-600">Time Management</span>
        </h2>
        <p className="text-lg text-center mb-8">
          Our app helps you keep track of your tasks and stay organized. Manage
          your to-dos, set priorities, and never miss a deadline again.
        </p>
      </main>

      <footer className="w-full py-6 bg-gray-800 text-white mt-auto">
        <div className="container mx-auto flex justify-center items-center">
          <p className="text-sm">
            &copy; 2024 Time Management. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
