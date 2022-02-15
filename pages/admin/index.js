import Admin from '../../components/auth/Admin';
import { Stack, Button, Paper } from '@mui/material';

const adminIndex = () => {
  return (
    <Paper
      elevation={24}
      sx={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <Admin>
        <div>
          <div>
            <h2>Admin page</h2>
          </div>

          <Stack spacing={2} direction="row">
            <Button variant="contained" href="/admin/crud/category-tag">
              Create Category
            </Button>

            <Button variant="contained" href="/admin/crud/category-tag">
              Create Tag
            </Button>

            <Button variant="contained" href="/admin/crud/blog">
              Create Blog
            </Button>

            <Button variant="contained" href="/admin/crud/blogs">
              Update/Delete Blog
            </Button>
          </Stack>
        </div>
      </Admin>
    </Paper>
  );
};

export default adminIndex;
