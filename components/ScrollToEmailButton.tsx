'use client';

export default function ScrollToEmailButton() {
  const handleClick = () => {
    const emailSection = document.getElementById('email-signup');
    emailSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <p className="text-base md:text-lg text-white/90 font-medium">
        💌 Want exclusive deals delivered to your inbox?
      </p>
      <button
        onClick={handleClick}
        className="bg-white text-primary hover:bg-neutral-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 inline-block shadow-lg hover:shadow-xl hover:scale-105"
      >
        Join Our Email List
      </button>
    </div>
  );
}
