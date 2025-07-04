export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-gray-50 py-8 px-4 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto text-center space-y-2">
        <p>&copy; {new Date().getFullYear()} UrbanHost. Todos os direitos reservados.</p>
        <div className="flex justify-center gap-4 text-gray-500 text-xs">
          <span className="hover:underline cursor-pointer">Termos</span>
          <span className="hover:underline cursor-pointer">Privacidade</span>
          <span className="hover:underline cursor-pointer">Ajuda</span>
        </div>
      </div>
    </footer>
  );
}
