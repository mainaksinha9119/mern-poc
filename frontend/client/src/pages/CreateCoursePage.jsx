import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { createCourse } from '../api/course';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
  title: '',
  slug: '',
  category: '',
  level: 'Beginner',
  instructor: '',
  priceInr: '',
  description: '',
  rating: '',
  status: 'draft',
};

const CreateCoursePage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      if (name === 'title' && !prev.slug) {
        next.slug = value
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
      }

      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const response = await createCourse(formData);
    console.log(response)
     if (response?.status >= 200 && response?.status < 300) {
        navigate('/course');
      }

    } catch {

    }
    // Backend submission will be connected later.
    // setFormData(initialFormState);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Create a New Course
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Add the basic course details below. The backend connection will be implemented later.
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Course Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              fullWidth
              helperText="Auto-generated from the title if left blank."
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                select
                fullWidth
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </TextField>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Price in INR"
                name="priceInr"
                value={formData.priceInr}
                onChange={handleChange}
                placeholder="e.g. 4999"
                required
                fullWidth
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Optional"
                fullWidth
              />

              <TextField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                select
                fullWidth
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
              </TextField>
            </Stack>

            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              minRows={4}
              required
              fullWidth
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" size="large">
                Save Course
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateCoursePage;
