import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const ExerciseVideoPage = () => {
  const { id } = useParams<{ id: string }>();

  // Placeholder video ID - replace with actual video IDs based on exercise.id
  // const youtubeVideoId = 'z0_uG0bu0Mo'; // Example: Knee rehab video

  let youtubeVideoId = 'z0_uG0bu0Mo'; // Default video
  if (id === '3') {
    youtubeVideoId = 'dQw4w9WgXcQ'; // Specific video for exercise ID 3
  }

  return (
    <Layout title={`Ejercicio ${id}`}>
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-typography-primary mb-6 text-center">
          Video del Ejercicio
        </h1>
        
        <div className="bg-background-dark p-4 md:p-6 rounded-xl shadow-lg">
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>

          <div className="text-center">
            <p className="text-xl text-typography-secondary mb-2">
              Estás viendo el video para el ejercicio con ID: {id}
            </p>
            <p className="text-neutral-secondary">
              Asegúrate de seguir las instrucciones cuidadosamente y mantener una buena postura.
            </p>
          </div>
        </div>

        {/* Navigation buttons could go here, e.g., back to dashboard, next exercise */}
        {/* <div className="mt-8 flex justify-center space-x-4">
          <Button onClick={() => window.history.back()} variant="outline">
            Volver al Panel
          </Button>
          <Button>
            Siguiente Ejercicio
          </Button>
        </div> */}
      </div>
    </Layout>
  );
};

export default ExerciseVideoPage; 