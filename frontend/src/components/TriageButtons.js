import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { 
  School, 
  People, 
  LocalHospital, 
  AccountBalance, 
  Mood, 
  Psychology 
} from '@mui/icons-material';

const TriageButtons = ({ onSelectTriage }) => {
  const triageOptions = [
    {
      id: 'ExamStress',
      label: 'Exam/Study Worries',
      icon: <School />,
      color: '#52B0AD', // Calming Teal
      description: 'Academic pressure, exam anxiety'
    },
    {
      id: 'FamilyStress',
      label: 'Family/Relationship Issues',
      icon: <People />,
      color: '#74C1E1', // Supportive Blue
      description: 'Family conflicts, relationship problems'
    },
    {
      id: 'HealthStress',
      label: 'Health Concerns',
      icon: <LocalHospital />,
      color: '#C4E8A9', // Light Green
      description: 'Medical issues, health anxiety'
    },
    {
      id: 'FinancialStress',
      label: 'Financial Worries',
      icon: <AccountBalance />,
      color: '#C9C1D9', // Warm Lavender
      description: 'Money problems, job stress'
    },
    {
      id: 'Loneliness',
      label: 'Feeling Lonely/Isolated',
      icon: <Mood />,
      color: '#418281', // Accent Teal
      description: 'Social isolation, depression'
    },
    {
      id: 'General',
      label: 'General Support',
      icon: <Psychology />,
      color: '#52B0AD', // Calming Teal
      description: 'Not sure, need general help'
    }
  ];

  const handleTriageSelect = (option) => {
    onSelectTriage(`I'm dealing with ${option.label.toLowerCase()}`);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          mb: 3,
          color: 'text.primary',
          fontWeight: 500
        }}
      >
        What's troubling you today? Choose the closest option:
      </Typography>
      
      <Grid container spacing={2}>
        {triageOptions.map((option) => (
          <Grid item xs={12} sm={6} md={4} key={option.id}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleTriageSelect(option)}
              sx={{
                p: 2,
                height: 'auto',
                flexDirection: 'column',
                gap: 1,
                borderColor: option.color,
                color: option.color,
                '&:hover': {
                  backgroundColor: `${option.color}15`,
                  borderColor: option.color,
                },
                textTransform: 'none',
                borderRadius: 2
              }}
            >
              <Box sx={{ color: option.color, fontSize: '2rem' }}>
                {option.icon}
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {option.label}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  textAlign: 'center',
                  lineHeight: 1.2
                }}
              >
                {option.description}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
      
      <Typography 
        variant="body2" 
        sx={{ 
          textAlign: 'center', 
          mt: 3, 
          color: 'text.secondary',
          fontStyle: 'italic'
        }}
      >
        Don't worry if you're not sure - you can always change your mind or tell us more details.
      </Typography>
    </Box>
  );
};

export default TriageButtons;