// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t dark:border-gray-800 mt-32 py-10 text-center text-sm text-gray-600 dark:text-gray-400">
      <p>
        © {new Date().getFullYear()} <span className="font-semibold">InscribeAI</span>. 
        Built with ❤️ for creators.
      </p>
      <div className="flex justify-center gap-4 mt-4 text-gray-500">
        <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
        <a href="#" className="hover:text-indigo-600">Terms</a>
        <a href="#contact" className="hover:text-indigo-600">Contact</a>
      </div>
    </footer>
  );
}
