export const FloatingBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-playful-purple/30 to-playful-pink/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-playful-cyan/30 to-playful-blue/30 rounded-full blur-3xl animate-blob animation-delay-2000" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-playful-yellow/30 to-playful-orange/30 rounded-full blur-3xl animate-blob animation-delay-4000" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-playful-mint/30 to-playful-lime/30 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-playful-lavender/20 to-playful-rose/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
    </div>
  );
};
