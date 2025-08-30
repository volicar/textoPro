export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6 mt-12">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} TextoLab. Todos os direitos reservados.</p>
        <div className="flex justify-center mt-2 space-x-4">
          <a href="#" className="hover:text-indigo-400">Facebook</a>
          <a href="#" className="hover:text-indigo-400">Twitter</a>
          <a href="#" className="hover:text-indigo-400">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
