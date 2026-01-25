
import React from 'react';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      {/* Cabeçalho Opcional da Pizzaria Fenícia */}
      <header className="p-6 text-center bg-white shadow-sm">
        <h1 className="text-3xl font-serif text-[#8B4513]">Pizzaria Fenícia</h1>
        <p className="text-sm text-gray-500 font-sans">Menu Digital Atualizado</p>
      </header>

      {/* Contentor do Menu do Looker Studio */}
      <main className="flex-grow flex items-center justify-center">
        <iframe
          src="https://lookerstudio.google.com/reporting/0b94961c-91a7-4ff5-b021-7f039b275b39"
          width="100%"
          height="800px"
          style={{ border: 0 }}
          allowFullScreen
          title="Menu Pizzaria Fenícia"
        ></iframe>
      </main>
    </div>
  );
};

export default App;
