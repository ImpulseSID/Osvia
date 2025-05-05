import FeaturedContent from "../components/FeaturedContent";

const HomePage = () => {
  return (
    <div className="space-y-8 relative overflow-hidden min-h-screen">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/3 w-72 h-72 bg-purple-500 opacity-10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <section className="relative z-10 px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to Osvia</h1>
        <FeaturedContent />
      </section>
    </div>
  );
};

export default HomePage;
