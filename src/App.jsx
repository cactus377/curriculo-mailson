import React, { useState, useRef } from 'react';
import { Send, Mail, Download, MessageCircle } from 'lucide-react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const contentRef = useRef(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const downloadPDF = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');

      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      const pageHeight = 297;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('curriculo-mailson-alves.pdf');
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="https://ui-avatars.com/api/?name=Mailson+Alves&background=005bb3&color=fff&size=200"
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Maílson Alves dos Santos
              </h1>
              <h2 className="text-xl text-blue-200 mb-4">
                Assistente de Projetos em Engenharia
              </h2>
              <p className="text-blue-100 max-w-xl">
                Estou em busca de uma oportunidade no mercado onde eu possa
                aplicar minhas habilidades e contribuir de forma eficaz com
                equipes de trabalho, priorizando o crescimento da organização e
                o meu desenvolvimento pessoal e profissional.
              </p>
              <div className="flex flex-wrap gap-3 mt-6 items-center">
                <a
                  href="mailto:alcance963@gmail.com"
                  className="text-white hover:text-blue-200 transition-colors"
                  title="Enviar e-mail"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a
                  href="https://wa.me/5589999719144?text=Olá%20Mailson,%20vi%20seu%20currículo%20online!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 transition-colors"
                  title="Enviar WhatsApp"
                >
                  <Send className="w-6 h-6" />
                </a>
                <button
                  onClick={downloadPDF}
                  disabled={downloading}
                  className="btn-download"
                >
                  <Download className="w-5 h-5" />
                  <span>{downloading ? 'Gerando...' : 'Baixar PDF'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content for PDF */}
      <div ref={contentRef}>

      {/* Education Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Educação</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-blue-900 pl-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Ensino Superior - em pausa
              </h3>
              <p className="text-blue-900 mb-2">
                10º Semestre de Engenharia Civil • UNIP - Brasília - DF • 2020
              </p>
            </div>
            <div className="border-l-4 border-blue-900 pl-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Ensino Médio
              </h3>
              <p className="text-blue-900 mb-2">Concluído • 2008</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Experiência Profissional
          </h2>
          <div className="space-y-8">
            <div className="border-l-4 border-blue-900 pl-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Assistente de Projetos em Engenharia
              </h3>
              <p className="text-blue-900 mb-2">
                Alcance Engenharia - Brasília - DF • 2021
              </p>
            </div>
            <div className="border-l-4 border-blue-900 pl-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Assistente de Projetos em Engenharia
              </h3>
              <p className="text-blue-900 mb-2">
                Cleiton Alves Engenharia - Brasília - DF • 2020 - 2021
              </p>
            </div>
            <div className="border-l-4 border-blue-900 pl-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Auxiliar de Pré-Impressão
              </h3>
              <p className="text-blue-900 mb-2">
                Editora e Gráfica Coronário - Brasília - DF • 2019 - 2020
              </p>
            </div>
            <div className="border-l-4 border-blue-900 pl-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Designer, Técnico em Impressão Digital e Atendimento
              </h3>
              <p className="text-blue-900 mb-2">
                Art Plus Comunicação Visual - Bom Jesus - PI • 2015 - 2019
              </p>
            </div>
            <div className="border-l-4 border-blue-900 pl-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Departamento de Compras, Almoxarifado
              </h3>
              <p className="text-blue-900 mb-2">
                Fazenda Boa Esperança - Palmeira do Piauí - PI • 2014 - 2015
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Habilidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'CorelDraw', level: 80 },
              { name: 'Photoshop', level: 60 },
              { name: 'Allplan Enginier', level: 50 },
              { name: 'AutoCad', level: 55 },
              { name: 'Revit', level: 55 },
              { name: 'Adobe Premiere', level: 45 },
              { name: 'Bubble.io', level: 50 },
              { name: 'OutSystems', level: 35 },
              { name: 'Programação', level: 45 },
            ].map((skill) => (
              <div key={skill.name} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{skill.name}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-900 h-2.5 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Projetos</h2>

          {/* Engineering Projects */}
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">Engenharia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                url: 'https://placehold.co/600x400/e5eeff/005bb3?text=Engenharia',
                title: 'Bloco Principal finalizado',
                description: 'Rampa de acesso em concreto armado'
              },
              {
                url: 'https://placehold.co/600x400/e5eeff/005bb3?text=Engenharia',
                title: 'Verificação de Medidas',
                description: 'Conferindo medidas para garantir a exatidão do volume de concreto necessário para a execução da fundação'
              },
              {
                url: 'https://placehold.co/600x400/e5eeff/005bb3?text=Engenharia',
                title: 'Croqui de Acompanhamento',
                description: 'Detalhes de acompanhamento de concretagem de laje de grande porte, 42 caminhões de concreto executados no dia'
              },
              {
                url: 'https://placehold.co/600x400/e5eeff/005bb3?text=Engenharia',
                title: 'Foto Aérea',
                description: 'Vista aérea do canteiro de obras, foto capturada por drone'
              },
              {
                url: 'https://placehold.co/600x400/e5eeff/005bb3?text=Engenharia',
                title: 'Quadra de Esportes Finalizada',
                description: 'Vista aérea do canteiro de obras, foto capturada por drone'
              }
            ].map((project, i) => (
              <div
                key={`eng-${i}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleImageClick(project.url)}
              >
                <img
                  src={project.url}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Programming Projects */}
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">Programação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                url: 'https://placehold.co/600x400/e5eeff/005bb3?text=Programacao',
                title: 'Landing Page',
                description: 'Página web para redirecionamento e captação de venda de ebook. Tecnologias: HTML, CSS, JavaScript'
              },
              {
                url: 'https://placehold.co/600x400/e5eeff/005bb3?text=Programacao',
                title: 'Captura de Clientes',
                description: 'Página web para capturar novos clientes para academia de musculação. Tecnologias: HTML, CSS, JavaScript'
              },
              {
                url: 'https://placehold.co/600x400/e5eeff/005bb3?text=Programacao',
                title: 'Edição no Código',
                description: 'Imagem no momento da edição do código html do Site CactusTech. Tecnologias: HTML, CSS, JavaScript'
              },
              {
                url: 'https://placehold.co/600x400/e5eeff/005bb3?text=Programacao',
                title: 'Projeto em Execução',
                description: 'Aplicativo web para gerenciamento de escolas em desenvolvimento com Bubble.io e Supabase'
              }
            ].map((project, i) => (
              <div
                key={`prog-${i}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleImageClick(project.url)}
              >
                <img
                  src={project.url}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>

      {/* Modal para visualização da imagem */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Full view"
              className="w-full h-full object-contain"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            />
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5589999719144?text=Olá%20Mailson,%20vi%20seu%20currículo%20online!"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        title="Falar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Footer */}
      <footer className="mt-16 text-center py-4 text-gray-500 text-sm">
        Feito com carinho por Mailson Alves, ❤️
      </footer>
    </div>
  );
}

export default App;
