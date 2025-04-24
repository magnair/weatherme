import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import './GlobeComponent.css';

const GlobeComponent: React.FC = () => {
    return (
        <Box className="globe-container">
            <Container maxWidth="xl">
                <Box className="content-wrapper">
                    {/* Left Content */}
                    <Box className="left-content">
                        <Typography variant="h1" className="main-heading">
                            Vi går foran og bygger fremtidens samfunn
                        </Typography>
                        <Typography className="description-text">
                            Bouvet er et ledende konsulentselskap innen IT og digital kommunikasjon. Vår årelange erfaring, nærhet til kundene og brede kompetanse gjør oss til en svært ettertraktet digitaliseringspartner for både private og offentlige aktører.
                        </Typography>
                    </Box>

                    {/* Right Content */}
                    <Box className="right-content">
                        <Typography variant="h2" className="secondary-heading">
                            Generativ KI
                        </Typography>
                        <Typography className="description-text">
                            Bouvet har lang erfaring og høy ekspertise innen bruk av kunstig intelligens, og kan skape verdi for din virksomhet med generativ KI. Vi tilbyr rådgiving, it-utvikling og workshop eller kurs, og vi tilpasser løsningene etter dine behov og mål.
                        </Typography>
                        <Button className="read-more-button">
                            Les mer her!
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default GlobeComponent;