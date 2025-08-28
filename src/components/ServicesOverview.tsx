import React from 'react';
import { FaRegIdBadge, FaFilm, FaFilePdf, FaTicketAlt, FaRegImages } from 'react-icons/fa';
import { MdOutlineVideoLibrary, MdDesignServices } from 'react-icons/md';
import { GiPartyPopper } from 'react-icons/gi';
import { overviewProps } from '@/interfaces/Overvie';



const ServiceCard: React.FC<overviewProps> = ({ icon, title, description, formats }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="text-4xl text-blue-600 mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {formats && (
            <div className="text-sm text-gray-500">
                Formatos disponibles: {formats.join(', ')}
            </div>
        )}
    </div>
);

const ServicesOverview = () => {
    const services = [
        {
            icon: <FaRegIdBadge />,
            title: 'Tarjetas de Presentación',
            description: 'Diseños profesionales y modernos para tu marca personal',
            formats: ['Imagen', 'PDF', 'Vector']
        },
        {
            icon: <FaRegImages />,
            title: 'Flyers & Posters',
            description: 'Diseños impactantes para promociones y eventos',
            formats: ['JPG', 'PNG', 'PDF']
        },
        {
            icon: <MdOutlineVideoLibrary />,
            title: 'Invitaciones Digitales',
            description: 'Invitaciones interactivas y multimedia',
            formats: ['Video', 'Animación', 'HTML5']
        },
        {
            icon: <FaFilePdf />,
            title: 'Curriculum Vitae',
            description: 'Diseños modernos y ATS-friendly',
            formats: ['PDF', 'Word', 'Diseño Web']
        },
        {
            icon: <FaTicketAlt />,
            title: 'Talonarios',
            description: 'Diseños personalizados para tickets y vouchers',
            formats: ['Impresión', 'Digital']
        },
        {
            icon: <GiPartyPopper />,
            title: 'Cotillón Digital',
            description: 'Diseño de materiales para fiestas y eventos',
            formats: ['Imágenes', 'Animaciones', 'Video']
        },
        {
            icon: <MdDesignServices />,
            title: 'Diseño Gráfico',
            description: 'Servicios completos de diseño personalizado'
        },
        {
            icon: <FaFilm />,
            title: 'Producción Audiovisual',
            description: 'Creación de contenido multimedia profesional'
        }
    ];

    return (
        <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Servicios de Diseño y Producción</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Creación de materiales gráficos y multimedia profesionales para potenciar tu presencia digital y física
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            formats={service.formats}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesOverview;