import React from 'react';
import { Container} from '../component';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/add-post');
    };

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="text-center mb-8">
                    <button
                        onClick={handleNavigate}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        ADD
                    </button>
                </div>


            </Container>
        </div>
    );
}

export default Home;