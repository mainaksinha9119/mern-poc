import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourses } from '../api/course.js';

export const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState('');

  const loadCourse = async () => {
    try {
      const res = await getCourses();
      console.log('thi load course', res?.data);
      setCourses(res?.data || []);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  useEffect(() => {
    loadCourse();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="overline" color="primary.main">
          Learn and grow
        </Typography>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Explore Our Courses
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
          Build real-world skills with practical, job-ready training designed for modern learners.
        </Typography>

       
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={course.category} size="small" color="primary" variant="outlined" />
                  <Chip label={course.level} size="small" />
                </Stack>

                <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                  {course.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Duration: {course.duration}
                </Typography>

                <Button component={Link} to="/login" variant="text" sx={{ mt: 2, p: 0 }}>
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// export default CoursePage;